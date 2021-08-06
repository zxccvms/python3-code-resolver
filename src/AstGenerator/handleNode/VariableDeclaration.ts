import { getLatest } from 'src/base/common/objUtils'
import { ENodeType, ETokenType, IIdentifier, IVariableDeclaration, TNode } from '../../types.d'
import { addBaseNodeAttr, createLoc, isNode, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types.d'

/** 变量声明 */
class VariableDeclaration extends BaseHandler {
  handle() {
    const VariableDeclaration = this.handleVariableDeclaration()
    return { code: EHandleCode.single, payload: VariableDeclaration }
  }

  handleVariableDeclaration(): IVariableDeclaration {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'global')) {
      throw new TypeError("handleGlobal err: currentToken is not keyword 'global'")
    }

    const declarations = this._handleDeclarations()

    const variabelDeclaration = this.createNode(ENodeType.VariableDeclaration, currentToken.value, declarations)
    const VariableDeclaration = addBaseNodeAttr(variabelDeclaration, {
      loc: createLoc(currentToken, getLatest(declarations))
    })

    return VariableDeclaration
  }

  private _handleDeclarations(): IVariableDeclaration['declarations'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'global')) {
      throw new TypeError("handleGlobal err: currentToken is not keyword 'global'")
    }

    this.tokens.next()
    const { payload: declarations } = this.findNodesByConformTokenAndStepFn(
      token => isSameRank(currentToken, token, 'line'),
      () => this._handleDeclaration()
    )

    if (declarations.length === 0) {
      throw new SyntaxError('handleGlobal err: not declared variables')
    }

    return declarations
  }

  private _handleDeclaration(): IIdentifier {
    const Identifier = this.astProcessor.identifierHandler.handleIdentifier()

    if (isToken(this.tokens.getToken(), ETokenType.punctuation, ',')) {
      this.tokens.next()
    }

    return Identifier
  }
}

export default VariableDeclaration
