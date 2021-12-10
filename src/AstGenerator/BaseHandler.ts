import NodeGenerator from '../NodeGenerator'
import { ETokenType } from '../types'
import TokenArray from './utils/TokenArray'
import { ENodeEnvironment, ICheckParams, IFindNodesParams } from './types'
import { hasEnvironment, isSameRank, isToken } from 'src/utils'
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

  /** 通过 符合的token 和 步进函数 得到期间生成的节点 */
  findNodes<T>({ end, slice, step }: IFindNodesParams<T>): TStateResponse<T[]> {
    const result = []

    let currentToken
    while ((currentToken = this.tokens.getToken()) && !end(currentToken)) {
      if (slice?.(currentToken)) {
        this.tokens.next()
        continue
      }
      result.push(step())
    }

    return { code: currentToken ? 0 : 1, payload: result }
  }

  /** 是否继续执行 */
  isContinue(environment: ENodeEnvironment) {
    if (environment === ENodeEnvironment.bracket) return true

    const lastToken = this.tokens.getToken(-1)
    const currentToken = this.tokens.getToken()
    return isSameRank([lastToken, currentToken], 'endAndStartLine')
  }

  /** 检查 */
  check(checkParams: ICheckParams) {
    if (!checkParams.checkToken()) {
      throw new TypeError('Unexpected token')
    }

    if (checkParams.extraCheck && !checkParams.extraCheck()) {
      throw new TypeError('Extra check the failure')
    }

    const hasBracket = hasEnvironment(checkParams.environment, ENodeEnvironment.bracket)

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
