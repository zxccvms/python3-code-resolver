import { ENodeType, ETokenType, IBinaryExpression, TNode, TTokenItem } from '../../types'
import { addBaseNodeAttr, createLoc, isExpressionNode, isNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** 二进制表达式 */
class BinaryExpression extends BaseHandler {
  handle() {
    const BinaryExpression = this.handleBinaryExpression()
    return { code: EHandleCode.single, payload: BinaryExpression }
  }

  handleBinaryExpression(): IBinaryExpression {
    const currentToken = this.tokens.getToken()
    if (!this._isConformToken(currentToken)) {
      throw new TypeError(
        'handleBinaryExpression err: currentToken is not operator +, -, *, /, %, //, **, ==, !=, >=, <=, <, >'
      )
    }

    const leftNode = this.nodeChain.get()
    if (!isExpressionNode(leftNode)) {
      throw new TypeError('handleBinaryExpression err: currentToken is not expression node')
    }

    this.tokens.next()
    const rightNodes = this.findNodesByCount(1)
    if (!rightNodes) {
      throw new TypeError('handleBinaryExpression err: next node is not exsit')
    } else if (!isExpressionNode(rightNodes[0])) {
      throw new TypeError('handleBinaryExpression err: currentToken is not expression node')
    }

    const BinaryExpression = this.createNode(ENodeType.BinaryExpression, {
      operator: currentToken.value,
      left: leftNode,
      right: rightNodes[0],
      loc: createLoc(leftNode, rightNodes[0])
    })

    this.nodeChain.pop()

    return BinaryExpression
  }

  private _isConformToken(token: TTokenItem) {
    return isToken(token, ETokenType.operator, ['+', '-', '*', '/', '%', '//', '**', '==', '!=', '>=', '<=', '<', '>'])
  }
}

export default BinaryExpression
