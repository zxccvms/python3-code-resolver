import { ENodeType, ETokenType, IBooleanLiteral } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'

/** 布尔 */
class BooleanLiteral extends BaseHandler {
  handle(): IBooleanLiteral {
    const currentToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(currentToken, ETokenType.keyword, ['True', 'False'])
    })

    const BooleanLiteral = this.createNode(ENodeType.BooleanLiteral, {
      value: currentToken.value === 'True' ? true : false,
      loc: createLoc(currentToken, currentToken)
    })

    this.tokens.next()

    return BooleanLiteral
  }
}

export default BooleanLiteral
