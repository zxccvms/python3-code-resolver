import { ENodeType, ETokenType, ITemplateLiteral, TToken } from 'src/types'
import { createLoc, getTokenExtra, isExpressionNodes, isToken } from 'src/utils'
import AstGenerator from '../AstGenerator'
import BaseHandler from '../BaseHandler'

/** 模版字符串 */
class TemplateLiteral extends BaseHandler {
  handle(): ITemplateLiteral {
    const currentToken = this.tokens.getToken()
    const extra = getTokenExtra(currentToken)
    this.check({
      checkToken: () => isToken(currentToken, ETokenType.string),
      extraCheck: () => extra.prefix === 'f'
    })

    const expressions = this._handleExpressions(extra.tokensFragment)

    const TemplateLiteral = this.createNode(ENodeType.TemplateLiteral, {
      expressions,
      loc: createLoc(currentToken)
    })

    this.tokens.next()

    return TemplateLiteral
  }

  private _handleExpressions(tokensFragment: TToken[][]): ITemplateLiteral['expressions'] {
    const nodes = []
    for (const tokens of tokensFragment) {
      const _nodes = new AstGenerator(tokens).handleNodes()
      nodes.push(..._nodes)
    }
    if (!isExpressionNodes(nodes)) {
      throw new TypeError('handleTemplateLiteral err: nodes is not all expression node')
    }

    return nodes
  }
}

export default TemplateLiteral
