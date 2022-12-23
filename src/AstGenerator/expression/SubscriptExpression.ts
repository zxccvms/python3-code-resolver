import { ENodeType, ETokenType, ISubscriptExpression, TExpressionNode } from '../../types'
import { createLoc, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 下标表达式 */
class SubscriptExpression extends Node {
  handle(lastNode: TExpressionNode, environment: EEnvironment): ISubscriptExpression {
    this.check({ environment, isBefore: true, isAssignableExpression: true })

    this.output(ETokenType.bracket, '[')

    const subscript = this._handleSubscript(environment | EEnvironment.bracket)

    const rightMediumBracket = this.output(ETokenType.bracket, ']')

    const SubscriptExpression = createNode(ENodeType.SubscriptExpression, {
      object: lastNode,
      subscript,
      loc: createLoc(lastNode, rightMediumBracket)
    })

    return SubscriptExpression
  }

  private _handleSubscript(environment: EEnvironment): ISubscriptExpression['subscript'] {
    const { payload: subscript } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, ']'),
      step: () => this._handleSubscriptItem(environment),
      isSlice: true
    })

    return subscript
  }

  private _handleSubscriptItem(environment: EEnvironment): Value<ISubscriptExpression['subscript']> {
    const startToken = this.tokens.getToken()

    let colonCount = 0
    const { payload: expressions } = this.findNodes({
      end: token => isToken(token, [ETokenType.punctuation, ETokenType.bracket], [',', ']']),
      step: () => {
        const currentToken = this.tokens.getToken()
        if (isToken(currentToken, ETokenType.punctuation, ':')) {
          if (++colonCount > 2) {
            throw new SyntaxError('handleSliceExpression err: colon count is greater than 2')
          }
          this.tokens.next()
          return undefined
        } else {
          return this.astGenerator.expression.handleMaybeIf(environment)
        }
      }
    })

    if (expressions.length === 1 && expressions[0]) {
      return expressions[0]
    } else {
      const SliceExpression = createNode(ENodeType.SliceExpression, {
        lower: expressions[0],
        upper: expressions[2],
        step: expressions[4],
        loc: createLoc(startToken, this.tokens.getToken(-1))
      })
      return SliceExpression
    }
  }
}

export default SubscriptExpression
