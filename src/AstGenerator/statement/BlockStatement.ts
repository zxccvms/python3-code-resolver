import { ENodeType, ETokenType, IBlockStatement, TToken } from '../../types'
import { createLoc, getColumn, getLatest, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 块声明 */
class BlockStatement extends BaseHandler {
  handle(startToken: TToken, environment: EEnvironment = EEnvironment.normal): IBlockStatement {
    const colonToken = this.output(ETokenType.punctuation, ':')
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
      return [this.astGenerator.statement.handle(environment) || this.astGenerator.expression.handle(environment)]
    }
    // 多行定义
    else {
      const startColumn = getColumn(startToken, 'start')
      const markColumn = getColumn(markToken, 'start')
      if (markColumn < startColumn) {
        throw new SyntaxError('Expected indented block')
      }

      const { payload } = this.findNodes({
        end: token => getColumn(token, 'start') !== markColumn,
        step: () => this.astGenerator.handleNode(environment, markColumn - 1)
      })

      return payload
    }
  }
}

export default BlockStatement
