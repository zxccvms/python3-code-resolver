import { ENodeType, ETokenType, IBlockStatement, IExceptHandler, ITryStatement, TExpressionNode } from '../../types'
import { createLoc, getLatest, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** try语句 */
class TryStatement extends BaseHandler {
  handle(environment: EEnvironment): ITryStatement {
    const tryToken = this.output(ETokenType.keyword, 'try')

    const body = this.astGenerator.statement.blockStatement.handle(tryToken, environment)
    const handlers = this._handleHandlers(environment)

    let elseBody: IBlockStatement = null
    const elseToken = this.eat(ETokenType.keyword, 'else')
    if (elseToken) {
      if (!handlers.length) {
        throw new SyntaxError('Try statement must have at least one except or finally clause')
      }

      elseBody = this.astGenerator.statement.blockStatement.handle(elseToken, environment)
    }

    let finalBody: IBlockStatement = null
    const finallyToken = this.eat(ETokenType.keyword, 'finally')
    if (finallyToken) {
      finalBody = this.astGenerator.statement.blockStatement.handle(finallyToken, environment)
    }

    const TryStatement = this.createNode(ENodeType.TryStatement, {
      body,
      handlers,
      elseBody,
      finalBody,
      loc: createLoc(body, finalBody || elseBody || getLatest(handlers))
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
    if (!this.isToken(ETokenType.punctuation, ':')) {
      exceptType = this.astGenerator.expression.handleMaybeIf(environment)
    }

    let name: string = null
    if (this.eat(ETokenType.keyword, 'as')) {
      name = this.output(ETokenType.identifier).value
    }

    const body = this.astGenerator.statement.blockStatement.handle(exceptToken, environment)

    const ExceptHandlerStatement = this.createNode(ENodeType.ExceptHandler, {
      body,
      exceptType,
      name,
      loc: createLoc(exceptToken, body)
    })

    return ExceptHandlerStatement
  }
}

export default TryStatement
