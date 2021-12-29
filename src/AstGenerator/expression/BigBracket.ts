import {
  ENodeType,
  ETokenType,
  IDictionaryComprehensionExpression,
  IDictionaryExpression,
  ISetComprehensionExpression,
  ISetExpression,
  TBigBracketExpressionNode,
  TExpressionNode
} from '../../types'
import { addBaseNodeAttr, createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

class BigBracket extends BaseHandler {
  handle(environment: EEnvironment): TBigBracketExpressionNode {
    this.check({ environment })
    const leftBracket = this.output(ETokenType.bracket, '{')
    environment = environment | EEnvironment.bracket

    let Node: TBigBracketExpressionNode
    if (this.isToken([ETokenType.operator, ETokenType.bracket], ['**', '}'])) {
      Node = this._handleDictionaryExpression(environment)
    } else {
      const expression = this._handleNode(environment)

      if (this.isToken(ETokenType.punctuation, ':')) {
        Node = this._handleDictionary(expression, environment)
      } else {
        Node = this._handleSet(expression, environment)
      }
    }

    const rightBracket = this.output(ETokenType.bracket, '}')

    return addBaseNodeAttr(Node, {
      loc: createLoc(leftBracket, rightBracket)
    })
  }

  private _handleSet(
    element: TExpressionNode,
    environment: EEnvironment
  ): ISetExpression | ISetComprehensionExpression {
    if (this.astGenerator.expression.comprehension.isConformToken(environment)) {
      return this._handleSetComprehensionExpression(element, environment)
    } else {
      return this._handleSetExpression(element, environment)
    }
  }

  private _handleSetExpression(element: TExpressionNode, environment: EEnvironment) {
    const { payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, '}'),
      step: () => this._handleNode(environment),
      isSlice: true
    })

    return this.createNode(ENodeType.SetExpression, {
      elements: [element, ...payload]
    })
  }
  private _handleSetComprehensionExpression(element: TExpressionNode, environment: EEnvironment) {
    const generators = this.astGenerator.expression.comprehension.handleComprehensions(element, environment)

    return this.createNode(ENodeType.SetComprehensionExpression, {
      element,
      generators
    })
  }

  private _handleDictionary(
    keyNode: TExpressionNode,
    environment: EEnvironment
  ): IDictionaryExpression | IDictionaryComprehensionExpression {
    this.output(ETokenType.punctuation, ':')

    const expression = this._handleNode(environment)

    if (this.astGenerator.expression.comprehension.isConformToken(environment)) {
      return this._handleDictionaryComprehensionExpression(environment, keyNode, expression)
    } else {
      return this._handleDictionaryExpression(environment, keyNode, expression)
    }
  }

  private _handleDictionaryExpression(
    environment: EEnvironment,
    keyNode?: TExpressionNode,
    valueNode?: TExpressionNode
  ) {
    const { payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, '}'),
      step: () => {
        if (this.eat(ETokenType.operator, '**')) {
          const value = this._handleNode(environment)
          return [null, value]
        } else {
          const key = this._handleNode(environment)
          this.output(ETokenType.punctuation, ':')
          const value = this._handleNode(environment)
          return [key, value]
        }
      },
      isSlice: true
    })
    const keys = keyNode ? [keyNode] : []
    const values = valueNode ? [valueNode] : []
    for (const [key, value] of payload) {
      keys.push(key)
      values.push(value)
    }

    return this.createNode(ENodeType.DictionaryExpression, {
      keys,
      values
    })
  }

  private _handleDictionaryComprehensionExpression(
    environment: EEnvironment,
    keyNode: TExpressionNode,
    valueNode: TExpressionNode
  ) {
    const generators = this.astGenerator.expression.comprehension.handleComprehensions(valueNode, environment)

    return this.createNode(ENodeType.DictionaryComprehensionExpression, {
      key: keyNode,
      value: valueNode,
      generators
    })
  }

  private _handleNode(environment: EEnvironment) {
    return this.astGenerator.expression.handleMaybeIf(environment)
  }
}

export default BigBracket
