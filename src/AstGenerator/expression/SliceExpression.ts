import { ENodeType, ETokenType, ISliceExpression, TExpressionNode } from '../../types'
import Node from '../utils/Node'
import { EEnvironment } from '../types'
import { createLoc, createNode } from '../../utils'

/** 分割表达式 */
class SliceExpression extends Node {
  handleMaybe(environment: EEnvironment, lastNode: TExpressionNode) {
    if (!this.isToken(ETokenType.punctuation, ':')) return lastNode

    return this.handle(environment, lastNode)
  }

  handle(environment: EEnvironment, lastNode: TExpressionNode = null): ISliceExpression {
    let startTokenOrNode = lastNode || this.getToken()

    this.output(ETokenType.punctuation, ':')

    const expressionNodes: TExpressionNode[] = [lastNode, null, null]
    if (this.eat(ETokenType.punctuation, ':')) {
      if (!this.isToken([ETokenType.bracket, ETokenType.punctuation], [']', ','])) {
        expressionNodes[2] = this.astGenerator.expression.handleMaybeIf(environment)
      }
    } else if (!this.isToken([ETokenType.bracket, ETokenType.punctuation], [']', ','])) {
      expressionNodes[1] = this.astGenerator.expression.handleMaybeIf(environment)
      if (this.eat(ETokenType.punctuation, ':')) {
        if (!this.isToken([ETokenType.bracket, ETokenType.punctuation], [']', ','])) {
          expressionNodes[2] = this.astGenerator.expression.handleMaybeIf(environment)
        }
      }
    }

    const SliceExpression = createNode(ENodeType.SliceExpression, {
      lower: expressionNodes[0],
      upper: expressionNodes[1],
      step: expressionNodes[2],
      loc: createLoc(startTokenOrNode, this.tokens.getToken(-1))
    })

    return SliceExpression
  }
}

export default SliceExpression
