import { ENodeType, ETokenType, ICallExpression, IKeyword, TExpressionNode } from '../../types'
import { createLoc, isExpressionNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** 函数调用表达式 */
class CallExpression extends BaseHandler {
  handle(lastNode: TExpressionNode, environment: ENodeEnvironment): ICallExpression {
    const leftBracket = this.tokens.getToken()

    this.check({
      checkToken: () => isToken(leftBracket, ETokenType.bracket, '('),
      extraCheck: () => isExpressionNode(lastNode),
      environment,
      isBefore: true
    })

    this.tokens.next()
    const params = this._handleParams()
    const keywords = this._handleKeywords()

    const rightBracket = this.tokens.getToken()
    const CallExpression = this.createNode(ENodeType.CallExpression, {
      callee: lastNode,
      params,
      keywords,
      loc: createLoc(lastNode, rightBracket)
    })

    this.tokens.next()

    return CallExpression
  }

  private _handleParams(): ICallExpression['params'] {
    const { code, payload } = this.findNodes({
      end: token =>
        isToken(token, ETokenType.bracket, ')') || isToken(this.tokens.getToken(1), ETokenType.operator, '='),
      step: () => this.astGenerator.expression.handleMaybeIf(),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    if (code === 1) {
      throw new SyntaxError("Expected ')'")
    }

    return payload
  }

  private _handleKeywords(): IKeyword[] {
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.bracket, ')')) return []

    const { code, payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, ')'),
      step: () => this.astGenerator.expression.keyword.handle(),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    if (code === 1) {
      throw new SyntaxError("Expected ')'")
    }

    return payload
  }
}

export default CallExpression
