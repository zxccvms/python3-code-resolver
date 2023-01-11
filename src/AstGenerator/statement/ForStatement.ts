import AstGenerator from '..'
import { ENodeType, ETokenType, IBlockStatement, IForStatement, TAssignableExpressionNode, TNode } from '../../types'
import { createLoc, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** for 语句 */
class ForStatement extends Node {
  handle(environment: EEnvironment): IForStatement {
    const forToken = this.output(ETokenType.keyword, 'for')

    const target = this._handleTarget(environment)

    this.outputLine(environment, ETokenType.keyword, 'in')

    const iterable = this.astGenerator.expression.handleMaybeTuple(environment)

    const body = this.astGenerator.statement.handleBody(environment | EEnvironment.loopBody, forToken)

    let elseBody: TNode[] = null
    const elseToken = this.eat(ETokenType.keyword, 'else')
    if (elseToken) {
      elseBody = this.astGenerator.statement.handleBody(environment, elseToken)
    }

    const ForStatement = createNode(ENodeType.ForStatement, {
      target,
      iterable,
      body,
      elseBody,
      loc: createLoc(forToken, (elseBody || body).at(-1))
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
