import { ENodeType, ETokenType } from '../../types'
import { createLoc, checkBit, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

class BreakStatement extends BaseHandler {
  handle(environment: EEnvironment) {
    if (!checkBit(environment, EEnvironment.loopBody)) {
      throw new SyntaxError('"break" can be used only within a loop')
    }

    const breakToken = this.output(ETokenType.keyword, 'break')

    const BreakStatement = this.createNode(ENodeType.BreakStatement, {
      loc: createLoc(breakToken)
    })

    return BreakStatement
  }
}

export default BreakStatement
