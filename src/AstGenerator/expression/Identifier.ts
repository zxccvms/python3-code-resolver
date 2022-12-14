import { ENodeType, ETokenType, IIdentifier } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 标识符 */
class Identifier extends BaseHandler {
  handle(environment: EEnvironment): IIdentifier {
    this.check({
      environment,
      isDecorativeExpression: true,
      isAssignableExpression: true
    })
    const currentToken = this.output(ETokenType.identifier)

    const Identifier = this.createNode(ENodeType.Identifier, {
      name: currentToken.value,
      loc: createLoc(currentToken, currentToken)
    })

    return Identifier
  }
}

export default Identifier
