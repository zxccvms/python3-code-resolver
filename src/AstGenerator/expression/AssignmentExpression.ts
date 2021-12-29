import {
  EAssignmentExpressionOperator,
  ENodeType,
  ETokenType,
  IAssignmentExpression,
  TAssignableExpressionNode,
  TExpressionNode,
  TNode,
  TToken
} from '../../types'
import { createLoc, isNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

class AssignmentExpression extends BaseHandler {
  handleMaybe(lastNode: TExpressionNode, environment: EEnvironment): TExpressionNode {
    if (this.isAssignmentToken()) {
      return this.handle(lastNode, environment)
    }

    return lastNode
  }

  handle(lastNode: TExpressionNode, environment: EEnvironment): IAssignmentExpression {
    this.check({
      // extraCheck: () => this._isConformNode(lastNode),
      environment,
      isAfter: true,
      isBefore: true
    })
    const operatorToken = this.output(ETokenType.operator, Object.values(EAssignmentExpressionOperator))

    const rightNode = this.astGenerator.expression.handleMaybeAssignment(environment)

    const isAssignmentExpression = isNode(rightNode, ENodeType.AssignmentExpression)
    const targets = (
      isAssignmentExpression ? [lastNode, ...rightNode.targets] : [lastNode]
    ) as IAssignmentExpression['targets']
    const value = isAssignmentExpression ? rightNode.value : rightNode

    const AssignmentExpression = this.createNode(ENodeType.AssignmentExpression, {
      targets,
      value,
      operator: operatorToken.value,
      loc: createLoc(lastNode, rightNode)
    })

    return AssignmentExpression
  }

  isConformNode(node: TNode): node is TAssignableExpressionNode {
    if (isNode(node, [ENodeType.ArrayExpression, ENodeType.TupleExpression])) {
      return node.elements.every(node => this.isConformNode(node))
    } else
      return isNode(node, [
        ENodeType.Identifier,
        ENodeType.StarredExpression,
        ENodeType.MemberExpression,
        ENodeType.SubscriptExpression
      ])
  }

  isAssignmentToken() {
    return this.isToken(ETokenType.operator, Object.values(EAssignmentExpressionOperator))
  }
}

export default AssignmentExpression
