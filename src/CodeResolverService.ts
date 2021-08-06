import { inject, injectable } from 'src/base/common/injector'
import { ENodeType, TTokenItem, TNode, IProgram } from './types.d'
import CodeScanner from './CodeScanner'
import AstGenerator from './AstGenerator/AstGenerator'
import LogService from 'src/platform/log/browser'
import AstTraverser, { TTraverseOptions } from './AstTraverser'
import AstToCode from './AstToCode'
import NodeGenerator from './NodeGenerator'
import fs from 'fs'

@injectable('CodeResolverService')
/** 任务块代码解析器 */
class CodeResolverService {
  @inject() logService!: LogService
  log = this.logService.tag('CodeResolverService')
  codeScanner = new CodeScanner()
  astTraverser = new AstTraverser()
  astToCode = new AstToCode()
  nodeGenerator = new NodeGenerator()

  test() {
    const code = fs.readFileSync(
      '/Users/shizai2/Desktop/rpa/rpa-app/rpa-studio/src/platform/codeResolver/browser/test.py',
      { encoding: 'utf-8' }
    )
    this.resolve(code)
  }

  resolve(code: string): IProgram {
    try {
      const tokens = this.getTokens(code)
      const astGenerator = new AstGenerator(tokens)
      return astGenerator.generate()
    } catch (e) {
      this.log.error('resolve err: ', e)
      return this.nodeGenerator.generate(ENodeType.Program, [])
    }
  }

  getTokens(code: string): TTokenItem[] {
    try {
      return this.codeScanner.scan(code)
    } catch (e) {
      this.log.error('getTokens err: ', e)
      return []
    }
  }

  /** 通过类型得到节点列表 */
  getNodesMapByType<T extends ENodeType>(code: string, types: T[]): { [P in T]: TNode<P>[] } {
    const result = {} as { [P in T]: TNode<P>[] }
    const options = {} as TTraverseOptions

    for (const type of types) {
      result[type] = []
      options[type] = ({ node }) => result[type].push(node)
    }

    const programNode = this.resolve(code)
    this.astTraverser.traverse(programNode, options)

    return result
  }
}

export default CodeResolverService
