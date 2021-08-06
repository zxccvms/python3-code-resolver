import { ENodeType, ETokenType, IBooleanLiteral } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

const booleanMap = {
  True: true,
  False: false
}

/** 布尔 */
class BooleanLiteral extends BaseHandler {
  handle() {
    const BooleanLiteral = this.handleBooleanLiteral()
    return { code: EHandleCode.single, payload: BooleanLiteral }
  }

  handleBooleanLiteral(): IBooleanLiteral {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, ['True', 'False'])) {
      throw new TypeError("handleBooleanLiteral err: currentToken is not keyword 'True' or 'False'")
    }

    const BooleanLiteral = this.createNode(ENodeType.BooleanLiteral, {
      value: booleanMap[currentToken.value],
      loc: createLoc(currentToken, currentToken)
    })

    this.tokens.next()

    return BooleanLiteral
  }
}

export default BooleanLiteral
