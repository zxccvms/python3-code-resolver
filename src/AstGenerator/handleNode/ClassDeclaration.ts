import { ENodeType, ETokenType, IClassDeclaration, IIdentifier } from '../../types.d'
import { addBaseNodeAttr, createLoc, isNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types.d'

/** 类声明 */
class ClassDeclaration extends BaseHandler {
  handle() {
    const ClassDeclaration = this.handleClassDeclaration()
    return { code: EHandleCode.single, payload: ClassDeclaration }
  }

  handleClassDeclaration(): IClassDeclaration {
    const classToken = this.tokens.getToken()
    if (!isToken(classToken, ETokenType.keyword, 'class')) {
      throw new TypeError("handleClassDeclaration err: currentToken is not keyword 'class'")
    }

    this.tokens.next()
    const id = this._handleId()
    const bases = this._handleBases()
    const keywords = this.handleKeywords()

    this.tokens.next()
    const body = this.astProcessor.blockStatement.handleBlockStatement()

    const classDeclaration = this.createNode(ENodeType.ClassDeclaration, id, bases, keywords, body)
    const ClassDeclaration = addBaseNodeAttr(classDeclaration, {
      loc: createLoc(classToken, body)
    })

    return ClassDeclaration
  }

  private _handleId(): IClassDeclaration['id'] {
    return this.astProcessor.identifierHandler.handleIdentifier()
  }

  private _handleBases(): IClassDeclaration['bases'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.bracket, '(')) {
      throw new TypeError("handleClassDeclaration err: currentToken is not bracker '('")
    }

    this.tokens.next()
    const { code, payload: bases } = this.findNodesByConformTokenAndStepFn(
      token => !isToken(token, ETokenType.bracket, ')') && !isToken(this.tokens.getToken(1), ETokenType.operator, '='),
      () => this._handleBase()
    )

    if (code === 1) {
      throw new SyntaxError("handleClassDeclaration err: can't find bracket ')'")
    }

    return bases
  }

  private _handleBase(): IIdentifier {
    const nodes = this.findNodesByConformToken(
      token => !isToken(token, [ETokenType.punctuation, ETokenType.bracket], [',', ')'])
    )
    if (!nodes) {
      throw new SyntaxError("handleClassDeclaration err: can't find punctuation ',' or bracket ')'")
    } else if (nodes.length !== 1) {
      throw new SyntaxError("handleClassDeclaration err: nodes length is not equal '1' ")
    } else if (!isNode(nodes[0], ENodeType.Identifier)) {
      throw new TypeError('handleClassDeclaration err: node is not Identifier')
    }

    if (isToken(this.tokens.getToken(), ETokenType.punctuation, ',')) {
      this.tokens.next()
    }

    return nodes[0]
  }

  handleKeywords(): IClassDeclaration['keywords'] {
    return this.astProcessor.callExpression.handleKeywords()
  }
}

export default ClassDeclaration
