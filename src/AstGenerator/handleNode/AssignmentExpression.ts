import { ENodeType, ETokenType, IAssignmentExpression } from '../../types'
import {
  addBaseNodeAttr,
  createLoc,
  isAssignmentToken,
  isExpressionNode,
  isNode,
  isSameRank,
  isToken
} from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

class AssignmentExpression extends BaseHandler {
  handle() {
    const AssignmentExpression = this.handleAssignmentExpression()
    return { code: EHandleCode.single, payload: AssignmentExpression }
  }

  /** 处理赋值表达式 */
  handleAssignmentExpression(): IAssignmentExpression {
    const currentToken = this.tokens.getToken()
    if (!isAssignmentToken(currentToken)) {
      throw new TypeError('handleAssignmentExpression err: currentToken is not assignment token')
    }

    const lastNode = this.nodeChain.get()
    if (!isNode(lastNode, [ENodeType.TupleExpression, ENodeType.Identifier, ENodeType.MemberExpression])) {
      throw new TypeError('handleAssignmentExpression err: lastNode is not Tuple or Identifier')
    }

    this.tokens.next()
    const nodes =
      this.findNodesByConformToken((token) => isSameRank(currentToken, token, 'line')) ||
      this.nodeChain.popByTarget(lastNode)
    if (nodes.length !== 1) {
      throw new SyntaxError('handleAssignmentExpression err: node count is not equal 1')
    } else if (!isExpressionNode(nodes[0])) {
      throw new TypeError('handleAssignmentExpression err: node is not expression node')
    }

    const node = nodes[0]
    let AssignmentExpression: IAssignmentExpression
    if (isNode(node, ENodeType.AssignmentExpression)) {
      AssignmentExpression = this.createNode(ENodeType.AssignmentExpression, {
        targets: [lastNode, ...node.targets],
        operator: currentToken.value,
        value: node.value,
        loc: createLoc(lastNode, node.value)
      })
    } else {
      AssignmentExpression = this.createNode(ENodeType.AssignmentExpression, {
        targets: [lastNode],
        operator: currentToken.value,
        value: node,
        loc: createLoc(lastNode, node)
      })
    }

    this.nodeChain.pop() // lastNode 被消费
    return AssignmentExpression
  }
}

export default AssignmentExpression
