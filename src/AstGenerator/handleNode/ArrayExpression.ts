import { ENodeType, ETokenType, IArrayExpression, TExpressionNode } from '../../types'
import { addBaseNodeAttr, createLoc, isExpressionNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** 数组表达式 */
class ArrayExpression extends BaseHandler {
  handle() {
    const ArrayExpression = this.handleArrayExpression()
    return { code: EHandleCode.single, payload: ArrayExpression }
  }

  handleArrayExpression(): IArrayExpression {
    const leftBracket = this.tokens.getToken()
    if (!isToken(leftBracket, ETokenType.bracket, '[')) {
      throw new TypeError("handleArrayExpression err: currentToken is not bracket '['")
    }

    this.tokens.next()
    const elements = this._handleElements()

    const rightBracket = this.tokens.getToken()

    const ArrayExpression = this.createNode(ENodeType.ArrayExpression, {
      elements,
      loc: createLoc(leftBracket, rightBracket)
    })

    this.tokens.next()

    return ArrayExpression
  }

  private _handleElements(): IArrayExpression['elements'] {
    const { code, payload: elements } = this.findNodesByConformTokenAndStepFn(
      (token) => !isToken(token, ETokenType.bracket, ']'),
      () => this._handleElement()
    )
    if (code === 1) {
      throw new SyntaxError("handleArrayExpression err: can't find bracket ']'")
    }

    return elements
  }

  private _handleElement(): TExpressionNode {
    const nodes = this.findNodesByConformToken(
      (token) => !isToken(token, [ETokenType.punctuation, ETokenType.bracket], [',', ']'])
    )
    if (!nodes) {
      throw new SyntaxError("handleArrayExpression err: can't find punctuation ',' or bracket ']'")
    } else if (nodes.length !== 1) {
      throw new SyntaxError("handleArrayExpression err: nodes length is not equal '1' ")
    } else if (!isExpressionNode(nodes[0])) {
      throw new TypeError('handleArrayExpression err: value is not expression node')
    }

    if (isToken(this.tokens.getToken(), ETokenType.punctuation, ',')) {
      this.tokens.next()
    }

    return nodes[0]
  }
}

export default ArrayExpression
