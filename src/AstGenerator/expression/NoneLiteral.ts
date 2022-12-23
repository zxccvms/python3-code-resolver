import { ENodeType, ETokenType, INoneLiteral } from '../../types'
import { createLoc, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

class NoneLiteral extends Node {
  handle(environment: EEnvironment): INoneLiteral {
    this.check({ environment })

    const currentToken = this.output(ETokenType.keyword, 'None')
    const NoneLiteral = createNode(ENodeType.NoneLiteral, {
      loc: createLoc(currentToken, currentToken)
    })

    return NoneLiteral
  }
}

export default NoneLiteral
