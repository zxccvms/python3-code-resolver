import { ENodeType, ETokenType, ISubscriptExpression, TExpressionNode } from 'src/types'
import { createLoc, isExpressionNode, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 下标表达式 */
class SubscriptExpression extends BaseHandler {
  handle(lastNode: TExpressionNode, environment: EEnvironment): ISubscriptExpression {
    const currentToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(currentToken, ETokenType.bracket, '['),
      extraCheck: () => isExpressionNode(lastNode),
      environment,
      isBefore: true,
      isAfter: true,
      isAssignableExpression: true
    })

    this.tokens.next()
    const subscript = this._handleSubscript()

    const rightMediumBracket = this.tokens.getToken()
    const SubscriptExpression = this.createNode(ENodeType.SubscriptExpression, {
      object: lastNode,
      subscript,
      loc: createLoc(lastNode, rightMediumBracket)
    })

    this.tokens.next()

    return SubscriptExpression
  }

  private _handleSubscript(): ISubscriptExpression['subscript'] {
    const { payload: subscript } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, ']'),
      step: () => this._handleSubscriptItem(),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    return subscript
  }

  private _handleSubscriptItem(): Value<ISubscriptExpression['subscript']> {
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
          return this.astGenerator.expression.handleMaybeIf(EEnvironment.bracket)
        }
      }
    })

    if (expressions.length === 1 && expressions[0]) {
      return expressions[0]
    } else {
      const SliceExpression = this.createNode(ENodeType.SliceExpression, {
        lower: expressions[0],
        upper: expressions[1],
        step: expressions[2],
        loc: createLoc(startToken, this.tokens.getToken(-1))
      })
      return SliceExpression
    }
  }
}

export default SubscriptExpression
