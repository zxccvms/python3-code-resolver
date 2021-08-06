import { ENodeType, ETokenType, IFunctionDeclaration, IIdentifier, TExpressionNode } from '../../types'
import { addBaseNodeAttr, createLoc, isExpressionNode, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** 处理函数定义节点 */
class FunctionDeclaration extends BaseHandler {
  handle() {
    const FunctionDeclaration = this.handleFunctionDeclaration()
    return { code: EHandleCode.single, payload: FunctionDeclaration }
  }

  /** 处理函数定义节点 */
  handleFunctionDeclaration(): IFunctionDeclaration {
    const defToken = this.tokens.getToken()
    if (!isToken(defToken, ETokenType.keyword, 'def')) {
      throw new TypeError('handleFunctionDeclaration err: currentToken is not keyword "def"')
    }

    this.tokens.next()
    const id = this._handleId()
    const [params, defaults] = this._handleParamsAndDefaults()

    const body = this.astProcessor.blockStatement.handleBlockStatement()

    const FunctionDeclaration = this.createNode(ENodeType.FunctionDeclaration, {
      id,
      params,
      defaults,
      body,
      loc: createLoc(defToken, body)
    })

    return FunctionDeclaration
  }

  private _handleId(): IFunctionDeclaration['id'] {
    return this.astProcessor.identifierHandler.handleIdentifier()
  }

  private _handleParamsAndDefaults(): [IFunctionDeclaration['params'], IFunctionDeclaration['defaults']] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.bracket, '(')) {
      throw new TypeError("handleFunctionDeclaration err: currentToken is not bracker '('")
    }

    this.tokens.next()
    const { code, payload: params } = this.findNodesByConformTokenAndStepFn(
      (token) =>
        !isToken(token, ETokenType.bracket, ')') && !isToken(this.tokens.getToken(1), ETokenType.operator, '='),
      () => this._handleParam()
    )
    if (code === 1) {
      throw new SyntaxError("FunctionDeclaration err: can't find bracket ')'")
    }

    let defaults = []
    if (!isToken(this.tokens.getToken(), ETokenType.bracket, ')')) {
      const { code, payload: nodesFragment } = this.findNodesByConformTokenAndStepFn(
        (token) => !isToken(token, ETokenType.bracket, ')'),
        () => this._handleParamAndDefault()
      )
      if (code === 1) {
        throw new SyntaxError("FunctionDeclaration err: can't find bracket ')'")
      }

      for (const [param, _default] of nodesFragment) {
        params.push(param)
        defaults.push(_default)
      }
    }

    this.tokens.next()
    return [params, defaults]
  }

  private _handleParam(): IIdentifier {
    const param = this.astProcessor.identifierHandler.handleIdentifier()

    if (isToken(this.tokens.getToken(), ETokenType.punctuation, ',')) {
      this.tokens.next()
    }

    return param
  }

  private _handleParamAndDefault(): [IIdentifier, TExpressionNode] {
    const param = this.astProcessor.identifierHandler.handleIdentifier()

    const equalToken = this.tokens.getToken()
    if (!isToken(equalToken, ETokenType.operator, '=')) {
      throw new TypeError("FunctionDeclaration err: currentToken is not operator '='")
    }

    this.tokens.next()
    const nodes = this.findNodesByConformToken(
      (token) => !isToken(token, [ETokenType.punctuation, ETokenType.bracket], [',', ')'])
    )
    if (!nodes) {
      throw new SyntaxError("FunctionDeclaration err: can't find punctuation ',' or bracket ')'")
    } else if (nodes.length !== 1) {
      throw new SyntaxError("FunctionDeclaration err: nodes length is not equal '1' ")
    } else if (!isExpressionNode(nodes[0])) {
      throw new TypeError('FunctionDeclaration err: value is not expression node')
    }

    if (isToken(this.tokens.getToken(), ETokenType.punctuation, ',')) {
      this.tokens.next()
    }

    return [param, nodes[0]]
  }
}

export default FunctionDeclaration
