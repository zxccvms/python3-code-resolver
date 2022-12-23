import { createNode, getColumn } from '../utils'
import { ENodeType, ETokenType, IProgram, TExpressionNode, TNode, TStatementNode, TToken } from '../types'
import Expression from './expression'
import Statement from './statement'
import { EEnvironment } from './types'
import TokenArray from './utils/TokenArray'
import BaseHandler from './utils/BaseHandler'

/** AST生成器 */
class AstGenerator extends BaseHandler {
  tokens: TokenArray
  expression: Expression
  statement: Statement

  constructor(tokens: TToken[]) {
    if (!Array.isArray(tokens)) throw new TypeError('tokens is not Array')
    super()

    this.tokens = new TokenArray(tokens)
    this.expression = new Expression(this)
    this.statement = new Statement(this)
  }

  generate(): IProgram {
    const body = this.handleNodes()
    const programNode = createNode(ENodeType.Program, { body })

    return programNode
  }

  handleNodes(): TNode[] {
    const nodes = []
    while (this.hasToken()) {
      const node = this.handleNodeWithCheckIndent()
      nodes.push(node)
      while (this.eatLine(ETokenType.punctuation, ';') && this.isSameLine()) {
        const node = this.handleNode()
        nodes.push(node)
      }
    }

    return nodes
  }

  handleNodeWithCheckIndent(
    environment?: EEnvironment,
    indentCount: number = 0
  ): TExpressionNode | TStatementNode | undefined {
    if (indentCount !== this.getStartColumn() - 1) {
      throw new SyntaxError('unexpected indent')
    }

    return this.handleNode(environment)
  }

  handleNode(environment: EEnvironment = EEnvironment.normal) {
    return this.statement.handle(environment) || this.expression.handle(environment)
  }
}

export default AstGenerator
