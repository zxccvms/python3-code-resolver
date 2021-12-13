import { ENodeType, ICallExpression, IMemberExpression, IProgram, TNode } from './types'

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
  traverse(node: TNode, options = {} as TTraverseOptions, parent: TNode = null) {
    try {
      const type = node.type
      const nodePath = { node, parent }

      const returnNode = options.custom?.(nodePath)
      if (returnNode) {
        this.traverse(returnNode, options)
      } else {
        options.enter?.(nodePath)
        options[type]?.(nodePath as any)

        this[type]?.(node, options) // todo 部分token未转成node
      }
    } catch (e) {
      console.error('AstTraverser traverse err: ', e)
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
