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
    const tokenLength = this.tokens.getLength()
    while (this.tokens.getIndex() < tokenLength) {
      const node = this.handleNode()
      if (node) nodes.push(node)
    }

    return nodes
  }

  handleNode(
    environment: EEnvironment = EEnvironment.normal,
    indentCount: number = 0
  ): TExpressionNode | TStatementNode | undefined {
    if (this.eatLine(ETokenType.punctuation, ';')) {
      if (this.isSameLine()) {
        return this.statement.handle(environment) || this.expression.handle(environment)
      }
    }

    if (!this.hasToken()) return
    else if (indentCount !== this.getStartColumn() - 1) {
      throw new SyntaxError('unexpected indent')
    }

    return this.statement.handle(environment) || this.expression.handle(environment)
  }
}

export default AstGenerator
