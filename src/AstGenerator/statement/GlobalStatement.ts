import { ENodeType, ETokenType, IGlobalStatement, TToken } from '../../types'
import { createLoc, getLatest } from '../../utils'
import BaseHandler from '../BaseHandler'

/** 全局变量声明 */
class GlobalStatement extends BaseHandler {
  handle(): IGlobalStatement {
    const globalToken = this.output(ETokenType.keyword, 'global')

    const nameTokens: TToken[] = []
    do {
      const nameToken = this.output(ETokenType.identifier)
      nameTokens.push(nameToken)
    } while (this.isSameLine(globalToken) && this.eat(ETokenType.punctuation, ','))

    const VariableDeclaration = this.createNode(ENodeType.GlobalStatement, {
      names: nameTokens.map(token => token.value),
      loc: createLoc(globalToken, getLatest(nameTokens))
    })

    return VariableDeclaration
  }
}

export default GlobalStatement
