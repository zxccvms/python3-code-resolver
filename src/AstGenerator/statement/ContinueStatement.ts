import { ENodeType, ETokenType, IContinueStatement } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'

/** continue循环语句 */
class ContinueStatement extends BaseHandler {
  handle(): IContinueStatement {
    const continueToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(continueToken, ETokenType.keyword, 'continue')
    })

    this.tokens.next()

    const ContinueStatement = this.createNode(ENodeType.ContinueStatement, {
      loc: createLoc(continueToken)
    })

    return ContinueStatement
  }
}

export default ContinueStatement
