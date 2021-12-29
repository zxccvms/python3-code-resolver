import NodeGenerator from '../NodeGenerator'
import { ETokenType, TToken } from '../types'
import TokenArray from './utils/TokenArray'
import { EEnvironment, ICheckParams, IFindNodesParams } from './types'
import { checkBit, getRightBracket, isSameRank, isToken } from 'src/utils'
import AstGenerator from './AstGenerator'

/** 节点基础的处理者 */
class BaseHandler {
  tokens: TokenArray
  createNode: NodeGenerator['generate']
  astGenerator: AstGenerator

  constructor(astGenerator: AstGenerator) {
    this.tokens = astGenerator.tokens
    this.createNode = astGenerator.createNode
    this.astGenerator = astGenerator
  }

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

  isToken(types: ETokenType | ETokenType[], value?: string | string[]): boolean {
    const token = this.tokens.getToken()
    return isToken(token, types, value)
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

  /** 判断当前token && 将索引指向下一个token */
  output<T extends ETokenType, V extends string>(types: T | T[], value?: V | V[]): TToken<T, V> {
    const token = this.tokens.getToken()
    if (!isToken(token, types, value)) {
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
}

export default BaseHandler
