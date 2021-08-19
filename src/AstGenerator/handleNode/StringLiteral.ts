import { ENodeType, ETokenType, IStringLiteral, TTokenItem } from '../../types'
import { addBaseNodeAttr, createLoc, getTokenExtra, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** 字符串 */
class StringLiteral extends BaseHandler {
  handle() {
    const StringLiteral = this.handleStringLiteral()
    return { code: EHandleCode.single, payload: StringLiteral }
  }

  handleStringLiteral(): IStringLiteral {
    const currentToken = this.tokens.getToken<TTokenItem<ETokenType.string>>()
    if (!isToken(currentToken, ETokenType.string)) {
      throw new TypeError('handleStringLiteral err: currentToken is not string')
    }
    const prefix = getTokenExtra(currentToken).prefix
    if (prefix === 'f') {
      throw new TypeError("handleStringLiteral err: currentToken'prefix is 'f'")
    }

    let value = currentToken.value
    if (prefix === 'r') {
      value = this._handlePrefixR(value)
    }

    const StringLiteral = this.createNode(ENodeType.StringLiteral, {
      value,
      raw: JSON.stringify(value),
      loc: createLoc(currentToken, currentToken),
      prefix
    })

    this.tokens.next()

    return StringLiteral
  }

  private _handlePrefixR(value: string) {
    return value.replace(/\\/g, '\\\\')
  }
}

export default StringLiteral
