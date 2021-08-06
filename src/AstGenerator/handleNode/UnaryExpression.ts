import { ENodeType, ETokenType, IUnaryExpression } from '../../types'
import { addBaseNodeAttr, createLoc, isExpressionNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

class UnaryExpression extends BaseHandler {
  handle() {
    const UnaryExpression = this.handleUnaryExpression()
    return { code: EHandleCode.single, payload: UnaryExpression }
  }

  handleUnaryExpression(): IUnaryExpression {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, [ETokenType.operator, ETokenType.operator, ETokenType.keyword], ['+', '-', 'not'])) {
      throw new TypeError("handleUnaryExpression err: currentToken is not operator '+' or '-', keyword 'not' ")
    }

    this.tokens.next()
    const nextExpressions = this.findNodesByCount(1)
    if (!nextExpressions) {
      throw new SyntaxError("handleUnaryExpression err: can't find next node")
    } else if (!isExpressionNode(nextExpressions[0])) {
      throw new TypeError('handleUnaryExpression err: next node is not expression')
    }

    const nextExpression = nextExpressions[0]
    const UnaryExpression = this.createNode(ENodeType.UnaryExpression, {
      oprator: currentToken.value as '-' | '+',
      argument: nextExpression,
      loc: createLoc(currentToken, nextExpression)
    })

    return UnaryExpression
  }
}

export default UnaryExpression
