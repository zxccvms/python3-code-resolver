import { ENodeType, ETokenType } from '../../types'
import { createLoc, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 数字 */
class NumberLiteral extends Node {
  handle(environment: EEnvironment) {
    this.check({ environment })
    const numberToken = this.output(ETokenType.number)

    const NumberLiteral = createNode(ENodeType.NumberLiteral, {
      value: Number(numberToken.value.replace(/j|_/g, '')), // js不支持复数
      raw: numberToken.value,
      loc: createLoc(numberToken)
    })

    return NumberLiteral
  }
}

export default NumberLiteral
