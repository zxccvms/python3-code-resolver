import { ENodeType, ETokenType, ITupleExpression, TExpressionNode, TTokenItem } from '../../types'
import { createLoc, getLatest, isExpressionNode, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode, ENodeEnvironment } from '../types'

/** 处理元组 */
class TupleExpression extends BaseHandler {
  handle(environment: ENodeEnvironment) {
    const TupleExpression = this.handleTupleExpression(environment)
    return { code: EHandleCode.single, payload: TupleExpression }
  }

  handleTupleExpression(environment: ENodeEnvironment): ITupleExpression {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.punctuation, ',')) {
      throw new TypeError('handleTupleExpression err: currentToken is not operator ","')
    }

    const elements = this._handleElements(environment)

    const TupleExpression = this.createNode(ENodeType.TupleExpression, {
      elements,
      loc: createLoc(elements[0], getLatest(elements))
    })

    return TupleExpression
  }

  private _handleElements(environment: ENodeEnvironment): ITupleExpression['elements'] {
    const lastNode = this.nodeChain.get()
    if (!isExpressionNode(lastNode)) {
      throw new TypeError('handleTupleExpression err: lastNode is not expression node')
    } else if (!isSameRank(lastNode, this.tokens.getToken(), 'endAndStartLine')) {
      throw new SyntaxError('handleTupleExpression err: lastNode and currentToken is not the same line')
    }

    this.tokens.next()
    const { payload: _elements } = this.findNodesByConformTokenAndStepFn(
      (token) => !this._isEndToken(token, environment),
      () => this._handleElement(environment)
    )

    const elements = [lastNode, ..._elements]

    this.nodeChain.pop()

    return elements
  }

  private _handleElement(environment: ENodeEnvironment): TExpressionNode {
    const startNode = this.nodeChain.get()

    const nodes =
      this.findNodesByConformToken(
        (token) => !isToken(token, ETokenType.punctuation, ',') && !this._isEndToken(token, environment)
      ) || this.nodeChain.popByTarget(startNode)

    if (nodes.length !== 1) {
      throw new SyntaxError("handleTupleExpression err: nodes length is not equal '1' ")
    } else if (!isExpressionNode(nodes[0])) {
      throw new TypeError('handleTupleExpression err: value is not expression node')
    }

    if (isToken(this.tokens.getToken(), ETokenType.punctuation, ',')) {
      this.tokens.next()
    }

    return nodes[0]
  }

  private _isEndToken(token: TTokenItem, environment: ENodeEnvironment) {
    let isConform = isToken(token, [ETokenType.bracket, ETokenType.operator, ETokenType.keyword], [')', '=', 'in'])

    if (environment !== ENodeEnvironment.smallBracket) {
      isConform = isConform && isSameRank(this.nodeChain.get(), token, 'endAndStartLine')
    }

    return isConform
  }
}

export default TupleExpression
