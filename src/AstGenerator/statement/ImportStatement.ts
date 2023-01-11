import AstToCode from '../../AstToCode'
import { ENodeType, ETokenType, IAliasExpression, IImportStatement, TToken } from '../../types'
import { createLoc, getLatest, isSameRank, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 导入语句 */
class ImportStatement extends Node {
  handle(environment: EEnvironment): IImportStatement {
    const importToken = this.output(ETokenType.keyword, 'import')
    const names = this._handleNames(importToken)

    const ImportExpression = createNode(ENodeType.ImportStatement, {
      names,
      loc: createLoc(importToken, getLatest(names))
    })

    return ImportExpression
  }

  private _handleNames(markToken: TToken): IImportStatement['names'] {
    const { payload } = this.findNodes({
      end: token => !isSameRank([markToken, token], 'endAndStartLine'),
      step: () => this._handleAliasExpression(),
      isSlice: true
    })

    return payload
  }

  private _handleAliasExpression(): IAliasExpression {
    const identifier = this.astGenerator.expression.identifier.handle(EEnvironment.normal)
    const maybeMemberExpression = this.astGenerator.expression.memberExpression.handleMaybe(identifier)

    let asnameToken: TToken = null
    if (this.eat(ETokenType.keyword, 'as')) {
      asnameToken = this.output(ETokenType.identifier)
    }

    const astToCode = new AstToCode()
    const name = astToCode.generate(maybeMemberExpression)
    const AliasExpression = createNode(ENodeType.AliasExpression, {
      name,
      asname: asnameToken?.value || null,
      loc: createLoc(maybeMemberExpression, asnameToken || maybeMemberExpression)
    })

    return AliasExpression
  }
}

export default ImportStatement
