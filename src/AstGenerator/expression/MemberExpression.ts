import { ENodeType, ETokenType, IMemberExpression, TExpressionNode } from '../../types'
import { createLoc, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

class MemberExpression extends Node {
  handleMaybe<T extends TExpressionNode>(
    lastNode: T,
    environment: EEnvironment = EEnvironment.normal
  ): T | IMemberExpression {
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.punctuation, '.')) {
      const memberExpression = this.handle(lastNode, environment)
      return this.handleMaybe(memberExpression, environment)
    }

    return lastNode
  }

  /** 处理对象调用属性节点 */
  handle(lastNode: TExpressionNode, environment: EEnvironment): IMemberExpression {
    this.check({
      environment,
      isBefore: true,
      isAfter: true,
      isDecorativeExpression: true,
      isAssignableExpression: true
    })

    this.output(ETokenType.punctuation, '.')
    const property = this.astGenerator.expression.identifier.handle(environment)

    const MemberExpression = createNode(ENodeType.MemberExpression, {
      object: lastNode,
      property,
      loc: createLoc(lastNode, property)
    })

    return MemberExpression
  }
}

export default MemberExpression
