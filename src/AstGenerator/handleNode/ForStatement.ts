import { ENodeType, ETokenType, IForStatement } from 'src/types'
import { createLoc, isExpressionNode, isToken } from 'src/utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** for 语句 */
class ForStatement extends BaseHandler {
  handle() {
    const ForStatement = this.handleForStatement()
    return { code: EHandleCode.single, payload: ForStatement }
  }

  handleForStatement(): IForStatement {
    const currentToken = this.tokens.getToken()

    const left = this._handleLeft()
    const right = this._handleRight()
    const body = this._handleBody()

    const ForStatement = this.createNode(ENodeType.ForStatement, {
      left,
      right,
      body,
      loc: createLoc(currentToken, body)
    })

    return ForStatement
  }

  private _handleLeft(): IForStatement['left'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'for')) {
      throw new TypeError("handleForStatement err: currentToken is not keyword 'for'")
    }

    this.tokens.next()
    const nodes = this.findNodesByConformToken((token) => !isToken(token, ETokenType.keyword, 'in'))
    if (!nodes) {
      throw new SyntaxError("handleForStatement err: can't find keyword 'in'")
    } else if (nodes.length !== 1) {
      throw new SyntaxError('handleForStatement err: nodes length is not equal 1')
    } else if (!isExpressionNode(nodes[0])) {
      throw new TypeError('handleForStatement err: current node is not expression node')
    }

    return nodes[0]
  }

  private _handleRight(): IForStatement['right'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, 'in')) {
      throw new TypeError("handleForStatement err: currentToken is not keyword 'in'")
    }

    this.tokens.next()
    const nodes = this.findNodesByConformToken((token) => !isToken(token, ETokenType.punctuation, ':'))
    if (!nodes) {
      throw new SyntaxError("handleForStatement err: can't find punctuation ':'")
    } else if (nodes.length !== 1) {
      throw new SyntaxError('handleForStatement err: nodes length is not equal 1')
    } else if (!isExpressionNode(nodes[0])) {
      throw new TypeError('handleForStatement err: current node is not expression node')
    }

    return nodes[0]
  }

  private _handleBody(): IForStatement['body'] {
    return this.astProcessor.blockStatement.handleBlockStatement()
  }
}

export default ForStatement
