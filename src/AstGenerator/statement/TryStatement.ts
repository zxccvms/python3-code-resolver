import { ENodeType, ETokenType, IExceptHandler, ITryStatement } from '../../types'
import { createLoc, getLatest, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'

/** try语句 */
class TryStatement extends BaseHandler {
  handle(): ITryStatement {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'try')) {
      throw new TypeError("TryStatement err: currentToken is not keyword 'try'")
    }

    this.tokens.next()
    const body = this.astGenerator.statement.blockStatement.handle(currentToken)
    const handlers = this._handleHandlers()
    const finalBody = this._handleFinalBody()

    const TryStatement = this.createNode(ENodeType.TryStatement, {
      body,
      handlers,
      finalBody,
      loc: createLoc(body, finalBody || getLatest(handlers))
    })

    return TryStatement
  }

  private _handleHandlers(): ITryStatement['handlers'] {
    const markToken = this.tokens.getToken()

    const { payload: handlers } = this.findNodes({
      end: token => !isToken(token, ETokenType.keyword, 'except') || !isSameRank([markToken, token], 'column'),
      step: () => this._handleExceptHandler()
    })

    return handlers
  }

  private _handleExceptHandler(): IExceptHandler {
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
    const body = this.astGenerator.statement.blockStatement.handle(exceptToken)

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

  private _handleFinalBody(): ITryStatement['finalBody'] {
    const finallyToken = this.tokens.getToken()
    if (!isToken(finallyToken, ETokenType.keyword, 'finally')) return null

    this.tokens.next()
    const BlockStatement = this.astGenerator.statement.blockStatement.handle(finallyToken)

    return BlockStatement
  }
}

export default TryStatement
