import { ENodeType, ETokenType, ILambdaExpression } from 'src/types'
import { createLoc, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** lambda表达式 lambda a: a + 1 */
class LambdaExpression extends BaseHandler {
  handle(environment: EEnvironment): ILambdaExpression {
    this.check({
      environment,
      isAfter: true
    })
    const lambdaToken = this.output(ETokenType.keyword, 'lambda')

    const args = this.astGenerator.expression.arguments.handle(
      token => isToken(token, ETokenType.punctuation, ':'),
      environment
    )

    this.check({
      environment,
      isBefore: true,
      isAfter: true
    })
    this.output(ETokenType.punctuation, ':')

    const body = this.astGenerator.expression.handleMaybeIf(environment | EEnvironment.lambda)

    const LambdaExpression = this.createNode(ENodeType.LambdaExpression, {
      args,
      body,
      loc: createLoc(lambdaToken, body)
    })

    return LambdaExpression
  }
}

export default LambdaExpression
