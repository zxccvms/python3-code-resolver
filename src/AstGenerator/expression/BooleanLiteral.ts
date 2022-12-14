import { ENodeType, ETokenType, IBooleanLiteral } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 布尔 */
class BooleanLiteral extends BaseHandler {
  handle(environment: EEnvironment): IBooleanLiteral {
    this.check({ environment })
    const currentToken = this.output(ETokenType.keyword, ['True', 'False'])

    const BooleanLiteral = this.createNode(ENodeType.BooleanLiteral, {
      value: currentToken.value === 'True' ? true : false,
      loc: createLoc(currentToken, currentToken)
    })

    return BooleanLiteral
  }
}

export default BooleanLiteral
