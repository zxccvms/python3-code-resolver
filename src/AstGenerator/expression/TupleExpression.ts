import { ENodeType, ETokenType, ITupleExpression, TExpressionNode } from '../../types'
import { createLoc, checkBit, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 处理元组 */
class TupleExpression extends Node {
  handleMaybe(
    lastNode: TExpressionNode,
    environment: EEnvironment,
    handleExpression?: (environment: EEnvironment) => TExpressionNode
  ) {
    if (!this.isToken(ETokenType.punctuation, ',')) return lastNode
    else if (!this.isContinue(environment)) return lastNode
    else if (checkBit(environment, EEnvironment.assign) && !checkBit(environment, EEnvironment.bracket)) return lastNode

    return this.handle(lastNode, environment, handleExpression)
  }

  handle(
    lastNode: TExpressionNode,
    environment: EEnvironment,
    handleExpression?: (environment: EEnvironment) => TExpressionNode
  ): ITupleExpression {
    this.check({
      checkToken: () => this.isToken(ETokenType.punctuation, ','),
      environment,
      isBefore: true,
      isAssignableExpression: true
    })

    const elements = this._handleElements(environment, [lastNode], handleExpression)

    const TupleExpression = createNode(ENodeType.TupleExpression, {
      elements,
      loc: createLoc(lastNode, this.tokens.getToken(-1))
    })

    return TupleExpression
  }

  private _handleElements(
    environment: EEnvironment,
    elementStack: TExpressionNode[],
    handleExpression = (environment: EEnvironment) => this.astGenerator.expression.handleMaybeIf(environment)
  ): TExpressionNode[] {
    if (!this.eat(ETokenType.punctuation, ',')) return elementStack
    else if (this.isToken(ETokenType.bracket, ')')) return elementStack
    else if (this.astGenerator.expression.assignmentExpression.isAssignmentToken()) return elementStack
    else if (!this.isContinue(environment)) return elementStack

    const expression = handleExpression(environment)
    elementStack.push(expression)

    return this._handleElements(environment, elementStack)
  }
}

export default TupleExpression
