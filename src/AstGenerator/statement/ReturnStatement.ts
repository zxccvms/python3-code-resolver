import { ENodeType, ETokenType, IReturnStatement } from 'src/types'
import { createLoc, checkBit, isSameRank } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

class ReturnStatement extends BaseHandler {
  handle(environment: EEnvironment): IReturnStatement {
    if (!checkBit(environment, EEnvironment.functionBody)) {
      throw new SyntaxError('"return" can be used only within a function')
    }

    const returnToken = this.output(ETokenType.keyword, 'return')

    let argument
    if (isSameRank([returnToken, this.tokens.getToken()], 'endAndStartLine')) {
      argument = this.astGenerator.expression.handleMaybeTuple(environment)
    }

    const ReturnStatement = this.createNode(ENodeType.ReturnStatement, {
      argument,
      loc: createLoc(returnToken, argument)
    })

    return ReturnStatement
  }
}

export default ReturnStatement
