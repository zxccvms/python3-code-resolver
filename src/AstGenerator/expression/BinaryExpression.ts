import {
  EBinaryExpressionOperator,
  ENodeType,
  ETokenType,
  IBinaryExpression,
  TExpressionNode,
  TToken
} from '../../types'
import { createLoc, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 二进制表达式 */
class BinaryExpression extends Node {
  handleMaybe(lastNode: TExpressionNode, environment: EEnvironment): TExpressionNode {
    if (this.isToken(ETokenType.operator, Object.values(EBinaryExpressionOperator)) && this.isContinue(environment)) {
      const binaryExpression = this.handle(lastNode, environment)
      return this.handleMaybe(binaryExpression, environment)
    }

    return lastNode
  }

  handle(lastNode: TExpressionNode, environment: EEnvironment): IBinaryExpression {
    this.check({
      environment,
      isBefore: true,
      isAfter: true
    })

    const operatorToken = this.output(ETokenType.operator, Object.values(EBinaryExpressionOperator))

    const rightNode = this.astGenerator.expression.handleMaybeMemberOrSubscriptOrCall(environment)

    const BinaryExpression = createNode(ENodeType.BinaryExpression, {
      operator: operatorToken.value,
      left: lastNode,
      right: rightNode,
      loc: createLoc(lastNode, rightNode)
    })

    return BinaryExpression
  }
}

export default BinaryExpression
