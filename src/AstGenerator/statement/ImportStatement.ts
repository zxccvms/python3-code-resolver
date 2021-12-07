import AstToCode from 'src/AstToCode'
import { ENodeType, ETokenType, IAliasExpression, IImportStatement, TToken } from '../../types'
import { createLoc, getLatest, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'

/** 导入语句 */
class ImportStatement extends BaseHandler {
  handle(): IImportStatement {
    const importToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(importToken, ETokenType.keyword, 'import')
    })

    this.tokens.next()
    const names = this._handleNames(importToken)

    const ImportExpression = this.createNode(ENodeType.ImportStatement, {
      names,
      loc: createLoc(importToken, getLatest(names))
    })

    return ImportExpression
  }

  private _handleNames(markToken: TToken): IImportStatement['names'] {
    const { payload } = this.findNodes({
      end: token => !isSameRank([markToken, token], 'endAndStartLine'),
      step: () => this._handleAliasExpression(),
      slice: token => isToken(token, ETokenType.punctuation, ',')
    })

    return payload
  }

  private _handleAliasExpression(): IAliasExpression {
    const identifier = this.astGenerator.expression.identifier.handle()
    const maybeMemberExpression = this.astGenerator.expression.memberExpression.handleMaybe(identifier)

    let asname
    const asToken = this.tokens.getToken()
    this.tokens.next()
    if (isToken(asToken, ETokenType.keyword, 'as')) {
      asname = this.astGenerator.expression.identifier.handle()
    }

    const astToCode = new AstToCode()
    const name = astToCode.generate(maybeMemberExpression)
    const AliasExpression = this.createNode(ENodeType.AliasExpression, {
      name,
      asname: asname?.name,
      loc: createLoc(maybeMemberExpression, asname || maybeMemberExpression)
    })

    return AliasExpression
  }
}

export default ImportStatement
