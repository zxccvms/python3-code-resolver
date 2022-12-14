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
      return this.handle(lastNode as TAssignableExpressionNode, environment)
    }

    return lastNode
  }

  handle(lastNode: TAssignableExpressionNode, environment: EEnvironment): IAssignmentExpression {
    this.check({
      extraCheck: () => this.isConformNode(lastNode),
      environment,
      isAfter: true,
      isBefore: true
    })
    const operatorToken = this.output(ETokenType.operator, Object.values(EAssignmentExpressionOperator))

    const rightNode = this.astGenerator.expression.handleMaybeAssignment(environment)

    let targets: TAssignableExpressionNode[]
    let value: TExpressionNode
    if (isNode(rightNode, ENodeType.AssignmentExpression)) {
      targets = [lastNode, ...rightNode.targets]
      value = rightNode.value
    } else {
      targets = [lastNode]
      value = rightNode
    }

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
    } else {
      return isNode(node, [
        ENodeType.Identifier,
        ENodeType.StarredExpression,
        ENodeType.MemberExpression,
        ENodeType.SubscriptExpression
      ])
    }
  }

  isAssignmentToken() {
    return this.isToken(ETokenType.operator, Object.values(EAssignmentExpressionOperator))
  }
}

export default AssignmentExpression
