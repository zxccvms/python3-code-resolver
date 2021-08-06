import { ENodeType, ETokenType, IBooleanLiteral } from '../../types.d'
import { addBaseNodeAttr, createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types.d'

const booleanMap = {
  True: true,
  Flase: false
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

    const booleanLiteral = this.createNode(ENodeType.BooleanLiteral, booleanMap[currentToken.value])
    const BooleanLiteral = addBaseNodeAttr(booleanLiteral, {
      loc: createLoc(currentToken, currentToken)
    })

    this.tokens.next()

    return BooleanLiteral
  }
}

export default BooleanLiteral
