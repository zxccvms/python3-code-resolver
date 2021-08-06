import { getLatest } from 'src/base/common/objUtils'
import { ENodeType, ETokenType, IBlockStatement, TNode, TTokenItem } from '../../types.d'
import { addBaseNodeAttr, createLoc, isSameRank, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types.d'

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

    const blockStatement = this.createNode(ENodeType.BlockStatement, body)
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

    let body: TNode[]
    // 单行定义
    if (isSameRank(operator, markToken, 'line')) {
      body = this.findNodesByConformToken(token => isSameRank(operator, token, 'line'))
    }
    // 多行定义
    else {
      let lineToken
      body = this.findNodesByConformToken(token => {
        const isSameColumn = isSameRank(markToken, token, 'column')
        if (isSameColumn) lineToken = token

        return isSameColumn || isSameRank(lineToken, token, 'line')
      })
    }
    if (!body) body = this.nodeChain.popByTarget(startNode)

    this.tokens.last()

    return body
  }
}

export default BlockStatement
