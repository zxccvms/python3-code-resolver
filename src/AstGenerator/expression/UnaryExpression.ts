import { ENodeType, ETokenType, IUnaryExpression, TToken } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

class UnaryExpression extends BaseHandler {
  handle(environment: EEnvironment): IUnaryExpression {
    const currentToken = this.tokens.getToken()
    this.check({
      checkToken: () =>
        isToken(currentToken, [ETokenType.operator, ETokenType.operator, ETokenType.keyword], ['+', '-', 'not']),
      environment,
      isAfter: true
    })

    this.tokens.next()
    const argument = this.astGenerator.expression.handleFirstExpression()

    const UnaryExpression = this.createNode(ENodeType.UnaryExpression, {
      operator: currentToken.value as '+' | '-' | 'not',
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
