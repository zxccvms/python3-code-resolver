import { ENodeType, ETokenType, IGlobalStatement, TToken } from '../../types'
import { createLoc, getLatest } from '../../utils'
import BaseHandler from '../BaseHandler'

/** 非局部变量声明 */
class NonlocalStatement extends BaseHandler {
  handle(): IGlobalStatement {
    const nonlocalToken = this.output(ETokenType.keyword, 'nonlocal')

    const nameTokens: TToken[] = []
    do {
      const nameToken = this.output(ETokenType.identifier)
      nameTokens.push(nameToken)
    } while (this.isSameLine(nonlocalToken) && this.eat(ETokenType.punctuation, ','))

    const VariableDeclaration = this.createNode(ENodeType.GlobalStatement, {
      names: nameTokens.map(token => token.value),
      loc: createLoc(nonlocalToken, getLatest(nameTokens))
    })

    return VariableDeclaration
  }
}

export default NonlocalStatement
