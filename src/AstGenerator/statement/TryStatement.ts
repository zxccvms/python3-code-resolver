import {
  ENodeType,
  ETokenType,
  IBlockStatement,
  IExceptHandler,
  ITryStatement,
  TExpressionNode,
  TNode
} from '../../types'
import { createLoc, getLatest, isSameRank, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** try语句 */
class TryStatement extends Node {
  handle(environment: EEnvironment): ITryStatement {
    const tryToken = this.output(ETokenType.keyword, 'try')

    const body = this.astGenerator.statement.handleBody(environment, tryToken)
    const handlers = this._handleHandlers(environment)

    let elseBody: TNode[] = null
    const elseToken = this.eat(ETokenType.keyword, 'else')
    if (elseToken) {
      if (!handlers.length) {
        throw new SyntaxError('Try statement must have at least one except or finally clause')
      }

      elseBody = this.astGenerator.statement.handleBody(environment, elseToken)
    }

    let finalBody: TNode[] = null
    const finallyToken = this.eat(ETokenType.keyword, 'finally')
    if (finallyToken) {
      finalBody = this.astGenerator.statement.handleBody(environment, finallyToken)
    }

    const TryStatement = createNode(ENodeType.TryStatement, {
      body,
      handlers,
      elseBody,
      finalBody,
      loc: createLoc(tryToken, (finalBody || elseBody || handlers || body).at(-1))
    })

    return TryStatement
  }

  private _handleHandlers(environment: EEnvironment): ITryStatement['handlers'] {
    const markToken = this.tokens.getToken()

    const { payload: handlers } = this.findNodes({
      end: token => !isToken(token, ETokenType.keyword, 'except') || !isSameRank([markToken, token], 'column'),
      step: () => this._handleExceptHandler(environment)
    })

    return handlers
  }

  private _handleExceptHandler(environment: EEnvironment): IExceptHandler {
    const exceptToken = this.output(ETokenType.keyword, 'except')

    let exceptType: TExpressionNode = null
    if (this.isSameLine() && !this.isToken(ETokenType.punctuation, ':')) {
      exceptType = this.astGenerator.expression.handleMaybeIf(environment)
    }

    let name: string = null
    if (this.eatLine(environment, ETokenType.keyword, 'as')) {
      name = this.output(ETokenType.identifier).value
    }

    const body = this.astGenerator.statement.handleBody(environment, exceptToken)

    const ExceptHandlerStatement = createNode(ENodeType.ExceptHandler, {
      body,
      exceptType,
      name,
      loc: createLoc(exceptToken, body.at(-1))
    })

    return ExceptHandlerStatement
  }
}

export default TryStatement
