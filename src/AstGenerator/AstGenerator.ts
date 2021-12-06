import NodeGenerator from 'src/NodeGenerator'
import { getColumn } from 'src/utils'
import { ENodeType, IProgram, TExpressionNode, TNode, TStatementNode, TToken } from '../types'
import Expression from './expression'
import Statement from './statement'
import { ENodeEnvironment } from './types'
import TokenArray from './utils/TokenArray'

/** AST生成器 */
class AstGenerator {
  tokens: TokenArray
  expression: Expression
  statement: Statement
  createNode = new NodeGenerator().generate

  constructor(tokens: TToken[]) {
    if (!Array.isArray(tokens)) throw new TypeError('tokens is not Array')

    this.tokens = new TokenArray(tokens)
    this.expression = new Expression(this)
    this.statement = new Statement(this)
  }

  generate(): IProgram {
    const body = this.handleNodes()
    const programNode = this.createNode(ENodeType.Program, { body })

    return programNode
  }

  handleNodes(): TNode[] {
    const nodes = []
    while (this.tokens.getIndex() < this.tokens.getLength()) {
      nodes.push(this.handleNode())
    }

    return nodes
  }

  handleNode(
    environment: ENodeEnvironment = ENodeEnvironment.normal,
    indentCount: number = 0
  ): TExpressionNode | TStatementNode {
    const token = this.tokens.getToken()
    const column = getColumn(token, 'start')
    if (indentCount !== column) {
      throw new SyntaxError('unexpected indent')
    }

    // todo Statements must be separated by newlines or semicolons
    return this.statement.handle() || this.expression.handle(environment)
  }
}

export default AstGenerator
