import { ENodeType, ETokenType, IExceptHandler, ITryStatement } from '../../types'
import { createLoc, getLatest, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** try语句 */
class TryStatement extends BaseHandler {
  handle(environment: EEnvironment): ITryStatement {
    const tryToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(tryToken, ETokenType.keyword, 'try')
    })

    this.tokens.next()
    const body = this.astGenerator.statement.blockStatement.handle(tryToken, environment)
    const handlers = this._handleHandlers(environment)
    const elseBody = this._handleElseBody(environment, !!handlers.length)
    const finalBody = this._handleFinalBody(environment)

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
    const exceptToken = this.tokens.getToken()
    if (!isToken(exceptToken, ETokenType.keyword, 'except')) {
      throw new TypeError("ExceptHandler err: currentToken is not keyword 'except'")
    }

    this.tokens.next()
    const nextToken = this.tokens.getToken()
    if (!isToken(nextToken, ETokenType.punctuation, ':') && !isToken(nextToken, ETokenType.identifier)) {
      throw new TypeError("ExceptHandler err: nextToken is not punctuation ':' or identifier")
    }

    const errName = this._handleErrName()
    const name = this._handleName()
    const body = this.astGenerator.statement.blockStatement.handle(exceptToken, environment)

    const ExceptHandlerStatement = this.createNode(ENodeType.ExceptHandler, {
      body,
      errName,
      name,
      loc: createLoc(exceptToken, body)
    })

    return ExceptHandlerStatement
  }

  private _handleErrName(): IExceptHandler['errName'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.identifier)) return null

    const errName = this.astGenerator.expression.handleMaybeIf()

    return errName
  }

  private _handleName(): IExceptHandler['name'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'as')) return null

    this.tokens.next()
    const name = this.astGenerator.expression.identifier.handle()

    return name
  }

  private _handleElseBody(environment: EEnvironment, hasHandler: boolean): ITryStatement['elseBody'] {
    const elseToken = this.tokens.getToken()
    if (!isToken(elseToken, ETokenType.keyword, 'else')) return null
    else if (!hasHandler) {
      throw new SyntaxError('Try statement must have at least one except or finally clause')
    }

    this.tokens.next()
    const BlockStatement = this.astGenerator.statement.blockStatement.handle(elseToken, environment)

    return BlockStatement
  }

  private _handleFinalBody(environment: EEnvironment): ITryStatement['finalBody'] {
    const finallyToken = this.tokens.getToken()
    if (!isToken(finallyToken, ETokenType.keyword, 'finally')) return null

    this.tokens.next()
    const BlockStatement = this.astGenerator.statement.blockStatement.handle(finallyToken, environment)

    return BlockStatement
  }
}

export default TryStatement
