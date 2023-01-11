import { ENodeType, ETokenType, IAliasExpression, IImportFromStatement, TToken } from '../../types'
import { createLoc, getLatest, isSameRank, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 导入语句 */
class ImportFromStatement extends Node {
  handle(environment: EEnvironment): IImportFromStatement {
    const fromToken = this.output(ETokenType.keyword, 'from')

    const level = this._handleLevel()
    const module = this._handleModule()

    const importToken = this.output(ETokenType.keyword, 'import')

    const names = this._handleNames(importToken)

    const ImportExpression = createNode(ENodeType.ImportFromStatement, {
      names,
      module,
      level,
      loc: createLoc(fromToken, getLatest(names))
    })

    return ImportExpression
  }

  private _handleLevel(): IImportFromStatement['level'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.punctuation, '.')) return 0

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
    let module = this.eat(ETokenType.identifier)?.value
    if (!module) return null

    while (this.eat(ETokenType.punctuation, '.')) {
      module += this.output(ETokenType.identifier).value
    }

    return module
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
    let nameToken: TToken
    let asNameToken: TToken | null = null
    if ((nameToken = this.eat(ETokenType.operator, '*'))) {
      if (!isUnpackOperation) {
        throw new SyntaxError('Unpack operation not allowed in this context')
      }
    } else if ((nameToken = this.output(ETokenType.identifier))) {
      if (this.eat(ETokenType.keyword, 'as')) {
        asNameToken = this.output(ETokenType.identifier)
      }
    }

    const AliasExpression = createNode(ENodeType.AliasExpression, {
      name: nameToken.value,
      asname: asNameToken?.value || null,
      loc: createLoc(nameToken, asNameToken || nameToken)
    })

    return AliasExpression
  }
}

export default ImportFromStatement
