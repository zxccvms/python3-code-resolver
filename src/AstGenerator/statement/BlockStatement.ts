import { ENodeType, ETokenType, IBlockStatement, TToken } from '../../types'
import { createLoc, getColumn, getLatest, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 块声明 */
class BlockStatement extends BaseHandler {
  handle(startToken: TToken, environment: EEnvironment = EEnvironment.normal): IBlockStatement {
    let colonToken = this.tokens.getToken()
    this.check({
      checkToken: () => isToken(colonToken, ETokenType.punctuation, ':')
    })

    this.tokens.next()
    const body = this._handleBody(startToken, colonToken, environment)

    const BlockStatement = this.createNode(ENodeType.BlockStatement, {
      body,
      loc: createLoc(colonToken, getLatest(body))
    })

    return BlockStatement
  }

  private _handleBody(startToken: TToken, colonToken: TToken, environment: EEnvironment): IBlockStatement['body'] {
    const markToken = this.tokens.getToken()
    if (!markToken) {
      throw new TypeError('handleBlockStatement err: markToken is not exist')
    }

    // 单行定义
    if (isSameRank([colonToken, markToken], 'line')) {
      return [this.astGenerator.expression.handle(environment)]
    }
    // 多行定义
    else {
      const indentCount = getColumn(startToken, 'start')
      const nextIndentCount = getColumn(markToken, 'start')
      if (nextIndentCount < indentCount) {
        throw new SyntaxError('Expected indented block')
      }

      const { payload } = this.findNodes({
        end: token => getColumn(token, 'start') <= indentCount,
        step: () => this.astGenerator.handleNode(environment, nextIndentCount)
      })

      return payload
    }
  }
}

export default BlockStatement
