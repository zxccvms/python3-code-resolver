import { ENodeType, ETokenType, IKeyword } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** 赋值的参数 */
class Keyword extends BaseHandler {
  handle(): IKeyword {
    const identifierToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(identifierToken, ETokenType.identifier)
    })

    this.tokens.next()
    const equalToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(equalToken, ETokenType.operator, '=')
    })

    this.tokens.next()
    const value = this.astGenerator.expression.handleMaybeIf(ENodeEnvironment.bracket)

    const Keyword = this.createNode(ENodeType.Keyword, {
      name: identifierToken.value,
      value,
      loc: createLoc(identifierToken, value)
    })

    return Keyword
  }
}

export default Keyword
