import { ENodeType, ETokenType, IEllipsis } from '../../types'
import { createLoc, isSameRank, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** Ellipsis ... */
class Ellipsis extends Node {
  handle(environment: EEnvironment): IEllipsis {
    this.check({ environment })

    const startToken = this.output(ETokenType.punctuation, '.')
    this.output(ETokenType.punctuation, '.')
    const endToken = this.output(ETokenType.punctuation, '.')

    const Ellipsis = createNode(ENodeType.Ellipsis, {
      loc: createLoc(startToken, endToken)
    })

    return Ellipsis
  }

  isConform() {
    const token1 = this.tokens.getToken()
    if (!isToken(token1, ETokenType.punctuation, '.')) return false

    const token2 = this.tokens.getToken(1)
    if (!isToken(token2, ETokenType.punctuation, '.')) return false
    else if (token1.loc.end.line !== token2.loc.end.line) return false
    else if (token1.loc.end.column + 1 !== token2.loc.end.column) return false

    const token3 = this.tokens.getToken(2)
    if (!isToken(token3, ETokenType.punctuation, '.')) return false
    else if (token2.loc.end.line !== token3.loc.end.line) return false
    else if (token2.loc.end.column + 1 !== token3.loc.end.column) return false

    return true
  }
}

export default Ellipsis
