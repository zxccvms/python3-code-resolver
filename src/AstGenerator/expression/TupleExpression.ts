import { ENodeType, ETokenType, ITupleExpression, TExpressionNode, TNode, TToken } from '../../types'
import { createLoc, getLatest, hasEnvironment, isExpressionNode, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

type THandleTupleOptions = {
  handleExpression?: () => TExpressionNode
  extraEndCb?: (token: TToken) => boolean
}

/** 处理元组 */
class TupleExpression extends BaseHandler {
  handleMaybe(lastNode: TExpressionNode, environment: ENodeEnvironment, options?: THandleTupleOptions) {
    if (isToken(this.tokens.getToken(), ETokenType.punctuation, ',')) {
      return this.handle(lastNode, environment, options)
    }

    return lastNode
  }

  handle(lastNode: TExpressionNode, environment: ENodeEnvironment, options?: THandleTupleOptions): ITupleExpression {
    const currentToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(currentToken, ETokenType.punctuation, ','),
      extraCheck: () => isExpressionNode(lastNode),
      environment,
      isBefore: true
    })

    this.tokens.next()
    const elements = this._handleElements(lastNode, environment, options)

    const TupleExpression = this.createNode(ENodeType.TupleExpression, {
      elements,
      loc: createLoc(elements[0], getLatest(elements))
    })

    return TupleExpression
  }

  private _handleElements(
    lastNode: TExpressionNode,
    environment: ENodeEnvironment,
    options: THandleTupleOptions
  ): ITupleExpression['elements'] {
    const { handleExpression = () => this.astGenerator.expression.handleMaybeIf(), extraEndCb } = options || {}

    const { payload: _elements } = this.findNodes({
      end: token => !this._isConformToken(token, lastNode, environment) || extraEndCb?.(token),
      step: handleExpression,
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    const elements = [lastNode, ..._elements]

    return elements
  }

  private _isConformToken(token: TToken, lastNode: TNode, environment: ENodeEnvironment) {
    let isEndToken = isToken(token, [ETokenType.bracket, ETokenType.operator], [')', '='])

    if (isEndToken) return false
    else if (!hasEnvironment(environment, ENodeEnvironment.bracket)) {
      return isSameRank([lastNode, token], 'endAndStartLine')
    } else return true
  }
}

export default TupleExpression
