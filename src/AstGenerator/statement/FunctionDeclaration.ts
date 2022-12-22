import { ENodeType, ETokenType, IFunctionDeclaration, TDecorativeExpressionNode, TExpressionNode } from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 处理函数定义节点 */
class FunctionDeclaration extends BaseHandler {
  /** 处理函数定义节点 */
  handle(environment: EEnvironment, decorators?: TDecorativeExpressionNode[]): IFunctionDeclaration {
    const defToken = this.output(ETokenType.keyword, 'def')

    const nameToken = this.outputLine(ETokenType.identifier)

    this.outputLine(ETokenType.bracket, '(')

    const args = this.astGenerator.expression.arguments.handle(
      token => isToken(token, ETokenType.bracket, ')'),
      EEnvironment.bracket
    )

    this.output(ETokenType.bracket, ')')

    let returnType: TExpressionNode = null
    if (this.eatLine(ETokenType.operator, '->')) {
      returnType = this.astGenerator.expression.handleMaybeIf(environment)
    }

    const body = this.astGenerator.statement.blockStatement.handle(defToken, environment | EEnvironment.functionBody)

    const FunctionDeclaration = this.createNode(ENodeType.FunctionDeclaration, {
      name: nameToken.value,
      args,
      body,
      returnType,
      decorators,
      loc: createLoc(decorators?.[0] || defToken, body)
    })

    return FunctionDeclaration
  }
}

export default FunctionDeclaration
