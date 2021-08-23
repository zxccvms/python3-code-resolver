import { ENodeType, ETokenType } from '../../types'
import { addBaseNodeAttr, createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'

/** 数字 */
class NumberLiteral extends BaseHandler {
  handle() {
    const currentToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(currentToken, ETokenType.number)
    })

    const NumberLiteral = this.createNode(ENodeType.NumberLiteral, {
      value: Number(currentToken.value),
      raw: currentToken.value,
      loc: createLoc(currentToken, currentToken)
    })

    this.tokens.next()

    return NumberLiteral
  }
}

export default NumberLiteral
