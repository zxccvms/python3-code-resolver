import { ENodeType, ETokenType, IIdentifier, IImportStatement } from '../../types'
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

    const module = this._handleModule()
    const names = this._handleNames()

    const ImportExpreesion = this.createNode(ENodeType.ImportStatement, {
      names,
      module,
      loc: createLoc(module || names[0], getLatest(names))
    })

    return ImportExpreesion
  }

  private _handleModule(): IImportStatement['module'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'from')) return null

    this.tokens.next()
    const nodes = this.findNodesByConformToken((token) => !isToken(token, ETokenType.keyword, 'import'))
    if (!nodes) {
      throw new SyntaxError("ImportExpression err: can't find keyword 'import' ")
    } else if (nodes.length !== 1) {
      throw new SyntaxError('ImportExpression err: nodes length is not equal 1')
    } else if (!isNode(nodes[0], [ENodeType.Identifier, ENodeType.MemberExpression])) {
      throw new TypeError('ImportExpression err: node is not Identifier or MemberExpression')
    }

    return nodes[0]
  }

  private _handleNames(): IImportStatement['names'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'import')) {
      throw new TypeError("ImportExpression err: currenToken is not keyword 'import' ")
    }

    this.tokens.next()
    const { payload: names } = this.findNodesByConformTokenAndStepFn(
      (token) => isSameRank(currentToken, token, 'line'),
      () => this._handleName()
    )

    return names
  }

  private _handleName(): IIdentifier {
    const Identifier = this.astProcessor.identifierHandler.handleIdentifier()

    if (isToken(this.tokens.getToken(), ETokenType.punctuation, ',')) {
      this.tokens.next()
    }

    return Identifier
  }
}

export default ImportStatement
