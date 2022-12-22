import AstGenerator from '../AstGenerator'
import { ENodeType, ETokenType, IBlockStatement, IForStatement, TAssignableExpressionNode } from '../../types'
import { createLoc, isToken } from '../../utils'
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

    let elseBody: IBlockStatement = null
    const elseToken = this.eat(ETokenType.keyword, 'else')
    if (elseToken) {
      elseBody = this.astGenerator.statement.blockStatement.handle(elseToken, environment)
    }

    const ForStatement = this.createNode(ENodeType.ForStatement, {
      target,
      iterable,
      body,
      elseBody,
      loc: createLoc(forToken, elseBody || body)
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
