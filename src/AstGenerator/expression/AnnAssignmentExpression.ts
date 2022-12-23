import { ENodeType, ETokenType, IAnnAssignmentExpression, TExpressionNode } from '../../types'
import { createLoc, createNode, isNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

class AnnAssignmentExpression extends Node {
  handleMaybe(lastNode: TExpressionNode, environment: EEnvironment): TExpressionNode {
    if (!this.isToken(ETokenType.punctuation, ':')) return lastNode

    return this.handle(lastNode, environment)
  }

  handle(lastNode: TExpressionNode, environment: EEnvironment): IAnnAssignmentExpression {
    if (!isNode(lastNode, [ENodeType.Identifier, ENodeType.MemberExpression, ENodeType.SubscriptExpression])) {
      throw new SyntaxError('only single target can be annotated')
    }

    this.check({ environment, isAfter: true, isBefore: true })
    this.output(ETokenType.punctuation, ':')

    const annotation = this.astGenerator.expression.handleMaybeIf(environment)

    let value: TExpressionNode = null
    if (this.eat(ETokenType.operator, '=')) {
      value = this.astGenerator.expression.handleMaybeTuple(environment)
    }

    const AnnAssignmentExpression = createNode(ENodeType.AnnAssignmentExpression, {
      annotation,
      target: lastNode,
      value,
      loc: createLoc(lastNode, value)
    })

    return AnnAssignmentExpression
  }
}

export default AnnAssignmentExpression
