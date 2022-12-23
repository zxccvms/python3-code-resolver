import { ENodeType, ETokenType, IReturnStatement } from '../../types'
import { createLoc, checkBit, isSameRank, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

class ReturnStatement extends Node {
  handle(environment: EEnvironment): IReturnStatement {
    if (!checkBit(environment, EEnvironment.functionBody)) {
      throw new SyntaxError('"return" can be used only within a function')
    }

    const returnToken = this.output(ETokenType.keyword, 'return')

    let argument = null
    if (isSameRank([returnToken, this.tokens.getToken()], 'endAndStartLine')) {
      argument = this.astGenerator.expression.handleMaybeTuple(environment)
    }

    const ReturnStatement = createNode(ENodeType.ReturnStatement, {
      argument,
      loc: createLoc(returnToken, argument)
    })

    return ReturnStatement
  }
}

export default ReturnStatement
