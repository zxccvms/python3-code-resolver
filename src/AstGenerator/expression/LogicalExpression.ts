import { ENodeType, ETokenType, ILogicalExpression, TExpressionNode, TToken } from '../../types'
import { createLoc, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 逻辑表达式 */
class LogicalExpression extends Node {
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
    this.check({
      // extraCheck: () => isExpressionNode(lastNode),
      environment,
      isBefore: true,
      isAfter: true
    })

    const currentToken = this.output(ETokenType.keyword, ['and', 'or'])

    const right =
      currentToken.value === 'and'
        ? this.astGenerator.expression.handleMaybeCompare(environment)
        : this.astGenerator.expression.handleMaybeLogical(environment, true)

    const LogicalExpression = createNode(ENodeType.LogicalExpression, {
      left: lastNode,
      right,
      operator: currentToken.value,
      loc: createLoc(lastNode, right)
    })

    return LogicalExpression
  }
}

export default LogicalExpression
