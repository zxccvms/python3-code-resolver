import { ENodeType, ETokenType, IBlockStatement, IIfStatement } from '../../types'
import { createLoc, isExpressionNode, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** if语句 */
class IfStatement extends BaseHandler {
  handle() {
    const IfStatement = this.handleIfStatement()
    return { code: EHandleCode.single, payload: IfStatement }
  }

  handleIfStatement(keyword: 'if' | 'elif' = 'if'): IIfStatement {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, keyword)) {
      throw new TypeError(`handleIfStatement err: currentToken is not keyword '${keyword}'`)
    }

    const test = this._handleTest()
    const body = this._handleBody()
    const alternate = this._handleAlternate()

    const IfStatement = this.createNode(ENodeType.IfStatement, {
      test,
      body,
      alternate,
      loc: createLoc(currentToken, alternate || body)
    })

    return IfStatement
  }

  private _handleTest(): IIfStatement['test'] {
    const ifToken = this.tokens.getToken()

    this.tokens.next()
    const nodes = this.findNodesByConformToken(
      (token) => !isToken(token, ETokenType.punctuation, ':') && isSameRank(ifToken, token, 'line')
    )
    if (!nodes) {
      throw new SyntaxError("handleIfStatement err: can't find punctuation ':'")
    } else if (nodes.length !== 1) {
      throw new SyntaxError('handleIfStatement err: nodes length is not equal 1')
    } else if (!isExpressionNode(nodes[0])) {
      throw new TypeError('handleIfStatement err: node is not expression node')
    }

    return nodes[0]
  }

  private _handleBody(): IIfStatement['body'] {
    return this.astProcessor.blockStatement.handleBlockStatement()
  }

  private _handleAlternate(): IIfStatement['alternate'] {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, ['elif', 'else'])) return null

    if (isToken(currentToken, ETokenType.keyword, 'else')) {
      return this._handleElseAlternate()
    } else {
      return this._handleElifAlternate()
    }
  }

  private _handleElseAlternate(): IBlockStatement {
    this.tokens.next()
    return this.astProcessor.blockStatement.handleBlockStatement()
  }

  private _handleElifAlternate(): IIfStatement {
    return this.handleIfStatement('elif')
  }
}

export default IfStatement
