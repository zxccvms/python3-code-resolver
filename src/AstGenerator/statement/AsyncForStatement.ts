import AstGenerator from '../AstGenerator'
import { ENodeType, ETokenType, IBlockStatement, IForStatement, TAssignableExpressionNode } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** async for 语句 */
class AsyncForStatement extends BaseHandler {
  handle(environment: EEnvironment): IForStatement {
    const asyncToken = this.output(ETokenType.keyword, 'async')
    this.outputLine(ETokenType.keyword, 'for')

    const target = this._handleTarget(environment)

    this.outputLine(ETokenType.keyword, 'in')

    const iterable = this.astGenerator.expression.handleMaybeTuple(environment)

    const body = this.astGenerator.statement.blockStatement.handle(asyncToken, environment | EEnvironment.loopBody)

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
      loc: createLoc(asyncToken, elseBody || body)
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

export default AsyncForStatement
