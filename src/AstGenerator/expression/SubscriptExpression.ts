import { ENodeType, ETokenType, ISubscriptExpression, TExpressionNode } from '../../types'
import { createLoc, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 下标表达式 */
class SubscriptExpression extends Node {
  handle(lastNode: TExpressionNode, environment: EEnvironment): ISubscriptExpression {
    this.check({ environment, isAssignableExpression: true })

    this.outputLine(environment, ETokenType.bracket, '[')

    const slice = this.astGenerator.expression.handleMaybeTuple(
      environment | EEnvironment.bracket | EEnvironment.subscript
    )

    const rightMediumBracket = this.output(ETokenType.bracket, ']')

    const SubscriptExpression = createNode(ENodeType.SubscriptExpression, {
      value: lastNode,
      slice,
      loc: createLoc(lastNode, rightMediumBracket)
    })

    return SubscriptExpression
  }
}

export default SubscriptExpression
