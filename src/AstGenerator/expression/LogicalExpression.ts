import { ENodeType, ETokenType, ILogicalExpression, TExpressionNode, TToken } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 逻辑表达式 */
class LogicalExpression extends BaseHandler {
  handleMaybe(lastNode: TExpressionNode, environment: EEnvironment, disableOr: boolean = false): TExpressionNode {
    if (!this.isContinue(environment)) return lastNode

    const currentToken = this.tokens.getToken()
    if (disableOr && isToken(currentToken, ETokenType.keyword, 'or')) return lastNode

    if (isToken(currentToken, ETokenType.keyword, ['and', 'or'])) {
      const LogicalExpression = this.handle(lastNode, environment)
      return this.handleMaybe(LogicalExpression, environment, disableOr)
    }

    return lastNode
  }

  handle(lastNode: TExpressionNode, environment: EEnvironment): ILogicalExpression {
    const currentToken = this.tokens.getToken() as TToken<ETokenType.keyword, 'and' | 'or'>
    this.check({
      checkToken: () => isToken(currentToken, ETokenType.keyword, ['and', 'or']),
      // extraCheck: () => isExpressionNode(lastNode),
      environment,
      isBefore: true,
      isAfter: true
    })

    this.tokens.next()
    const right =
      currentToken.value === 'and'
        ? this.astGenerator.expression.handleMaybeCompare(environment)
        : this.astGenerator.expression.handleMaybeLogical(environment, true)

    const LogicalExpression = this.createNode(ENodeType.LogicalExpression, {
      left: lastNode,
      right,
      operator: currentToken.value,
      loc: createLoc(lastNode, right)
    })

    return LogicalExpression
  }
}

export default LogicalExpression
