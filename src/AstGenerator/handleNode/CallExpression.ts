import {
  ENodeType,
  ETokenType,
  IAssignmentParam,
  ICallExpression,
  TExpressionNode,
  TNode,
  TTokenItem
} from '../../types.d'
import { addBaseNodeAttr, createLoc, isExpressionNode, isNode, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types.d'

/** 函数调用表达式 */
class CallExpression extends BaseHandler {
  handle() {
    const CallExpression = this.handleCallExpression()
    return { code: EHandleCode.single, payload: CallExpression }
  }

  /** 处理函数调用节点 */
  handleCallExpression(): ICallExpression {
    const leftBracket = this.tokens.getToken()
    if (!isToken(leftBracket, ETokenType.bracket, '(')) {
      throw new TypeError('handleCallExpression err: currentToken is not bracket "("')
    }

    const callee = this._handleCallee()

    this.tokens.next()
    const params = this._handleParams()
    const keywords = this.handleKeywords()

    const rightBracket = this.tokens.getToken()
    const callExpression = this.createNode(ENodeType.CallExpression, callee, params, keywords)
    const CallExpression = addBaseNodeAttr(callExpression, {
      loc: createLoc(callee, rightBracket)
    })

    this.nodeChain.pop()
    this.tokens.next()

    return CallExpression
  }

  private _handleCallee(): ICallExpression['callee'] {
    const lastNode = this.nodeChain.get()
    if (!this.isConformCallee(lastNode, this.tokens.getToken())) {
      throw new TypeError('_handleCallExpression err: callee is not Identifier or MemberExpression or CallExpression')
    }

    return lastNode
  }

  isConformCallee(lastNode: TNode, currentToken: TTokenItem): lastNode is ICallExpression['callee'] {
    return (
      isNode(lastNode, [ENodeType.Identifier, ENodeType.MemberExpression, ENodeType.CallExpression]) &&
      isSameRank(lastNode, currentToken, 'line')
    )
  }

  private _handleParams(): ICallExpression['params'] {
    const { code, payload: params } = this.findNodesByConformTokenAndStepFn(
      token => !isToken(token, ETokenType.bracket, ')') && !isToken(this.tokens.getToken(1), ETokenType.operator, '='),
      () => this._handleParam()
    )

    if (code === 1) {
      throw new SyntaxError("handleCallExpression err: can't find bracket ')'")
    }

    return params
  }

  private _handleParam(): TExpressionNode {
    const nodes = this.findNodesByConformToken(
      token => !isToken(token, [ETokenType.punctuation, ETokenType.bracket], [',', ')'])
    )
    if (!nodes) {
      throw new SyntaxError("handleCallExpression err: can't find punctuation ',' or bracket ')'")
    } else if (nodes.length !== 1) {
      throw new SyntaxError("handleCallExpression err: nodes length is not equal '1' ")
    } else if (!isExpressionNode(nodes[0])) {
      throw new TypeError('handleCallExpression err: value is not expression node')
    }

    if (isToken(this.tokens.getToken(), ETokenType.punctuation, ',')) {
      this.tokens.next()
    }

    return nodes[0]
  }

  handleKeywords(): IAssignmentParam[] {
    const currentToken = this.tokens.getToken()
    if (isToken(currentToken, ETokenType.bracket, ')')) return []

    const { code, payload: keywords } = this.findNodesByConformTokenAndStepFn(
      token => !isToken(token, ETokenType.bracket, ')'),
      () => this._handleKeyword()
    )

    if (code === 1) {
      throw new SyntaxError("handleKeyword err: can't find bracket ')'")
    }

    return keywords
  }

  private _handleKeyword(): IAssignmentParam {
    const name = this.astProcessor.identifierHandler.handleIdentifier()

    const equalToken = this.tokens.getToken()
    if (!isToken(equalToken, ETokenType.operator, '=')) {
      throw new TypeError("handleKeyword err: currentToken is not operator '='")
    }

    this.tokens.next()
    const nodes = this.findNodesByConformToken(
      token => !isToken(token, [ETokenType.punctuation, ETokenType.bracket], [',', ')'])
    )
    if (!nodes) {
      throw new SyntaxError("handleCallExpression err: can't find punctuation ',' or bracket ')'")
    } else if (nodes.length !== 1) {
      throw new SyntaxError("handleCallExpression err: nodes length is not equal '1' ")
    } else if (!isExpressionNode(nodes[0])) {
      throw new TypeError('handleCallExpression err: value is not expression node')
    }

    const assignmentParam = this.createNode(ENodeType.AssignmentParam, name, nodes[0])
    const AssianmentParam = addBaseNodeAttr(assignmentParam, {
      loc: createLoc(name, nodes[0])
    })

    if (isToken(this.tokens.getToken(), ETokenType.punctuation, ',')) {
      this.tokens.next()
    }

    return AssianmentParam
  }
}

export default CallExpression
