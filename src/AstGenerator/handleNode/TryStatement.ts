import { ENodeType, ETokenType, IExceptHandler, ITryStatement } from '../../types'
import { addBaseNodeAttr, createLoc, getLatest, isExpressionNode, isNode, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** try语句 */
class TryStatement extends BaseHandler {
  handle() {
    const TryStatement = this.handleTryStatement()
    return { code: EHandleCode.single, payload: TryStatement }
  }

  handleTryStatement(): ITryStatement {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'try')) {
      throw new TypeError("TryStatement err: currentToken is not keyword 'try'")
    }

    const body = this._handleBody()
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

  private _handleBody(): ITryStatement['body'] {
    const tryToken = this.tokens.getToken()
    if (!isToken(tryToken, ETokenType.keyword, 'try')) {
      throw new TypeError("TryStatement err: currentToken is not keyword 'try'")
    }

    this.tokens.next()
    const BlockStatement = this.astProcessor.blockStatement.handleBlockStatement()

    return BlockStatement
  }

  private _handleHandlers(): ITryStatement['handlers'] {
    const markToken = this.tokens.getToken()

    const { payload: handlers } = this.findNodesByConformTokenAndStepFn(
      (token) => isToken(token, ETokenType.keyword, 'except') && isSameRank(markToken, token, 'column'),
      () => this._handleExceptHandlerStatement()
    )

    return handlers
  }

  private _handleExceptHandlerStatement(): IExceptHandler {
    const exceptToken = this.tokens.getToken()
    if (!isToken(exceptToken, ETokenType.keyword, 'except')) {
      throw new TypeError("ExceptHandlerStatement err: currentToken is not keyword 'except'")
    }

    this.tokens.next()
    const nextToken = this.tokens.getToken()
    if (!isToken(nextToken, ETokenType.punctuation, ':') && !isToken(nextToken, ETokenType.identifier)) {
      throw new TypeError("ExceptHandlerStatement err: nextToken is not punctuation ':' or identifier")
    }

    let name
    let errName
    if (!isToken(nextToken, ETokenType.punctuation, ':')) {
      const errNames = this.findNodesByConformToken((token) => !isToken(token, ETokenType.keyword, 'as'))
      if (!errNames) {
        throw new SyntaxError("ExceptHandlerStatement err: can't find token keyword 'as' ")
      } else if (errNames.length !== 1) {
        throw new SyntaxError('ExceptHandlerStatement err: errNames length is not equal 1')
      } else if (!isExpressionNode(errNames[0])) {
        throw new TypeError('ExceptHandlerStatement err: errName node is not expression node')
      }
      errName = errNames[0]

      this.tokens.next()
      const names = this.findNodesByCount(1)
      if (!names) {
        throw new SyntaxError("ExceptHandlerStatement err: can't find name node")
      } else if (!isNode(names[0], ENodeType.Identifier)) {
        throw new TypeError('ExceptHandlerStatement err: name node is not Identifier')
      }
      name = names[0]
    }

    const body = this.astProcessor.blockStatement.handleBlockStatement()

    const ExceptHandlerStatement = this.createNode(ENodeType.ExceptHandler, {
      body,
      errName,
      name,
      loc: createLoc(exceptToken, body)
    })

    return ExceptHandlerStatement
  }

  private _handleFinalBody(): ITryStatement['finalBody'] {
    const tryToken = this.tokens.getToken()
    if (!isToken(tryToken, ETokenType.keyword, 'finally')) return null

    this.tokens.next()
    const BlockStatement = this.astProcessor.blockStatement.handleBlockStatement()

    return BlockStatement
  }
}

export default TryStatement
