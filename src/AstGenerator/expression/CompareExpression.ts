import { ENodeType, ETokenType, ICompareExpression, TExpressionNode, TToken } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** todo  比较表达式 a in b */
class CompareExpression extends BaseHandler {
  handleMaybe(lastNode: TExpressionNode, environment: EEnvironment) {
    const currentToken = this.tokens.getToken()

    if (!this.isContinue(environment)) return lastNode
    else if (!this._isConformToken(currentToken)) return lastNode

    return this.handle(lastNode, environment)
  }

  handle(lastNode: TExpressionNode, environment: EEnvironment): ICompareExpression {
    const operatorToken = this.tokens.getToken()
    this.check({
      checkToken: () => this._isConformToken(operatorToken),
      environment,
      isBefore: true,
      isAfter: true
    })

    this.tokens.next()

    let operator = operatorToken.value as 'in' | 'is' | 'not in'
    if (isToken(operatorToken, ETokenType.keyword, 'not')) {
      const inToken = this.tokens.getToken()
      this.check({
        checkToken: () => isToken(inToken, ETokenType.keyword, 'in'),
        isAfter: true
      })

      this.tokens.next()
      operator += inToken.value
    }

    const right = this.astGenerator.expression.handleMaybeCompare(environment)

    const CompareExpression = this.createNode(ENodeType.CompareExpression, {
      left: lastNode,
      operator,
      right,
      loc: createLoc(lastNode, right)
    })

    return CompareExpression
  }

  private _isConformToken(currentToken: TToken) {
    return isToken(currentToken, ETokenType.keyword, ['in', 'is', 'not'])
  }
}

export default CompareExpression
