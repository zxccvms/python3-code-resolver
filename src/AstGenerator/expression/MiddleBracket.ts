import {
  ENodeType,
  ETokenType,
  IArrayComprehensionExpression,
  IArrayExpression,
  TNotAssignmentExpressionNode
} from '../../types'
import { addBaseNodeAttr, createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 数组 or 数组解析 表达式 */
class MiddleBracket extends BaseHandler {
  handle(environment: EEnvironment = EEnvironment.normal): IArrayExpression | IArrayComprehensionExpression {
    const leftBracket = this.output(ETokenType.bracket, '[')

    let rightBracketToken = this.eat(ETokenType.bracket, ']')
    if (rightBracketToken) {
      const ArrayExpression = this.createNode(ENodeType.ArrayExpression, {
        elements: [],
        loc: createLoc(leftBracket, rightBracketToken)
      })

      return ArrayExpression
    }

    let Node: IArrayExpression | IArrayComprehensionExpression

    const element = this.astGenerator.expression.handleMaybeIf(EEnvironment.bracket)
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.keyword, 'for')) {
      this.check({ environment })
      const generators = this.astGenerator.expression.comprehension.handleComprehensions(element)

      Node = this.createNode(ENodeType.ArrayComprehensionExpression, {
        element,
        generators
      })
    } else {
      this.check({
        environment,
        isAssignableExpression: true
      })
      const elements = [element, ...this._handleElements(environment)]

      Node = this.createNode(ENodeType.ArrayExpression, {
        elements
      })
    }

    rightBracketToken = this.output(ETokenType.bracket, ']')

    return addBaseNodeAttr(Node, {
      loc: createLoc(leftBracket, rightBracketToken)
    })
  }

  private _handleElements(environment: EEnvironment): TNotAssignmentExpressionNode[] {
    const { code, payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, ']'),
      step: () => this.astGenerator.expression.handleMaybeIf(environment | EEnvironment.bracket),
      isSlice: true
    })

    if (code === 1) {
      throw new SyntaxError("Expected ']'")
    }

    this.tokens.next()

    return payload
  }
}

export default MiddleBracket
