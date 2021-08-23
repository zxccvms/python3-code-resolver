import { ENodeType, ETokenType, IBlockStatement, IIfStatement } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'

/** if语句 */
class IfStatement extends BaseHandler {
  handle(keyword: 'if' | 'elif' = 'if'): IIfStatement {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.keyword, keyword)) {
      throw new TypeError(`handleIfStatement err: currentToken is not keyword '${keyword}'`)
    }

    this.tokens.next()
    const test = this.astGenerator.expression.handleMaybeIf()
    const body = this.astGenerator.statement.blockStatement.handle(currentToken)
    const alternate = this._handleAlternate()

    const IfStatement = this.createNode(ENodeType.IfStatement, {
      test,
      body,
      alternate,
      loc: createLoc(currentToken, alternate || body)
    })

    return IfStatement
  }

  private _handleAlternate(): IIfStatement['alternate'] {
    const currentToken = this.tokens.getToken()

    if (isToken(currentToken, ETokenType.keyword, 'else')) {
      this.tokens.next()
      return this.astGenerator.statement.blockStatement.handle(currentToken)
    } else if (isToken(currentToken, ETokenType.keyword, 'elif')) {
      return this.handle('elif')
    } else {
      return null
    }
  }
}

export default IfStatement
