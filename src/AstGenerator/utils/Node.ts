import TokenArray from './TokenArray'
import AstGenerator from '..'
import BaseHandler from './BaseHandler'

/** 节点基础的处理者 */
class Node extends BaseHandler {
  public tokens: TokenArray

  constructor(public astGenerator: AstGenerator) {
    super()
    this.tokens = astGenerator.tokens
  }
}

export default Node
