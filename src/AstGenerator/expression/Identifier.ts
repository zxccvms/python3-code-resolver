import { ENodeType, ETokenType, IIdentifier } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 标识符 */
class Identifier extends BaseHandler {
  handle(environment: EEnvironment = EEnvironment.normal): IIdentifier {
    const currentToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(currentToken, ETokenType.identifier),
      environment,
      isAssignableExpression: true,
      isDecorativeExpression: true
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
