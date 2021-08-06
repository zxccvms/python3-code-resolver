import { ENodeType, ETokenType } from '../../types'
import { addBaseNodeAttr, createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** 字符串 */
class StringLiteral extends BaseHandler {
  handle() {
    const StringLiteral = this.handleStringLiteral()
    return { code: EHandleCode.single, payload: StringLiteral }
  }

  handleStringLiteral() {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.string)) {
      throw new TypeError('handleStringLiteral err: currentToken is not string')
    }

    const StringLiteral = this.createNode(ENodeType.StringLiteral, {
      value: currentToken.value,
      raw: JSON.stringify(currentToken.value),
      loc: createLoc(currentToken, currentToken)
    })

    this.tokens.next()

    return StringLiteral
  }
}

export default StringLiteral
