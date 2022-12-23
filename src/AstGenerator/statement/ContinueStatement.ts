import { ENodeType, ETokenType, IContinueStatement } from '../../types'
import { createLoc, checkBit, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** continue循环语句 */
class ContinueStatement extends Node {
  handle(environment: EEnvironment): IContinueStatement {
    if (!checkBit(environment, EEnvironment.loopBody)) {
      throw new SyntaxError('"continue" can be used only within a loop')
    }

    const continueToken = this.output(ETokenType.keyword, 'continue')

    const ContinueStatement = createNode(ENodeType.ContinueStatement, {
      loc: createLoc(continueToken)
    })

    return ContinueStatement
  }
}

export default ContinueStatement
