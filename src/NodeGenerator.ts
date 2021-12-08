import { ENodeType, IBaseNodeAttr, TNode, TNodeMap } from './types'

class NodeGenerator {
  generate = <T extends ENodeType>(type: T, attr: Omit<TNodeMap[T], 'type'> & IBaseNodeAttr): TNode<T> => {
    return {
      type,
      ...attr
    } as TNode<T>
  }
}

export default NodeGenerator
