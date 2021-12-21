import {
  ENodeType,
  ETokenType,
  IDictionaryExpression,
  IDictionaryProperty,
  ISetComprehensionExpression,
  ISetExpression,
  TExpressionNode,
  TNotAssignmentExpressionNode
} from '../../types'
import { addBaseNodeAttr, createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

class BigBracket extends BaseHandler {
  handle(
    environment: EEnvironment = EEnvironment.normal
  ): ISetExpression | ISetComprehensionExpression | IDictionaryExpression {
    const leftBigBracket = this.output(ETokenType.bracket, '{')
    this.check({ environment })

    let Node: ISetExpression | ISetComprehensionExpression | IDictionaryExpression

    let rightBigBracket = this.eat(ETokenType.bracket, '}')
    if (rightBigBracket) {
      const DictionaryExpression = this.createNode(ENodeType.DictionaryExpression, {
        properties: [],
        loc: createLoc(leftBigBracket, rightBigBracket)
      })
      return DictionaryExpression
    }

    const expression = this.astGenerator.expression.handleMaybeIf(EEnvironment.bracket)

    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.punctuation, ':')) {
      const properties = this._handleProperties(expression)

      Node = this.createNode(ENodeType.DictionaryExpression, {
        properties
      })
    } else if (isToken(currentToken, ETokenType.keyword, 'for')) {
      const generators = this.astGenerator.expression.comprehension.handleComprehensions(expression)

      Node = this.createNode(ENodeType.SetComprehensionExpression, {
        element: expression,
        generators
      })
    } else {
      const elements = [expression, ...this._handleElements()]

      Node = this.createNode(ENodeType.SetExpression, {
        elements
      })
    }

    rightBigBracket = this.output(ETokenType.bracket, '}')

    return addBaseNodeAttr(Node, {
      loc: createLoc(leftBigBracket, rightBigBracket)
    })
  }

  private _handleProperties(keyNode: TExpressionNode): IDictionaryProperty[] {
    const { payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, '}'),
      step: () => this._handleProperty(keyNode),
      isSlice: true
    })

    return payload
  }

  private _handleProperty(
    keyNode: TExpressionNode = this.astGenerator.expression.handleMaybeIf(EEnvironment.bracket)
  ): IDictionaryProperty {
    this.output(ETokenType.punctuation, ':')

    const value = this.astGenerator.expression.handleMaybeIf(EEnvironment.bracket)

    const DictionaryProperty = this.createNode(ENodeType.DictionaryProperty, {
      key: keyNode,
      value,
      loc: createLoc(keyNode, value)
    })

    return DictionaryProperty
  }

  private _handleElements(): TNotAssignmentExpressionNode[] {
    const { payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, '}'),
      step: () => this.astGenerator.expression.handleMaybeIf(EEnvironment.bracket),
      isSlice: true
    })

    return payload
  }
}

export default BigBracket
