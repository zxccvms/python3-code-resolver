import { ENodeType, ETokenType } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 数字 */
class NumberLiteral extends BaseHandler {
  handle(environment: EEnvironment = EEnvironment.normal) {
    const currentToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(currentToken, ETokenType.number),
      environment
    })

    const NumberLiteral = this.createNode(ENodeType.NumberLiteral, {
      value: Number(currentToken.value),
      raw: currentToken.value,
      loc: createLoc(currentToken, currentToken)
    })

    this.tokens.next()

    return NumberLiteral
  }
}

export default NumberLiteral
