import { inject } from 'src/base/common/injector'
import LogService from 'src/platform/log/browser'
import { ENodeType, ICallExpression, IMemberExpression, IProgram, TNode } from './types.d'

export type TTraverseOptions = {
  /** 每个节点都遍历 */
  enter?: (nodePath: TNodePath) => void
  /** 自定义遍历 遍历返回的节点 */
  custom?: (nodePath: TNodePath) => TNode
} & {
  [P in ENodeType]?: (nodePath: TNodePath<P>) => void
}

type TNodePath<T extends ENodeType = ENodeType> = {
  node: TNode<T>
  parent: TNode
}

/** ast遍历器 */
class AstTraverser {
  @inject() logService!: LogService
  log = this.logService.tag('AstTraverser')

  traverse(node: TNode, options = {} as TTraverseOptions, parent: TNode = null) {
    try {
      const type = node.type
      const nodePath = { node, parent }

      options.enter?.(nodePath)
      options[type]?.(nodePath)

      const returnNode = options.custom?.(nodePath)
      if (returnNode) {
        this[returnNode.type]?.(returnNode, options)
      } else {
        this[type]?.(node, options) // todo 部分token未转成node
      }
    } catch (e) {
      this.log.error('traverse err: ', e)
    }
  }

  private [ENodeType.MemberExpression](node: IMemberExpression, options = {} as TTraverseOptions) {
    this.traverse(node.object, options, node)
    this.traverse(node.property, options, node)
  }

  private [ENodeType.CallExpression](node: ICallExpression, options = {} as TTraverseOptions) {
    this.traverse(node.callee, options, node)

    for (const param of node.params) {
      this.traverse(param, options, node)
    }
  }

  private [ENodeType.Program](node: IProgram, options = {} as TTraverseOptions) {
    for (const item of node.body) {
      this.traverse(item, options, node)
    }
  }
}

export default AstTraverser
