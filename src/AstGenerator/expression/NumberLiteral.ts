import { ENodeType, ETokenType } from '../../types'
import { createLoc } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 数字 */
class NumberLiteral extends BaseHandler {
  handle(environment: EEnvironment) {
    this.check({ environment })
    const numberToken = this.output(ETokenType.number)

    const NumberLiteral = this.createNode(ENodeType.NumberLiteral, {
      value: Number(numberToken.value.replace(/j|_/g, '')), // js不支持复数
      raw: numberToken.value,
      loc: createLoc(numberToken)
    })

    return NumberLiteral
  }
}

export default NumberLiteral
