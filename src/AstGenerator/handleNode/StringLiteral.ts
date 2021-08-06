import { ENodeType, ETokenType } from '../../types.d'
import { addBaseNodeAttr, createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types.d'

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

    const stringLiteral = this.createNode(ENodeType.StringLiteral, currentToken.value)
    const StringLiteral = addBaseNodeAttr(stringLiteral, {
      loc: createLoc(currentToken, currentToken)
    })

    this.tokens.next()

    return StringLiteral
  }
}

export default StringLiteral
