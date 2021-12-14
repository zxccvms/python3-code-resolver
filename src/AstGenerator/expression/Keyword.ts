import { ENodeType, ETokenType, IKeyword, TNotAssignmentExpressionNode } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** 赋值的参数 */
class Keyword extends BaseHandler {
  handle(): IKeyword {
    const currentToken = this.tokens.getToken()
    this.check({
      checkToken: () =>
        (isToken(currentToken, ETokenType.identifier) && isToken(this.tokens.getToken(1), ETokenType.operator, '=')) ||
        isToken(currentToken, ETokenType.operator, '**')
    })

    let name: string = null
    if (isToken(currentToken, ETokenType.identifier)) {
      name = currentToken.value
      this.tokens.next(2)
    } else {
      this.tokens.next()
    }

    const value = this.astGenerator.expression.handleMaybeIf(ENodeEnvironment.bracket)

    const Keyword = this.createNode(ENodeType.Keyword, {
      name,
      value,
      loc: createLoc(currentToken, value)
    })

    return Keyword
  }
}

export default Keyword
