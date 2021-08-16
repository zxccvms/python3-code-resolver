import { ENodeType, ETokenType, ICompareExpression, TTokenItem } from 'src/types'
import {
  createLoc,
  getLatest,
  isExpressionNode,
  isRightBracketToken,
  isSameRank,
  isSeparatePunctuationToken,
  isSeparateToken,
  isToken
} from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

class CompareExpression extends BaseHandler {
  handle() {
    const CompareExpression = this.handleCompareExpression()
    return { code: EHandleCode.single, payload: CompareExpression }
  }

  handleCompareExpression(): ICompareExpression {
    const left = this._handleLeft()
    const [operators, comparators] = this._handleOperatorsAndComparators()

    const CompareExpression = this.createNode(ENodeType.CompareExpression, {
      left,
      operators,
      comparators,
      loc: createLoc(left, getLatest(comparators))
    })

    return CompareExpression
  }

  private _handleLeft(): ICompareExpression['left'] {
    const lastNode = this.nodeChain.get()

    if (!lastNode) {
      throw new SyntaxError('handleCompareExpression err: lastNode is not exsit')
    } else if (!isExpressionNode(lastNode)) {
      throw new TypeError('handleCompareExpression err: lastNode is not expression node')
    }

    this.nodeChain.pop()

    return lastNode
  }

  private _handleOperatorsAndComparators(): [ICompareExpression['operators'], ICompareExpression['comparators']] {
    const lastToken = this.tokens.getToken(-1)
    const { payload: resultFragment } = this.findNodesByConformTokenAndStepFn(
      (token) => !this._isEndToken(lastToken, token),
      () => ({ operator: this._handleOperator(), comparator: this._handleComparator() })
    )
    const operators = [] as ICompareExpression['operators']
    const comparators = [] as ICompareExpression['comparators']
    for (const { operator, comparator } of resultFragment) {
      operators.push(operator)
      comparators.push(comparator)
    }

    return [operators, comparators]
  }

  private _handleOperator(): Value<ICompareExpression['operators']> {
    const currentToken = this.tokens.getToken()
    const nextToken = this.tokens.getToken(1)
    if (!this._isOperator(currentToken, nextToken)) {
      throw new TypeError(
        "handleCompareExpression err: currentToken is not keyword 'in', currentToken is not keyword 'not' and nextToken is not keyword 'in'"
      )
    }

    if (isToken(currentToken, ETokenType.keyword, 'in')) {
      this.tokens.next()
      return 'in'
    } else if (isToken(currentToken, ETokenType.keyword, 'not') && isToken(nextToken, ETokenType.keyword, 'in')) {
      this.tokens.next(2)
      return 'not in'
    }
  }

  private _isOperator(currentToken: TTokenItem, nextToken: TTokenItem) {
    return (
      isToken(currentToken, ETokenType.keyword, 'in') ||
      (isToken(currentToken, ETokenType.keyword, 'not') && isToken(nextToken, ETokenType.keyword, 'in'))
    )
  }

  private _handleComparator(): Value<ICompareExpression['comparators']> {
    const lastToken = this.tokens.getToken(-1)
    const nodes = this.findNodesByConformToken(
      (token) => !this._isEndToken(lastToken, token) && !this._isOperator(token, this.tokens.getToken(1))
    )

    if (!nodes) {
      throw new SyntaxError("handleCompareExpression err: can't find operator or right bracket token")
    } else if (nodes.length !== 1) {
      throw new SyntaxError('handleCompareExpression err: nodes length is not equal 1')
    } else if (!isExpressionNode(nodes[0])) {
      throw new TypeError('handleCompareExpression err: current node is not expression node')
    }

    return nodes[0]
  }

  private _isEndToken(markToken: TTokenItem, currentToken: TTokenItem) {
    return (
      isRightBracketToken(currentToken) ||
      isSeparatePunctuationToken(currentToken) ||
      !isSameRank(markToken, currentToken, 'line')
    )
  }
}

export default CompareExpression
