import { ENodeType, ETokenType, ICompareExpression, TExpressionNode, TToken } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** todo  比较表达式 a in b */
class CompareExpression extends BaseHandler {
  handleMaybe(lastNode: TExpressionNode, environment: EEnvironment) {
    const currentToken = this.tokens.getToken()

    if (!this.isContinue(environment)) return lastNode
    else if (!isToken(currentToken, ETokenType.keyword, ['in', 'is', 'not'])) return lastNode

    return this.handle(lastNode, environment)
  }

  handle(lastNode: TExpressionNode, environment: EEnvironment): ICompareExpression {
    this.check({
      environment,
      isBefore: true,
      isAfter: true
    })

    const operatorToken = this.output(ETokenType.keyword, ['in', 'is', 'not'])

    let operator = operatorToken.value as 'in' | 'is' | 'not in'
    if (isToken(operatorToken, ETokenType.keyword, 'not')) {
      this.check({
        environment,
        isAfter: true
      })
      const inToken = this.output(ETokenType.keyword, 'in')

      operator += ` ${inToken.value}`
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
}

export default CompareExpression
