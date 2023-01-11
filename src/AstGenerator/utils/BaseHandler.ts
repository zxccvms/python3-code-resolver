import { ETokenType, TToken } from '../../types'
import TokenArray from './TokenArray'
import { EEnvironment, ICheckParams, IFindNodesParams } from '../types'
import { checkBit, getColumn, getRightBracket, isSameRank, isToken } from '../../utils'

/** 节点基础的处理者 */
class BaseHandler {
  public tokens: TokenArray

  /** 通过 符合的token 和 步进函数 得到期间的token */
  findTokens(end: (token: TToken) => boolean): TStateResponse<TToken[]> {
    const result: TToken[] = []

    let currentToken: TToken
    while ((currentToken = this.tokens.getToken()) && !end(currentToken)) {
      this.tokens.next()
      result.push(currentToken)

      if (isToken(currentToken, ETokenType.bracket, ['(', '[', '{'])) {
        const rightBracket = getRightBracket(currentToken.value as '(' | '[' | '{')

        const { code, payload } = this.findTokens(token => isToken(token, ETokenType.bracket, rightBracket))
        if (code === 1) {
          throw new SyntaxError(`Expected '${rightBracket}'`)
        }

        const rightBracketToken = this.tokens.getToken()
        this.tokens.next()

        result.push(...payload, rightBracketToken)
      }
    }

    return { code: currentToken ? 0 : 1, payload: result }
  }

  /** 通过 符合的token 和 步进函数 得到期间生成的节点 */
  findNodes<T>({ end, step, isSlice = false }: IFindNodesParams<T>): TStateResponse<T[]> {
    const result = []

    let currentToken
    while ((currentToken = this.tokens.getToken()) && !end(currentToken)) {
      if (isSlice && isToken(currentToken, ETokenType.punctuation, ',')) {
        this.tokens.next()
        continue
      }
      result.push(step())
    }

    return { code: currentToken ? 0 : 1, payload: result }
  }

  /** 是否继续执行 */
  isContinue(environment: EEnvironment, mode: 'before' | 'after' = 'before') {
    const currentToken = this.tokens.getToken()
    if (!currentToken) return false
    if (checkBit(environment, EEnvironment.bracket)) return true

    return isSameRank([this.tokens.getToken(mode === 'before' ? -1 : 1), currentToken], 'endAndStartLine')
  }

  hasToken() {
    return Boolean(this.tokens.getToken())
  }

  getToken(extraIndex?: number) {
    return this.tokens.getToken(extraIndex)
  }

  isSameLine(offsetIndex = 0) {
    return isSameRank([this.tokens.getToken(-1 + offsetIndex), this.tokens.getToken(offsetIndex)], 'endAndStartLine')
  }

  isBegin(offsetIndex: number = 0) {
    const lastToken = this.getToken(offsetIndex - 1)
    if (!lastToken) return true

    return this.isSameLine(offsetIndex)
  }

  isToken(types: ETokenType | ETokenType[], value?: string | string[], offsetIndex: number = 0): boolean {
    const token = this.tokens.getToken(offsetIndex)
    return isToken(token, types, value)
  }

  isTokenLine(
    environment: EEnvironment,
    types: ETokenType | ETokenType[],
    value?: string | string[],
    offsetIndex: number = 0
  ) {
    const token = this.tokens.getToken(offsetIndex)
    return isToken(token, types, value) && (checkBit(environment, EEnvironment.bracket) || this.isSameLine(offsetIndex))
  }

  isTokens(...tokens: [ETokenType | ETokenType[], string | string[]][]) {
    return tokens.every(([types, value], index) => isToken(this.tokens.getToken(index), types, value))
  }

  /** 如果当前token符合 则输出当前token && 索引指向下一个token */
  eat<T extends ETokenType, V extends string>(types: T | T[], value?: V | V[]): TToken<T, V> {
    const token = this.tokens.getToken()
    if (!isToken(token, types, value)) return

    this.tokens.next()
    return token
  }

  eatLine<T extends ETokenType, V extends string>(
    environment: EEnvironment,
    types: T | T[],
    value?: V | V[]
  ): TToken<T, V> {
    const token = this.tokens.getToken()
    if (!isToken(token, types, value)) return
    else if (!checkBit(environment, EEnvironment.bracket) && !this.isSameLine()) return

    this.tokens.next()
    return token
  }

  /** 判断当前token && 将索引指向下一个token */
  output<T extends ETokenType, V extends string>(types: T | T[], value?: V | V[]): TToken<T, V> {
    const token = this.tokens.getToken()
    if (!isToken(token, types, value)) {
      throw new TypeError('Unexpected token')
    }

    this.tokens.next()
    return token
  }

  outputLine<T extends ETokenType, V extends string>(
    environment: EEnvironment,
    types: T | T[],
    value?: V | V[]
  ): TToken<T, V> {
    const token = this.tokens.getToken()
    if (!isToken(token, types, value)) {
      throw new TypeError('Unexpected token')
    } else if (!checkBit(environment, EEnvironment.bracket) && !this.isSameLine()) {
      throw new TypeError('Unexpected token')
    }

    this.tokens.next()
    return token
  }

  outputBegin<T extends ETokenType, V extends string>(types: T | T[], value?: V | V[]): TToken<T, V> {
    const token = this.tokens.getToken()
    if (!isToken(token, types, value)) {
      throw new TypeError('Unexpected token')
    } else if (!this.isBegin()) {
      throw new TypeError('Unexpected token')
    }

    this.tokens.next()
    return token
  }

  /** 检查 */
  check(checkParams: ICheckParams) {
    if (checkParams.checkToken && !checkParams.checkToken()) {
      throw new TypeError('Unexpected token')
    }

    if (checkParams.extraCheck && !checkParams.extraCheck()) {
      throw new TypeError('Extra check the failure')
    }

    if (checkBit(checkParams.environment, EEnvironment.decorative) && !checkParams.isDecorativeExpression) {
      throw new TypeError('Expression form not supported for decorator prior to Python 3.9')
    }

    if (checkBit(checkParams.environment, EEnvironment.assign) && !checkParams.isAssignableExpression) {
      throw new TypeError('This is not assignable expression')
    }

    const hasBracket = checkBit(checkParams.environment, EEnvironment.bracket)

    if (checkParams.isBefore) {
      const last = this.tokens.getToken(-1 * Number(checkParams.isBefore))
      if (
        // 不存在
        !last ||
        // 是 (
        isToken(last, ETokenType.bracket, '(') ||
        // 没有括号环境 && 不同行
        (!hasBracket && !isSameRank([last, this.tokens.getToken()], 'endAndStartLine'))
      ) {
        throw new SyntaxError('invalid syntax')
      }
    }

    if (checkParams.isAfter) {
      const next = this.tokens.getToken(Number(checkParams.isAfter))
      if (
        // 不存在
        !next ||
        // 是 )
        isToken(next, ETokenType.bracket, ')') ||
        // 没有括号环境 && 不同行
        (!hasBracket && !isSameRank([this.tokens.getToken(), next], 'endAndStartLine'))
      ) {
        throw new SyntaxError('invalid syntax')
      }
    }
  }

  getStartColumn() {
    const currentToken = this.tokens.getToken()
    if (!currentToken) return
    return getColumn(currentToken, 'start')
  }
}

export default BaseHandler
