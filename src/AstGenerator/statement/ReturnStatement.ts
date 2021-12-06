import { ENodeType, ETokenType, IReturnStatement } from 'src/types'
import { createLoc, hasEnvironment, isSameRank, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

class ReturnStatement extends BaseHandler {
  handle(environment: ENodeEnvironment): IReturnStatement {
    if (!hasEnvironment(environment, ENodeEnvironment.functionBody)) {
      throw new SyntaxError('"return" can be used only within a function')
    }

    const returnToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(returnToken, ETokenType.keyword, 'return')
    })

    this.tokens.next()
    let argument
    if (isSameRank([returnToken, this.tokens.getToken()], 'endAndStartLine')) {
      argument = this.astGenerator.expression.handleMaybeTuple()
    }

    const ReturnStatement = this.createNode(ENodeType.ReturnStatement, {
      argument,
      loc: createLoc(returnToken, argument)
    })

    return ReturnStatement
  }
}

export default ReturnStatement
