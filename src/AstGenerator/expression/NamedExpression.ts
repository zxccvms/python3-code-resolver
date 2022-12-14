import { ENodeType, ETokenType, IIdentifier, INamedExpression, TExpressionNode } from '../../types'
import { createLoc, isNode } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 命名表达式 */
class NamedExpression extends BaseHandler {
  handleMaybe(lastNode: TExpressionNode, environment: EEnvironment) {
    if (!isNode(lastNode, ENodeType.Identifier)) return lastNode
    else if (!this.isToken(ETokenType.operator, ':=')) return lastNode

    return this.handle(lastNode, environment)
  }

  handle(lastNode: IIdentifier, environment: EEnvironment): INamedExpression {
    this.check({ environment, isAfter: true, isBefore: true })
    this.output(ETokenType.operator, ':=')

    const value = this.astGenerator.expression.handleMaybeIf(environment)

    const NamedExpression = this.createNode(ENodeType.NamedExpression, {
      target: lastNode,
      value,
      loc: createLoc(lastNode, value)
    })

    return NamedExpression
  }
}

export default NamedExpression
