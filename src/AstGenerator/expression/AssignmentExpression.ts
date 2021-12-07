import {
  ENodeType,
  ETokenType,
  IArrayExpression,
  IAssignmentExpression,
  IIdentifier,
  IMemberExpression,
  ISubscriptExpression,
  ITupleExpression,
  TExpressionNode,
  TNode,
  TToken
} from '../../types'
import { createLoc, isNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

class AssignmentExpression extends BaseHandler {
  handleMaybe(lastNode: TExpressionNode, environment: ENodeEnvironment): TExpressionNode {
    const currentToken = this.tokens.getToken()
    if (this._isConformToken(currentToken)) {
      return this.handle(lastNode, environment)
    }

    return lastNode
  }

  handle(lastNode: TExpressionNode, environment: ENodeEnvironment): IAssignmentExpression {
    const currentToken = this.tokens.getToken()

    this.check({
      checkToken: () => this._isConformToken(currentToken),
      extraCheck: () => this._isConformNode(lastNode),
      environment,
      isAfter: true,
      isBefore: true
    })

    this.tokens.next()
    const rightNode = this.astGenerator.expression.handleMaybeAssignment()

    const isAssignmentExpression = isNode(rightNode, ENodeType.AssignmentExpression)
    const targets = (
      isAssignmentExpression ? [lastNode, ...rightNode.targets] : [lastNode]
    ) as IAssignmentExpression['targets']
    const value = isAssignmentExpression ? rightNode.value : rightNode

    const AssignmentExpression = this.createNode(ENodeType.AssignmentExpression, {
      targets,
      value,
      operator: currentToken.value as '=' | '+=' | '-=' | '*=' | '/=' | '%=' | '**=' | '//=',
      loc: createLoc(lastNode, rightNode)
    })

    return AssignmentExpression
  }

  private _isConformNode(
    node: TNode
  ): node is ITupleExpression | IIdentifier | IMemberExpression | ISubscriptExpression | IArrayExpression {
    if (isNode(node, [ENodeType.ArrayExpression, ENodeType.TupleExpression])) {
      return node.elements.every(node => isNode(node, ENodeType.Identifier))
    } else return isNode(node, [ENodeType.Identifier, ENodeType.MemberExpression, ENodeType.SubscriptExpression])
  }

  private _isConformToken(token: TToken) {
    return isToken(token, ETokenType.operator, ['=', '+=', '-=', '*=', '/=', '%=', '**=', '//='])
  }
}

export default AssignmentExpression
