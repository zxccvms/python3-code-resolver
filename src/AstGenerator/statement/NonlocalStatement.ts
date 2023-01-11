import { ENodeType, ETokenType, IGlobalStatement, TToken } from '../../types'
import { createLoc, getLatest, createNode } from '../../utils'
import { EEnvironment } from '../types'
import Node from '../utils/Node'

/** 非局部变量声明 */
class NonlocalStatement extends Node {
  handle(environment: EEnvironment): IGlobalStatement {
    const nonlocalToken = this.output(ETokenType.keyword, 'nonlocal')

    const nameTokens: TToken[] = []
    do {
      const nameToken = this.output(ETokenType.identifier)
      nameTokens.push(nameToken)
    } while (this.eatLine(environment, ETokenType.punctuation, ','))

    const VariableDeclaration = createNode(ENodeType.GlobalStatement, {
      names: nameTokens.map(token => token.value),
      loc: createLoc(nonlocalToken, getLatest(nameTokens))
    })

    return VariableDeclaration
  }
}

export default NonlocalStatement
