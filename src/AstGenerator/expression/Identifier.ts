import { ENodeType, ETokenType, IIdentifier } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'

/** 标识符 */
class Identifier extends BaseHandler {
  handle(): IIdentifier {
    const currentToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(currentToken, ETokenType.identifier)
    })

    const Identifier = this.createNode(ENodeType.Identifier, {
      name: currentToken.value,
      loc: createLoc(currentToken, currentToken)
    })

    this.tokens.next()

    return Identifier
  }
}

export default Identifier
