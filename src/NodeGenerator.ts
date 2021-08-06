import { ENodeType, TBaseNodeAttr, TNode, TNodeMap } from './types'

class NodeGenerator {
  generate<T extends ENodeType>(type: T, attr: Omit<TNodeMap[T], 'type'> & TBaseNodeAttr): TNode<T> {
    return {
      type,
      ...attr
    } as TNode<T>
  }
}

export default NodeGenerator
