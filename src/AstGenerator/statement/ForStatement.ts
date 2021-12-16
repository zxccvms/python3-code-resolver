import AstGenerator from '../AstGenerator'
import { ENodeType, ETokenType, IForStatement, TAssignableExpressionNode } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** for 语句 */
class ForStatement extends BaseHandler {
  handle(environment: EEnvironment): IForStatement {
    const forToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(forToken, ETokenType.keyword, 'for')
    })

    this.tokens.next()
    const target = this._handleTarget()

    this.tokens.next()
    const iterable = this.astGenerator.expression.handleMaybeTuple()

    const body = this.astGenerator.statement.blockStatement.handle(forToken, environment | EEnvironment.loopBody)

    const ForStatement = this.createNode(ENodeType.ForStatement, {
      target,
      iterable,
      body,
      loc: createLoc(forToken, body)
    })

    return ForStatement
  }

  private _handleTarget(): TAssignableExpressionNode {
    const { code, payload: tokens } = this.findTokens(token => isToken(token, ETokenType.keyword, 'in'))
    if (code === 1) throw new SyntaxError("Expected 'in'")

    const astGenerator = new AstGenerator(tokens)
    const target = astGenerator.expression.handleMaybeTuple(EEnvironment.assign) as TAssignableExpressionNode

    return target
  }
}

export default ForStatement
