import { ENodeType, IProgram, TExpressionNode, TNode, TStatementNode, TTokenItem } from '../types'
import AstProcessor from './AstProcessor'

/** AST生成器 */
class AstGenerator {
  private astProcessor: AstProcessor

  constructor(tokens: TTokenItem[]) {
    this.astProcessor = new AstProcessor(tokens)
  }

  generate(): IProgram {
    const body = this.generateNodes()
    const programNode = this.astProcessor.createNode(ENodeType.Program, { body })

    return programNode
  }

  generateNodes(): (TExpressionNode | TStatementNode)[] {
    return this.astProcessor.handle() as (TExpressionNode | TStatementNode)[]
  }
}

export default AstGenerator
