import { ENodeType, ETokenType, ILambdaExpression, TExpressionNode } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

/** lambda表达式 lambda a: a + 1 */
class LambdaExpression extends BaseHandler {
  handle(environment: ENodeEnvironment): ILambdaExpression {
    const lambdaToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(lambdaToken, ETokenType.keyword, 'lambda'),
      environment,
      isAfter: true
    })

    this.tokens.next()
    const args = this.astGenerator.expression.arguments.handle(token => isToken(token, ETokenType.punctuation, ':'))

    const colonToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(colonToken, ETokenType.punctuation, ':'),
      environment,
      isBefore: true,
      isAfter: true
    })

    this.tokens.next()
    const body = this.astGenerator.expression.handleMaybeIf(environment | ENodeEnvironment.lambda)

    const LambdaExpression = this.createNode(ENodeType.LambdaExpression, {
      args,
      body,
      loc: createLoc(lambdaToken, body)
    })

    return LambdaExpression
  }
}

export default LambdaExpression
