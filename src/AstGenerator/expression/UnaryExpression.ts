import { ENodeType, ETokenType, IUnaryExpression } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

class UnaryExpression extends BaseHandler {
  handle(environment: ENodeEnvironment): IUnaryExpression {
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
}

export default UnaryExpression
