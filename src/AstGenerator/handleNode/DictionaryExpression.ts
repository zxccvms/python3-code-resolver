import { ENodeType, ETokenType, IDictionaryExpression, IDictionaryProperty } from '../../types'
import { addBaseNodeAttr, createLoc, isExpressionNode, isNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode, ENodeEnvironment } from '../types'

class DictionaryExpression extends BaseHandler {
  handle() {
    const DictionaryExpression = this.handleDictionaryExpression()
    return { code: EHandleCode.single, payload: DictionaryExpression }
  }

  handleDictionaryExpression(): IDictionaryExpression {
    const leftBigBracket = this.tokens.getToken()
    if (!isToken(leftBigBracket, ETokenType.bracket, '{')) {
      throw new TypeError('handleDictionaryProperty err: currentToken is not bracket "{"')
    }

    this.tokens.next()
    const { code, payload: properties } = this.findNodesByConformTokenAndStepFn(
      (token) => !isToken(token, ETokenType.bracket, '}'),
      () => this._handleDictionaryProperty()
    )
    if (code === 1) {
      throw new SyntaxError("handleDictionaryExpression err: can't find bracket '}'")
    } else if (!properties.every((node) => isNode(node, ENodeType.DictionaryProperty))) {
      throw new TypeError('handleDictionaryExpression err: properties is not all DictionaryProperty')
    }

    const rightBigBracket = this.tokens.getToken()

    const DictionaryExpression = this.createNode(ENodeType.DictionaryExpression, {
      properties,
      loc: createLoc(leftBigBracket, rightBigBracket)
    })

    this.tokens.next()

    return DictionaryExpression
  }

  private _handleDictionaryProperty(): IDictionaryProperty {
    const keys = this.findNodesByConformToken((token) => !isToken(token, ETokenType.punctuation, ':'))
    if (!keys) {
      throw new SyntaxError("handleDictionaryProperty err: can't find punctuation ':'")
    } else if (keys.length !== 1) {
      throw new SyntaxError('handleDictionaryProperty err: nodes length is not equal 1')
    } else if (!isExpressionNode(keys[0])) {
      throw new TypeError('handleDictionaryProperty err: node is not expression node')
    }

    this.tokens.next()
    const values = this.findNodesByConformToken(
      (token) => !isToken(token, [ETokenType.bracket, ETokenType.punctuation], ['}', ','])
    )
    if (!values) {
      throw new SyntaxError('handleDictionaryProperty err: nextNode is not exsit')
    } else if (values.length !== 1) {
      throw new SyntaxError('handleDictionaryProperty err: nodes length is not equal 1')
    } else if (!isExpressionNode(values[0])) {
      throw new TypeError('handleDictionaryProperty err: nextNodes is not all expression node')
    }

    const key = keys[0]
    const value = values[0]

    const DictionaryProperty = this.createNode(ENodeType.DictionaryProperty, {
      key,
      value,
      loc: createLoc(key, value)
    })

    if (isToken(this.tokens.getToken(), ETokenType.punctuation, ',')) {
      this.tokens.next()
    }

    return DictionaryProperty
  }
}

export default DictionaryExpression
