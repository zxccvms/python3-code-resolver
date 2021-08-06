import { textShapeOptions } from 'src/editor/flow-editor/FlowEditor/custom/node/options'
import { ENodeType, ETokenType, IIfExpression, TNode, TTokenItem } from '../../types.d'
import {
  addBaseNodeAttr,
  createLoc,
  isExpressionNode,
  isNode,
  isRightBracketToken,
  isSameRank,
  isToken
} from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types.d'

/** if表达式
 * 'Z-Factory.exe' if port == '6444' else 'Z-Bot.exe'
 */
class IfExpression extends BaseHandler {
  handle() {
    const IfExpression = this.handleIfExpression()
    return { code: EHandleCode.single, payload: IfExpression }
  }

  handleIfExpression(): IIfExpression {
    const ifToken = this.tokens.getToken()
    if (!isToken(ifToken, ETokenType.keyword, 'if')) {
      throw new TypeError("handleIfExpression err: currentToken is not keyword 'if'")
    }

    const body = this._handleBody(ifToken)
    const test = this._handleTest(ifToken)
    const alternate = this._handleAlternate(ifToken)

    const ifExpression = this.createNode(ENodeType.IfExpression, test, body, alternate)
    const IfExpression = addBaseNodeAttr(ifExpression, {
      loc: createLoc(body, alternate)
    })

    this.nodeChain.pop()

    return IfExpression
  }

  private _handleBody(ifToken: TTokenItem): IIfExpression['body'] {
    const lastNode = this.nodeChain.get()
    if (!isSameRank(lastNode, ifToken, 'line')) {
      throw new SyntaxError('handleIfExpression err: lastNode is not same rank')
    } else if (!isExpressionNode(lastNode)) {
      throw new TypeError('handleIfExpression err: last node is not expression node')
    }

    this.tokens.next()

    return lastNode
  }

  private _handleTest(ifToken: TTokenItem): IIfExpression['test'] {
    const nodes = this.findNodesByConformToken(
      token => !isToken(token, ETokenType.keyword, 'else') && isSameRank(ifToken, token, 'line')
    )
    if (!nodes) {
      throw new SyntaxError("handleIfExpression err: can't find keyword 'else'")
    } else if (nodes.length !== 1) {
      throw new SyntaxError('handleIfExpression err: nodes length is not equal 1')
    } else if (!isExpressionNode(nodes[0])) {
      throw new TypeError('handleIfExpression err: node is not expression node')
    }

    this.tokens.next()

    return nodes[0]
  }

  private _handleAlternate(ifToken: TTokenItem): IIfExpression['alternate'] {
    const lastNode = this.nodeChain.get()
    const nodes =
      this.findNodesByConformToken(token => isSameRank(ifToken, token, 'line') && !isRightBracketToken(token)) ||
      this.nodeChain.popByTarget(lastNode)
    if (nodes.length !== 1) {
      throw new SyntaxError('handleIfExpression err: nodes length is equal 1')
    } else if (!isExpressionNode(nodes[0])) {
      throw new TypeError('handleIfExpression err: node is not conform alternate node')
    }

    return nodes[0]
  }
}

export default IfExpression
