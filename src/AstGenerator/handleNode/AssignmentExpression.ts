import { ENodeType, ETokenType, IAssignmentExpression } from '../../types.d'
import { addBaseNodeAttr, createLoc, isNode, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types.d'

class AssignmentExpression extends BaseHandler {
  handle() {
    const AssignmentExpression = this.handleAssignmentExpression()
    return { code: EHandleCode.single, payload: AssignmentExpression }
  }

  /** 处理赋值表达式 */
  handleAssignmentExpression(): IAssignmentExpression {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.operator, '=')) {
      throw new TypeError('handleAssignmentExpression err: currentToken is not operator "="')
    }

    const lastNode = this.nodeChain.get()
    if (!isNode(lastNode, [ENodeType.TupleExpression, ENodeType.Identifier, ENodeType.MemberExpression])) {
      throw new TypeError('handleAssignmentExpression err: lastNode is not Tuple or Identifier')
    }

    this.tokens.next() // token '=' 在函数内被消费 将索引移至下一个
    const nodes =
      this.findNodesByConformToken(token => isSameRank(currentToken, token, 'line')) ||
      this.nodeChain.popByTarget(lastNode)
    if (nodes.length !== 1) {
      throw new SyntaxError('_handleAssignmentExpression err: node count is not equal 1')
    }

    const node = nodes[0]
    let assignmentExpression: IAssignmentExpression
    if (isNode(node, ENodeType.AssignmentExpression)) {
      assignmentExpression = this.createNode(ENodeType.AssignmentExpression, [lastNode, ...node.targets], node.value)
    } else {
      assignmentExpression = this.createNode(ENodeType.AssignmentExpression, [lastNode], node)
    }

    const AssignmentExpression = addBaseNodeAttr(assignmentExpression, {
      loc: createLoc(lastNode, assignmentExpression.value)
    })

    this.nodeChain.pop() // lastNode 被消费
    return AssignmentExpression
  }
}

export default AssignmentExpression
