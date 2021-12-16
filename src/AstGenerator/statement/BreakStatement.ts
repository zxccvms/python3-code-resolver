import { ENodeType, ETokenType } from 'src/types'
import { createLoc, checkBit, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

class BreakStatement extends BaseHandler {
  handle(environment: EEnvironment) {
    if (!checkBit(environment, EEnvironment.loopBody)) {
      throw new SyntaxError('"break" can be used only within a loop')
    }

    const breakToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(breakToken, ETokenType.keyword, 'break')
    })

    this.tokens.next()
    const BreakStatement = this.createNode(ENodeType.BreakStatement, {
      loc: createLoc(breakToken)
    })

    return BreakStatement
  }
}

export default BreakStatement
