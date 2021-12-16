import { ENodeType, ETokenType, ITupleExpression, TExpressionNode, TNode, TToken } from '../../types'
import { createLoc, checkBit, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 处理元组 */
class TupleExpression extends BaseHandler {
  handleMaybe(lastNode: TExpressionNode, environment: EEnvironment) {
    if (isToken(this.tokens.getToken(), ETokenType.punctuation, ',') && this.isContinue(environment)) {
      return this.handle(lastNode, environment)
    }

    return lastNode
  }

  handle(lastNode: TExpressionNode, environment: EEnvironment): ITupleExpression {
    const currentToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(currentToken, ETokenType.punctuation, ','),
      environment,
      isBefore: true,
      isAssignableExpression: true
    })

    const elements = [lastNode, ...this._handleElements(environment)]

    const TupleExpression = this.createNode(ENodeType.TupleExpression, {
      elements,
      loc: createLoc(lastNode, this.tokens.getToken(-1))
    })

    return TupleExpression
  }

  private _handleElements(environment: EEnvironment, elementStack: TExpressionNode[] = []): TExpressionNode[] {
    const commaToken = this.tokens.getToken()
    if (!isToken(commaToken, ETokenType.punctuation, ',')) return elementStack
    else if (
      !checkBit(environment, EEnvironment.bracket) &&
      !isSameRank([commaToken, this.tokens.getToken(1)], 'endAndStartLine')
    )
      return elementStack

    this.tokens.next()
    const expression = this.astGenerator.expression.handleMaybeIf(environment)

    elementStack.push(expression)

    return this._handleElements(environment, elementStack)
  }

  private _isConformToken(token: TToken, lastNode: TNode, environment: EEnvironment) {
    let isEndToken = isToken(token, [ETokenType.bracket, ETokenType.operator], [')', '='])

    if (isEndToken) return false
    else if (!checkBit(environment, EEnvironment.bracket)) {
      return isSameRank([lastNode, token], 'endAndStartLine')
    } else return true
  }

  private _isEndToken(currentToken: TToken) {}
}

export default TupleExpression
