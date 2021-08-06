import { ENodeType, IProgram, TNode, TTokenItem } from '../types.d'
import AstProcessor from './AstProcessor'

/** AST生成器 */
class AstGenerator {
  private astProcessor: AstProcessor

  constructor(tokens: TTokenItem[]) {
    this.astProcessor = new AstProcessor(tokens)
  }

  generate(): IProgram {
    const body = this.generateNodes()
    const programNode = this.astProcessor.createNode(ENodeType.Program, body)

    console.log(
      'taozhizhu ~🚀 file: AstGenerator.ts ~🚀 line 35 ~🚀 AstGenerator ~🚀 generate ~🚀 programNode',
      programNode
    )
    return programNode
  }

  generateNodes(): TNode[] {
    return this.astProcessor.handle()
  }
}

export default AstGenerator
