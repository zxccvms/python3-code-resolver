import { ENodeType, ETokenType, IAliasExpression, IImportStatement, TToken } from '../../types'
import { createLoc, getLatest, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { ENodeEnvironment } from '../types'

// todo 分割出 ImportFromStatement
/** 导入语句 */
class ImportStatement extends BaseHandler {
  handle(): IImportStatement {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, ['import', 'from'])) {
      throw new TypeError("ImportExpression err: currentToken is not keyword 'import' or 'form' ")
    }

    const level = this._handleLevel()
    const module = this._handleModule()
    const names = this._handleNames()

    const ImportExpression = this.createNode(ENodeType.ImportStatement, {
      names,
      module,
      level,
      loc: createLoc(module || names[0], getLatest(names))
    })

    return ImportExpression
  }

  private _handleLevel(): IImportStatement['level'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'from')) return null

    this.tokens.next()
    const { payload: pointTokens } = this.findNodes({
      end: token => !isToken(token, ETokenType.punctuation, '.'),
      step: () => {
        const pointToken = this.tokens.getToken()
        this.tokens.next()
        return pointToken
      }
    })

    return pointTokens.length
  }

  private _handleModule(): IImportStatement['module'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.identifier)) return null

    const Identifier = this.astGenerator.expression.identifier.handle()
    const module = this.astGenerator.expression.memberExpression.handleMaybe(Identifier, ENodeEnvironment.normal)

    return module
  }

  private _handleNames(): IImportStatement['names'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'import')) {
      throw new TypeError("ImportExpression err: currentToken is not keyword 'import' ")
    }

    const hasLeftBracket = isToken(this.tokens.getToken(1), ETokenType.bracket, '(')
    this.tokens.next(hasLeftBracket ? 2 : 1)

    const { payload: names } = this.findNodes({
      end: token =>
        hasLeftBracket ? isToken(token, ETokenType.bracket, ')') : !isSameRank([currentToken, token], 'line'),
      step: () => this._handleAliasExpression(),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    if (isToken(this.tokens.getToken(), ETokenType.bracket, ')')) {
      this.tokens.next()
    }

    return names
  }

  private _handleAliasExpression(): IAliasExpression {
    const nameToken = this.tokens.getToken()
    if (!isToken(nameToken, ETokenType.identifier)) {
      throw new TypeError('handleAliasExpression err: nameToken is not identifier')
    }
    this.tokens.next()

    let asnameToken: TToken<ETokenType.identifier>
    if (isToken(this.tokens.getToken(), ETokenType.keyword, 'as')) {
      asnameToken = this.tokens.getToken(1)
      if (!isToken(asnameToken, ETokenType.identifier)) {
        throw new TypeError('handleAliasExpression err: asnameToken is not identifier')
      }
      this.tokens.next(2)
    }

    const AliasExpression = this.createNode(ENodeType.AliasExpression, {
      name: nameToken.value,
      asname: asnameToken?.value,
      loc: createLoc(nameToken, asnameToken || nameToken)
    })

    return AliasExpression
  }
}

export default ImportStatement
