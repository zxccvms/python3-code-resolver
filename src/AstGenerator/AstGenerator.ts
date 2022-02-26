import NodeGenerator from 'src/NodeGenerator'
import { getColumn, isSameRank, isToken } from 'src/utils'
import { ENodeType, ETokenType, IProgram, TExpressionNode, TNode, TStatementNode, TToken } from '../types'
import Expression from './expression'
import Statement from './statement'
import { EEnvironment } from './types'
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
    environment: EEnvironment = EEnvironment.normal,
    indentCount: number = 0
  ): TExpressionNode | TStatementNode {
    // const lastToken = this.tokens.getToken(-1)
    // const token = this.tokens.getToken()
    // const column = getColumn(token, 'start')
    // if (lastToken && isSameRank([lastToken, token], 'endAndStartLine')) {
    //   throw new SyntaxError('Statements must be separated by newlines or semicolons')
    // } else if (indentCount !== column - 1) {
    //   throw new SyntaxError('unexpected indent')
    // }

    return this.statement.handle(environment) || this.expression.handle(environment)
  }
}

export default AstGenerator
