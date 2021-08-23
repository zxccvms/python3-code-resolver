import { ENodeType, ETokenType, INoneLiteral } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'

class NoneLiteral extends BaseHandler {
  handle(): INoneLiteral {
    const currentToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(currentToken, ETokenType.keyword, 'None')
    })

    const NoneLiteral = this.createNode(ENodeType.NoneLiteral, {
      loc: createLoc(currentToken, currentToken)
    })

    this.tokens.next()

    return NoneLiteral
  }
}

export default NoneLiteral
