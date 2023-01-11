import { ENodeType, ETokenType, IGlobalStatement, TToken } from '../../types'
import { createLoc, getLatest, createNode } from '../../utils'
import { EEnvironment } from '../types'
import Node from '../utils/Node'

/** 全局变量声明 */
class GlobalStatement extends Node {
  handle(environment: EEnvironment): IGlobalStatement {
    const globalToken = this.output(ETokenType.keyword, 'global')

    const nameTokens: TToken[] = []
    do {
      const nameToken = this.output(ETokenType.identifier)
      nameTokens.push(nameToken)
    } while (this.eatLine(environment, ETokenType.punctuation, ','))

    const VariableDeclaration = createNode(ENodeType.GlobalStatement, {
      names: nameTokens.map(token => token.value),
      loc: createLoc(globalToken, getLatest(nameTokens))
    })

    return VariableDeclaration
  }
}

export default GlobalStatement
