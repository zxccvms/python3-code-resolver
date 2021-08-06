import { ENodeType, ETokenType, IIdentifier } from '../../types'
import { addBaseNodeAttr, createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** 标识符 */
class Identifier extends BaseHandler {
  handle() {
    const Identifier = this.handleIdentifier()
    return { code: EHandleCode.single, payload: Identifier }
  }

  handleIdentifier(): IIdentifier {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.identifier)) {
      throw new TypeError('handleIdentifier err: currentToken is not identifier')
    }

    const Identifier = this.createNode(ENodeType.Identifier, {
      name: currentToken.value,
      loc: createLoc(currentToken, currentToken)
    })

    this.tokens.next()

    return Identifier
  }
}

export default Identifier
