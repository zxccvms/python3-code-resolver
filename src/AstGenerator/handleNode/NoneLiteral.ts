import { ENodeType, ETokenType, INoneLiteral } from '../../types'
import { addBaseNodeAttr, createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

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

    const NoneLiteral = this.createNode(ENodeType.NoneLiteral, {
      loc: createLoc(currentToken, currentToken)
    })

    this.tokens.next()

    return NoneLiteral
  }
}

export default NoneLiteral
