import { ENodeType, ETokenType, ITemplateLiteral, TTokenItem } from 'src/types'
import { createLoc, getTokenExtra, isExpressionNode, isExpressionNodes, isToken } from 'src/utils'
import AstGenerator from '../AstGenerator'
import BaseHandler from '../BaseHandler'
import { EHandleCode } from '../types'

/** 模版字符串 */
class TemplateLiteral extends BaseHandler {
  handle() {
    const TemplateLiteral = this.handleTemplateLiteral()
    return { code: EHandleCode.single, payload: TemplateLiteral }
  }

  handleTemplateLiteral(): ITemplateLiteral {
    const currentToken = this.tokens.getToken()
    if (!isToken(currentToken, ETokenType.string)) {
      throw new TypeError('handleTemplateLiteral err: currentToken is not string')
    }
    const extra = getTokenExtra(currentToken)
    if (extra.prefix !== 'f') {
      throw new TypeError("handleTemplateLiteral err: currentToken'prefix is not 'f'")
    }

    const expressions = this._handleExpressions(extra.tokensFragment)

    const TemplateLiteral = this.createNode(ENodeType.TemplateLiteral, {
      expressions,
      loc: createLoc(currentToken)
    })

    this.tokens.next()

    return TemplateLiteral
  }

  private _handleExpressions(tokensFragment: TTokenItem[][]): ITemplateLiteral['expressions'] {
    const nodes = []
    for (const tokens of tokensFragment) {
      const _nodes = new AstGenerator(tokens).generateNodes()
      nodes.push(..._nodes)
    }
    if (!isExpressionNodes(nodes)) {
      throw new TypeError('handleTemplateLiteral err: nodes is not all expression node')
    }

    return nodes
  }
}

export default TemplateLiteral
