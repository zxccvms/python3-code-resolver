import { ENodeType, ETokenType, IWhileStatement } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** while循环语句 */
class WhileStatement extends BaseHandler {
  handle(environment: EEnvironment): IWhileStatement {
    const whileToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(whileToken, ETokenType.keyword, 'while'),
      isAfter: true
    })

    this.tokens.next()
    const test = this.astGenerator.expression.handleMaybeIf(environment)
    const body = this.astGenerator.statement.blockStatement.handle(whileToken, environment | EEnvironment.loopBody)

    const WhileStatement = this.createNode(ENodeType.WhileStatement, {
      test,
      body,
      loc: createLoc(whileToken)
    })

    return WhileStatement
  }
}

export default WhileStatement
