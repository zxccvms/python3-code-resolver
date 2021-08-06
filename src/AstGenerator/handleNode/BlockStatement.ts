import { ENodeType, ETokenType, IBlockStatement, TExpressionNode, TStatementNode, TTokenItem } from '../../types'
import { addBaseNodeAttr, createLoc, getLatest, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** 块声明 */
class BlockStatement extends BaseHandler {
  handle() {
    const BlockStatement = this.handleBlockStatement()
    return { code: EHandleCode.single, payload: BlockStatement }
  }

  handleBlockStatement(): IBlockStatement {
    let operator = this.tokens.getToken()
    if (!isToken(operator, ETokenType.punctuation, ':')) {
      throw new TypeError("handleBlockStatement err: currentToken is not operator ':'")
    }

    this.tokens.next()
    const body = this._handleBody(operator)

    const blockStatement = this.createNode(ENodeType.BlockStatement, { body })
    const BlockStatement = addBaseNodeAttr(blockStatement, {
      loc: createLoc(operator, getLatest(body))
    })

    this.tokens.next()

    return BlockStatement
  }

  private _handleBody(operator: TTokenItem): IBlockStatement['body'] {
    const markToken = this.tokens.getToken()
    if (!markToken) {
      throw new TypeError('handleBlockStatement err: markToken is not exsit')
    }

    const startNode = this.nodeChain.get()

    let body: IBlockStatement['body']
    // 单行定义
    if (isSameRank(operator, markToken, 'line')) {
      body = this.findNodesByConformToken((token) => isSameRank(operator, token, 'line')) as TExpressionNode[]
    }
    // 多行定义
    else {
      let lineToken: TTokenItem
      body = this.findNodesByConformToken((token) => {
        const isSameColumn = isSameRank(markToken, token, 'column')
        if (isSameColumn) lineToken = token

        return isSameColumn || isSameRank(lineToken, token, 'line')
      }) as TStatementNode[]
    }
    if (!body) body = this.nodeChain.popByTarget(startNode) as (TExpressionNode | TStatementNode)[]

    this.tokens.last()

    return body
  }
}

export default BlockStatement
