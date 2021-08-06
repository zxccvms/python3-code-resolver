import { ENodeType, ETokenType, IUnaryExpression } from '../../types.d'
import { addBaseNodeAttr, createLoc, isExpressionNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types.d'

class UnaryExpression extends BaseHandler {
  handle() {
    const UnaryExpression = this.handleUnaryExpression()
    return { code: EHandleCode.single, payload: UnaryExpression }
  }

  handleUnaryExpression(): IUnaryExpression {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, [ETokenType.operator, ETokenType.operator], ['+', '-'])) {
      throw new TypeError("handleUnaryExpression err: currentToken is not operator '+' or '-' ")
    }

    this.tokens.next()
    const nextExpressions = this.findNodesByCount(1)
    if (!nextExpressions) {
      throw new SyntaxError("handleUnaryExpression err: can't find next node")
    } else if (!isExpressionNode(nextExpressions[0])) {
      throw new TypeError('handleUnaryExpression err: next node is not expression')
    }

    const nextExpression = nextExpressions[0]
    const unaryExpression = this.createNode(ENodeType.UnaryExpression, currentToken.value as '-' | '+', nextExpression)
    const UnaryExpression = addBaseNodeAttr(unaryExpression, {
      loc: createLoc(currentToken, nextExpression)
    })

    return UnaryExpression
  }
}

export default UnaryExpression
