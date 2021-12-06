import { ENodeType, ETokenType, IContinueStatement } from 'src/types'
import { createLoc, hasEnvironment, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** continue循环语句 */
class ContinueStatement extends BaseHandler {
  handle(environment: ENodeEnvironment): IContinueStatement {
    if (!hasEnvironment(environment, ENodeEnvironment.loopBody)) {
      throw new SyntaxError('"continue" can be used only within a loop')
    }

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
