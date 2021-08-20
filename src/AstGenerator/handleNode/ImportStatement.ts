import { ENodeType, ETokenType, IAliasExpression, IIdentifier, IImportStatement, TTokenItem } from '../../types'
import { addBaseNodeAttr, createLoc, getLatest, isNode, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** 导入语句 */
class ImportStatement extends BaseHandler {
  handle() {
    const ImportExpreesion = this.handleImportExpression()
    return { code: EHandleCode.single, payload: ImportExpreesion }
  }

  handleImportExpression(): IImportStatement {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, ['import', 'from'])) {
      throw new TypeError("ImportExpression err: currentToken is not keyword 'import' or 'form' ")
    } else if (isSameRank(this.tokens.getToken(-1), currentToken, 'line')) {
      throw new SyntaxError('ImportExpression err: currentToken is not line start token')
    }

    const [level, module] = this._handleLevelAndModule()
    const names = this._handleNames()

    const ImportExpreesion = this.createNode(ENodeType.ImportStatement, {
      names,
      module,
      level,
      loc: createLoc(module || names[0], getLatest(names))
    })

    return ImportExpreesion
  }

  private _handleLevelAndModule(): [IImportStatement['level'], IImportStatement['module']] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'from')) return [null, null]

    this.tokens.next()
    const { payload: levelTokens } = this.findNodesByConformTokenAndStepFn(
      (token) => isToken(token, ETokenType.punctuation, '.'),
      () => {
        this.tokens.next()
        return this.tokens.getToken()
      }
    )

    const nodes = this.findNodesByConformToken((token) => !isToken(token, ETokenType.keyword, 'import'))
    if (!nodes) {
      throw new SyntaxError("ImportExpression err: can't find keyword 'import'")
    } else if (nodes.length !== 1) {
      throw new SyntaxError('ImportExpression err: nodes length is not equal 1')
    } else if (!isNode(nodes[0], [ENodeType.Identifier, ENodeType.MemberExpression])) {
      throw new TypeError('ImportExpression err: node is not Identifier or MemberExpression')
    }

    return [levelTokens.length, nodes[0]]
  }

  private _handleNames(): IImportStatement['names'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'import')) {
      throw new TypeError("ImportExpression err: currenToken is not keyword 'import' ")
    }

    const hasLeftBracket = isToken(this.tokens.getToken(1), ETokenType.bracket, '(')
    this.tokens.next(hasLeftBracket ? 2 : 1)

    const { payload: names } = this.findNodesByConformTokenAndStepFn(
      (token) => (hasLeftBracket ? !isToken(token, ETokenType.bracket, ')') : isSameRank(currentToken, token, 'line')),
      () => this._handleAliasExpression()
    )

    return names
  }

  private _handleAliasExpression(): IAliasExpression {
    const nameToken = this.tokens.getToken()
    if (!isToken(nameToken, ETokenType.identifier)) {
      throw new TypeError('handleAliasExpression err: nameToken is not identifier')
    }
    this.tokens.next()

    let asnameToken: TTokenItem<ETokenType.identifier>
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

    if (isToken(this.tokens.getToken(), ETokenType.punctuation, ',')) {
      this.tokens.next()
    }

    return AliasExpression
  }
}

export default ImportStatement
