import {
  ENodeType,
  ETokenType,
  IDictionaryExpression,
  IDictionaryProperty,
  ISetExpression,
  TNotAssignmentExpressionNode
} from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

class SetOrDictionaryExpression extends BaseHandler {
  handle(): ISetExpression | IDictionaryExpression {
    const leftBigBracket = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(leftBigBracket, ETokenType.bracket, '{')
    })

    this.tokens.next()
    const res = this._handleElementsOrProperties()

    const rightBigBracket = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(rightBigBracket, ETokenType.bracket, '}')
    })
    this.tokens.next()

    if (res.nodeType === ENodeType.DictionaryExpression) {
      const DictionaryExpression = this.createNode(ENodeType.DictionaryExpression, {
        properties: res.nodes,
        loc: createLoc(leftBigBracket, rightBigBracket)
      })
      return DictionaryExpression
    } else {
      const SetExpression = this.createNode(ENodeType.SetExpression, {
        elements: res.nodes,
        loc: createLoc(leftBigBracket, rightBigBracket)
      })
      return SetExpression
    }
  }

  private _handleElementsOrProperties():
    | {
        nodeType: ENodeType.DictionaryExpression
        nodes: IDictionaryExpression['properties']
      }
    | {
        nodeType: ENodeType.SetExpression
        nodes: ISetExpression['elements']
      } {
    const handleStateCode = {
      element: true,
      property: true
    }
    const { payload } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, '}'),
      step: () => this._handleElementOrProperty(handleStateCode),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    return handleStateCode.property
      ? {
          nodeType: ENodeType.DictionaryExpression,
          nodes: payload as IDictionaryExpression['properties']
        }
      : {
          nodeType: ENodeType.SetExpression,
          nodes: payload as ISetExpression['elements']
        }
  }

  private _handleElementOrProperty(stateCode: {
    element: boolean
    property: boolean
  }): TNotAssignmentExpressionNode | IDictionaryProperty {
    const expression = this.astGenerator.expression.handleMaybeIf(ENodeEnvironment.bracket)

    const punctuationToken = this.tokens.getToken()
    if (isToken(punctuationToken, [ETokenType.punctuation, ETokenType.bracket], [',', '}'])) {
      if (!stateCode.element) {
        throw new SyntaxError('Dictionary entries must contain key/value pairs')
      }
      stateCode.property = false
      return expression
    } else if (isToken(punctuationToken, ETokenType.punctuation, [':'])) {
      if (!stateCode.property) {
        throw new SyntaxError('Key/value pairs are not allowed within a set')
      }
      stateCode.element = false
      this.tokens.next()
      const value = this.astGenerator.expression.handleMaybeIf(ENodeEnvironment.bracket)

      const endToken = this.tokens.getToken()
      this.check({
        checkToken: () => isToken(endToken, [ETokenType.punctuation, ETokenType.bracket], [',', '}'])
      })

      const DictionaryProperty = this.createNode(ENodeType.DictionaryProperty, {
        key: expression,
        value,
        loc: createLoc(expression, value)
      })

      return DictionaryProperty
    } else {
      throw new TypeError('Unexpected token')
    }
  }
}

export default SetOrDictionaryExpression
