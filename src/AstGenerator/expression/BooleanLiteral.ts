import { ENodeType, ETokenType, IBooleanLiteral } from '../../types'
import { createLoc, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 布尔 */
class BooleanLiteral extends Node {
  handle(environment: EEnvironment): IBooleanLiteral {
    this.check({ environment })
    const currentToken = this.output(ETokenType.keyword, ['True', 'False'])

    const BooleanLiteral = createNode(ENodeType.BooleanLiteral, {
      value: currentToken.value === 'True' ? true : false,
      loc: createLoc(currentToken, currentToken)
    })

    return BooleanLiteral
  }
}

export default BooleanLiteral
