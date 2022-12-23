import { ENodeType, ETokenType, IIdentifier } from '../../types'
import { createLoc, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 标识符 */
class Identifier extends Node {
  handle(environment: EEnvironment): IIdentifier {
    this.check({
      environment,
      isDecorativeExpression: true,
      isAssignableExpression: true
    })
    const currentToken = this.output(ETokenType.identifier)

    const Identifier = createNode(ENodeType.Identifier, {
      name: currentToken.value,
      loc: createLoc(currentToken, currentToken)
    })

    return Identifier
  }
}

export default Identifier
