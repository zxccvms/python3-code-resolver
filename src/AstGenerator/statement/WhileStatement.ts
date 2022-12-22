import { ENodeType, ETokenType, IBlockStatement, IWhileStatement } from '../../types'
import { createLoc } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** while循环语句 */
class WhileStatement extends BaseHandler {
  handle(environment: EEnvironment): IWhileStatement {
    this.check({ isAfter: true })
    const whileToken = this.output(ETokenType.keyword, 'while')
    const test = this.astGenerator.expression.handleMaybeIf(environment)
    const body = this.astGenerator.statement.blockStatement.handle(whileToken, environment | EEnvironment.loopBody)

    let elseBody: IBlockStatement = null
    const elseToken = this.eat(ETokenType.keyword, 'else')
    if (elseToken) {
      elseBody = this.astGenerator.statement.blockStatement.handle(elseToken, environment)
    }

    const WhileStatement = this.createNode(ENodeType.WhileStatement, {
      test,
      body,
      elseBody,
      loc: createLoc(whileToken, elseBody || body)
    })

    return WhileStatement
  }
}

export default WhileStatement
