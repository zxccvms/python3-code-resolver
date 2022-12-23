import { ENodeType, ETokenType, ILambdaExpression } from '../../types'
import { createLoc, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** lambda表达式 lambda a: a + 1 */
class LambdaExpression extends Node {
  handle(environment: EEnvironment): ILambdaExpression {
    this.check({
      environment,
      isAfter: true
    })
    const lambdaToken = this.output(ETokenType.keyword, 'lambda')

    const args = this.astGenerator.expression.arguments.handle(
      token => isToken(token, ETokenType.punctuation, ':'),
      environment | EEnvironment.lambda
    )

    this.check({
      environment,
      isBefore: true,
      isAfter: true
    })
    this.output(ETokenType.punctuation, ':')

    const body = this.astGenerator.expression.handleMaybeIf(environment | EEnvironment.lambda)

    const LambdaExpression = createNode(ENodeType.LambdaExpression, {
      args,
      body,
      loc: createLoc(lambdaToken, body)
    })

    return LambdaExpression
  }
}

export default LambdaExpression
