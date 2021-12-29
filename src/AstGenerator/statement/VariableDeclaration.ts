import { ENodeType, ETokenType, IVariableDeclaration, TToken } from '../../types'
import { createLoc, getLatest, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 变量声明 */
class VariableDeclaration extends BaseHandler {
  handle(): IVariableDeclaration {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'global')) {
      throw new TypeError("VariableDeclaration err: currentToken is not keyword 'global'")
    }

    this.tokens.next()
    const declarations = this._handleDeclarations(currentToken)

    const VariableDeclaration = this.createNode(ENodeType.VariableDeclaration, {
      kind: currentToken.value,
      declarations,
      loc: createLoc(currentToken, getLatest(declarations))
    })

    return VariableDeclaration
  }

  private _handleDeclarations(currentToken: TToken): IVariableDeclaration['declarations'] {
    const { payload: declarations } = this.findNodes({
      end: token => !isSameRank([currentToken, token], 'endAndStartLine'),
      step: () => this.astGenerator.expression.identifier.handle(EEnvironment.normal),
      isSlice: true
    })

    if (declarations.length === 0) {
      throw new SyntaxError('VariableDeclaration err: not declared variables')
    }

    return declarations
  }
}

export default VariableDeclaration
