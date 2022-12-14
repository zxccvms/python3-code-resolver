import { ENodeType, ETokenType, EUnaryExpressionOperator, IUnaryExpression, TToken } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

class UnaryExpression extends BaseHandler {
  handle(environment: EEnvironment): IUnaryExpression {
    this.check({ environment, isAfter: true })

    const currentToken = this.eat(ETokenType.operator, ['+', '-', '~']) || this.output(ETokenType.keyword, 'not')
    const argument = this.astGenerator.expression.handleMaybeMemberOrSubscriptOrCall(environment)

    const UnaryExpression = this.createNode(ENodeType.UnaryExpression, {
      operator: currentToken.value as EUnaryExpressionOperator,
      argument,
      loc: createLoc(currentToken, argument)
    })

    return UnaryExpression
  }

  isConformToken(token: TToken) {
    return isToken(token, ETokenType.operator, ['+', '-', '~']) || isToken(token, ETokenType.keyword, 'not')
  }
}

export default UnaryExpression
