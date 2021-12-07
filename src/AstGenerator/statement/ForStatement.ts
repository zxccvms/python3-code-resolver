import { ENodeType, ETokenType, IForStatement } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** for 语句 */
class ForStatement extends BaseHandler {
  handle(environment: ENodeEnvironment): IForStatement {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'for')) {
      throw new TypeError("handleForStatement err: currentToken is not keyword 'for'")
    }

    this.tokens.next()
    const left = this._handleLeft()
    const right = this._handleRight()
    const body = this.astGenerator.statement.blockStatement.handle(
      currentToken,
      environment | ENodeEnvironment.loopBody
    )

    const ForStatement = this.createNode(ENodeType.ForStatement, {
      left,
      right,
      body,
      loc: createLoc(currentToken, body)
    })

    return ForStatement
  }

  // todo 与py ast报错不一致
  private _handleLeft(): IForStatement['left'] {
    const token = this.tokens.getToken()
    if (isToken(token, ETokenType.bracket, '(')) {
      return this.astGenerator.expression.handleSmallBracket(() =>
        this._handleMaybeIdentifierAndTuple(ENodeEnvironment.bracket)
      )
    } else {
      return this._handleMaybeIdentifierAndTuple()
    }
  }

  private _handleMaybeIdentifierAndTuple(environment: ENodeEnvironment = ENodeEnvironment.normal) {
    const identifier = this.astGenerator.expression.identifier.handle()
    const left = this.astGenerator.expression.tupleExpression.handleMaybe(identifier, environment, {
      handleExpression: () => this.astGenerator.expression.identifier.handle(),
      extraEndCb: token => isToken(token, ETokenType.keyword, 'in')
    })

    return left
  }

  private _handleRight(): IForStatement['right'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'in')) {
      throw new TypeError("handleForStatement err: currentToken is not keyword 'in'")
    }

    this.tokens.next()
    const right = this.astGenerator.expression.handleMaybeTuple()

    return right
  }
}

export default ForStatement
