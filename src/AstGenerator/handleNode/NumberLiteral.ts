import { ENodeType, ETokenType } from '../../types'
import { addBaseNodeAttr, createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** 数字 */
class NumberLiteral extends BaseHandler {
  handle() {
    const NumberLiteral = this.handleNumberLiteral()
    return { code: EHandleCode.single, payload: NumberLiteral }
  }

  handleNumberLiteral() {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.number)) {
      throw new TypeError('handleNumberLiteral err: currentToken is not number')
    }

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
