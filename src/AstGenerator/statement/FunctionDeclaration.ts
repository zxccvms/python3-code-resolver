import { ENodeType, ETokenType, IFunctionDeclaration, TDecorativeExpressionNode, TExpressionNode } from '../../types'
import { createLoc, isToken, createNode } from '../../utils'
import Node from '../utils/Node'
import { EEnvironment } from '../types'

/** 处理函数定义节点 */
class FunctionDeclaration extends Node {
  /** 处理函数定义节点 */
  handle(environment: EEnvironment, decorators?: TDecorativeExpressionNode[]): IFunctionDeclaration {
    const defToken = this.output(ETokenType.keyword, 'def')

    const nameToken = this.outputLine(environment, ETokenType.identifier)

    this.outputLine(environment, ETokenType.bracket, '(')

    const args = this.astGenerator.expression.arguments.handle(
      token => isToken(token, ETokenType.bracket, ')'),
      EEnvironment.bracket
    )

    this.output(ETokenType.bracket, ')')

    let returnType: TExpressionNode = null
    if (this.eatLine(environment, ETokenType.operator, '->')) {
      returnType = this.astGenerator.expression.handleMaybeIf(environment)
    }

    const body = this.astGenerator.statement.handleBody(environment | EEnvironment.functionBody, defToken)

    const FunctionDeclaration = createNode(ENodeType.FunctionDeclaration, {
      name: nameToken.value,
      args,
      body,
      returnType,
      decorators,
      loc: createLoc(decorators?.[0] || defToken, body.at(-1))
    })

    return FunctionDeclaration
  }
}

export default FunctionDeclaration
