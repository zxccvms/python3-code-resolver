import { ENodeType, ETokenType, IContinueStatement } from '../../types'
import { createLoc, checkBit, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** continue循环语句 */
class ContinueStatement extends BaseHandler {
  handle(environment: EEnvironment): IContinueStatement {
    if (!checkBit(environment, EEnvironment.loopBody)) {
      throw new SyntaxError('"continue" can be used only within a loop')
    }

    const continueToken = this.output(ETokenType.keyword, 'continue')

    const ContinueStatement = this.createNode(ENodeType.ContinueStatement, {
      loc: createLoc(continueToken)
    })

    return ContinueStatement
  }
}

export default ContinueStatement
