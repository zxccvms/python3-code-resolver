import { ENodeType, ETokenType, ICompareExpression, TExpressionNode, TToken } from 'src/types'
import { createLoc, hasEnvironment, isExpressionNode, isSameRank, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** todo  比较表达式 a in b */
class CompareExpression extends BaseHandler {
  handleMaybe(lastNode: TExpressionNode, environment: ENodeEnvironment) {
    const currentToken = this.tokens.getToken()
    const nextToken = this.tokens.getToken(1)

    if (this._isConformToken(currentToken, nextToken, environment) && this.isContinue(environment)) {
      return this.handle(lastNode, environment)
    }

    return lastNode
  }

  handle(lastNode: TExpressionNode, environment: ENodeEnvironment): ICompareExpression {
    let operatorToken = this._getOperatorToken(environment)

    this.check({
      checkToken: () => !!operatorToken,
      extraCheck: () => isExpressionNode(lastNode),
      environment,
      isBefore: operatorToken.value === 'not in' ? 2 : 1,
      isAfter: true
    })

    this.tokens.next()
    const right = this.astGenerator.expression.handleMaybeCompare(environment)

    const CompareExpression = this.createNode(ENodeType.CompareExpression, {
      left: lastNode,
      operator: operatorToken.value,
      right,
      loc: createLoc(lastNode, right)
    })

    return CompareExpression
  }

  private _getOperatorToken(environment: ENodeEnvironment): TToken<ETokenType.keyword, 'is' | 'in' | 'not in'> {
    const currentToken = this.tokens.getToken()
    const nextToken = this.tokens.getToken(1)

    if (!this._isConformToken(currentToken, nextToken, environment)) return null

    if (isToken(currentToken, ETokenType.keyword, ['in', 'is'])) return currentToken

    this.tokens.next()
    return {
      type: ETokenType.keyword,
      value: 'not in',
      loc: createLoc(currentToken, nextToken)
    }
  }

  private _isConformToken(currentToken: TToken, nextToken: TToken, environment: ENodeEnvironment) {
    if (isToken(currentToken, ETokenType.keyword, ['in', 'is'])) return true
    else if (
      isToken(currentToken, ETokenType.keyword, 'not') &&
      isToken(nextToken, ETokenType.keyword, 'in') &&
      (hasEnvironment(environment, ENodeEnvironment.bracket) ||
        isSameRank([currentToken, nextToken], 'endAndStartLine'))
    )
      return true

    return false
  }
}

export default CompareExpression
