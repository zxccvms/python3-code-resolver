import { ENodeType, ETokenType, IDictionaryExpression, IDictionaryProperty } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

class DictionaryExpression extends BaseHandler {
  handle(): IDictionaryExpression {
    const leftBigBracket = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(leftBigBracket, ETokenType.bracket, '{')
    })

    this.tokens.next()
    const properties = this._handleProperties()
    const rightBigBracket = this.tokens.getToken()

    const DictionaryExpression = this.createNode(ENodeType.DictionaryExpression, {
      properties,
      loc: createLoc(leftBigBracket, rightBigBracket)
    })

    this.tokens.next()

    return DictionaryExpression
  }

  private _handleProperties(): IDictionaryExpression['properties'] {
    const { code, payload: properties } = this.findNodes({
      end: token => isToken(token, ETokenType.bracket, '}'),
      step: () => this._handleDictionaryProperty(),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    if (code === 1) {
      throw new SyntaxError("Expected '}'")
    }

    return properties
  }

  private _handleDictionaryProperty(): IDictionaryProperty {
    const key = this.astGenerator.expression.handleMaybeIf(ENodeEnvironment.bracket)

    const colonToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(colonToken, ETokenType.punctuation, ':')
    })

    this.tokens.next()
    const value = this.astGenerator.expression.handleMaybeIf(ENodeEnvironment.bracket)

    const endToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(endToken, [ETokenType.punctuation, ETokenType.bracket], [',', '}'])
    })

    const DictionaryProperty = this.createNode(ENodeType.DictionaryProperty, {
      key,
      value,
      loc: createLoc(key, value)
    })

    return DictionaryProperty
  }
}

export default DictionaryExpression
