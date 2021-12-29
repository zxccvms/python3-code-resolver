import { ENodeType, ETokenType, IAliasExpression, IImportFromStatement, TToken } from '../../types'
import { createLoc, getLatest, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 导入语句 */
class ImportFromStatement extends BaseHandler {
  handle(): IImportFromStatement {
    const fromToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(fromToken, ETokenType.keyword, 'from')
    })

    this.tokens.next()
    const level = this._handleLevel()
    const module = this._handleModule()

    const importToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(importToken, ETokenType.keyword, 'import')
    })

    this.tokens.next()
    const names = this._handleNames(importToken)

    const ImportExpression = this.createNode(ENodeType.ImportFromStatement, {
      names,
      module,
      level,
      loc: createLoc(module || names[0], getLatest(names))
    })

    return ImportExpression
  }

  private _handleLevel(): IImportFromStatement['level'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.punctuation, '.')) return null

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

  private _handleModule(): IImportFromStatement['module'] {
    const identifier = this.astGenerator.expression.identifier.handle(EEnvironment.normal)
    const maybeMemberExpression = this.astGenerator.expression.memberExpression.handleMaybe(identifier)

    return maybeMemberExpression
  }

  private _handleNames(markToken: TToken): IImportFromStatement['names'] {
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.operator, '*')) {
      return [this._handleAliasExpression(true)]
    }

    const isLeftBracket = isToken(currentToken, ETokenType.bracket, '(')
    if (isLeftBracket) this.tokens.next()

    const { payload: names } = this.findNodes({
      end: token => {
        if (isLeftBracket) return isToken(token, ETokenType.bracket, ')')

        const sameRank = isSameRank([markToken, token], 'endAndStartLine')
        markToken = token
        return !sameRank
      },
      step: () => this._handleAliasExpression(false),
      isSlice: true
    })

    const isRightBracket = isToken(this.tokens.getToken(), ETokenType.bracket, ')')
    if (isRightBracket) this.tokens.next()

    return names
  }

  private _handleAliasExpression(isUnpackOperation: boolean): IAliasExpression {
    let name: string
    let asname: string
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.operator, '*')) {
      if (!isUnpackOperation) {
        throw new SyntaxError('Unpack operation not allowed in this context')
      }

      name = '*'
      this.tokens.next()
    } else {
      name = this.astGenerator.expression.identifier.handle(EEnvironment.normal).name

      const asToken = this.tokens.getToken()
      if (isToken(asToken, ETokenType.keyword, 'as')) {
        this.tokens.next()
        asname = this.astGenerator.expression.identifier.handle(EEnvironment.normal).name
      }
    }

    const endToken = this.tokens.getToken(-1)

    const AliasExpression = this.createNode(ENodeType.AliasExpression, {
      name,
      asname,
      loc: createLoc(currentToken, endToken)
    })

    return AliasExpression
  }
}

export default ImportFromStatement
