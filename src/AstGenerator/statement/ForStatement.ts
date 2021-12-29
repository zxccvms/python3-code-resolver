import AstGenerator from '../AstGenerator'
import { ENodeType, ETokenType, IForStatement, TAssignableExpressionNode } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** for 语句 */
class ForStatement extends BaseHandler {
  handle(environment: EEnvironment): IForStatement {
    const forToken = this.output(ETokenType.keyword, 'for')

    const target = this._handleTarget(environment)

    this.output(ETokenType.keyword, 'in')

    const iterable = this.astGenerator.expression.handleMaybeTuple(environment)

    const body = this.astGenerator.statement.blockStatement.handle(forToken, environment | EEnvironment.loopBody)

    const ForStatement = this.createNode(ENodeType.ForStatement, {
      target,
      iterable,
      body,
      loc: createLoc(forToken, body)
    })

    return ForStatement
  }

  private _handleTarget(environment: EEnvironment): TAssignableExpressionNode {
    const { code, payload: tokens } = this.findTokens(token => isToken(token, ETokenType.keyword, 'in'))
    if (code === 1) throw new SyntaxError("Expected 'in'")

    const astGenerator = new AstGenerator(tokens)
    const target = astGenerator.expression.handleMaybeTuple(environment)

    if (!this.astGenerator.expression.assignmentExpression.isConformNode(target)) {
      throw new TypeError('Expression cannot be assignment target')
    }

    return target
  }
}

export default ForStatement
