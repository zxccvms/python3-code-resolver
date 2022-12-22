import {
  ENodeType,
  ETokenType,
  IAsyncFunctionDeclaration,
  TDecorativeExpressionNode,
  TExpressionNode
} from '../../types'
import { createLoc, isToken } from '../../utils'
import BaseHandler from '../BaseHandler'
import { EEnvironment } from '../types'

/** 异步处理函数定义节点 */
class AsyncFunctionDeclaration extends BaseHandler {
  handle(environment: EEnvironment, decorators?: TDecorativeExpressionNode[]): IAsyncFunctionDeclaration {
    const asyncToken = this.output(ETokenType.keyword, 'async')
    this.outputLine(ETokenType.keyword, 'def')

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

    const body = this.astGenerator.statement.blockStatement.handle(asyncToken, environment | EEnvironment.functionBody)

    const AsyncFunctionDeclaration = this.createNode(ENodeType.AsyncFunctionDeclaration, {
      name: nameToken.value,
      args,
      body,
      returnType,
      decorators,
      loc: createLoc(decorators?.[0] || asyncToken, body)
    })

    return AsyncFunctionDeclaration
  }
}

export default AsyncFunctionDeclaration
