import { ENodeType, ETokenType, IStringLiteral, TToken } from '../../types'
import { createLoc, getTokenExtra, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 字符串 */
class StringLiteral extends BaseHandler {
  handle(environment: EEnvironment = EEnvironment.normal): IStringLiteral {
    const currentToken = this.tokens.getToken() as TToken<ETokenType.string>
    const prefix = getTokenExtra(currentToken).prefix
    this.check({
      checkToken: () => isToken(currentToken, ETokenType.string),
      extraCheck: () => prefix !== 'f',
      environment
    })

    let value = currentToken.value
    if (prefix === 'r') {
      value = this._handlePrefixR(value)
    }

    const StringLiteral = this.createNode(ENodeType.StringLiteral, {
      value,
      raw: JSON.stringify(value),
      loc: createLoc(currentToken, currentToken),
      prefix: prefix as 'u' | 'r'
    })

    this.tokens.next()

    return StringLiteral
  }

  private _handlePrefixR(value: string) {
    return value.replace(/\\/g, '\\\\')
  }
}

export default StringLiteral
