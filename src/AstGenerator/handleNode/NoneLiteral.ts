import { ENodeType, ETokenType, INoneLiteral } from '../../types.d'
import { addBaseNodeAttr, createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types.d'

class NoneLiteral extends BaseHandler {
  handle() {
    const NoneLiteral = this.handleNoneLiteral()
    return { code: EHandleCode.single, payload: NoneLiteral }
  }

  handleNoneLiteral(): INoneLiteral {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'None')) {
      throw new TypeError("handleNoneLiteral err: currentToken is not keyword 'None'")
    }

    const noneLiteral = this.createNode(ENodeType.NoneLiteral)
    const NoneLiteral = addBaseNodeAttr(noneLiteral, {
      loc: createLoc(currentToken, currentToken)
    })

    this.tokens.next()

    return NoneLiteral
  }
}

export default NoneLiteral
