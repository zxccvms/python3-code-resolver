import { ENodeType, ETokenType } from '../../types'
import { createLoc, checkBit, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

class BreakStatement extends Node {
  handle(environment: EEnvironment) {
    if (!checkBit(environment, EEnvironment.loopBody)) {
      throw new SyntaxError('"break" can be used only within a loop')
    }

    const breakToken = this.output(ETokenType.keyword, 'break')

    const BreakStatement = createNode(ENodeType.BreakStatement, {
      loc: createLoc(breakToken)
    })

    return BreakStatement
  }
}

export default BreakStatement
