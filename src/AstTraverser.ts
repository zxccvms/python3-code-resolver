import {
  ENodeType,
  IAssignmentExpression,
  ICallExpression,
  IMemberExpression,
  IProgram,
  TNode,
  IArguments,
  IKeyword,
  ISliceExpression,
  IComprehension,
  ITemplateLiteral,
  IUnaryExpression,
  IIfExpression,
  ITupleExpression,
  IArrayExpression,
  IArrayComprehensionExpression,
  IDictionaryExpression,
  IDictionaryComprehensionExpression,
  IBinaryExpression,
  ISubscriptExpression,
  ICompareExpression,
  ILogicalExpression,
  ISetExpression,
  ISetComprehensionExpression,
  ILambdaExpression,
  IYieldExpression,
  IYieldFromExpression,
  IStarredExpression,
  IGeneratorExpression,
  IAwaitExpression,
  INamedExpression,
  IIfStatement,
  IForStatement,
  IBlockStatement
} from './types'

export type TTraverseOptions = {
  /** 每个节点都遍历 */
  enter?: (nodePath: TNodePath) => void
  /** 自定义遍历 遍历返回的节点 */
  custom?: (nodePath: TNodePath) => TNode | false
} & {
  [P in ENodeType]?: (nodePath: TNodePath<P>) => void
}

type TNodePath<T extends ENodeType = ENodeType> = {
  node: TNode<T>
}

/** ast遍历器 */
class AstTraverser {
  constructor(private options: TTraverseOptions = {}) {}

  traverse(node: TNode) {
    try {
      if (!node) return

      const type = node.type
      const nodePath = { node }

      const rNode = this.options.custom?.(nodePath)
      if (rNode) {
        this.traverse(rNode)
      } else if (rNode !== false) {
        this.options.enter?.(nodePath)
        this.options[type]?.(nodePath as any)

        this[type]?.(node) // todo 部分token未转成node
      }
    } catch (e) {
      console.error('traverse err: ', e)
    }
  }

  traverseArray(nodes: TNode[]) {
    for (const node of nodes) {
      this.traverse(node)
    }
  }

  /** 参数列表 */
  private [ENodeType.Arguments](node: IArguments) {
    this.traverseArray(node.posArgs)
    this.traverseArray(node.args)
    this.traverseArray(node.defaults)
    this.traverse(node.varArg)
    this.traverseArray(node.keywordOnlyArgs)
    this.traverseArray(node.keywordDefaults)
    this.traverse(node.keywordArg)
  }
  /** 关键字 */
  private [ENodeType.Keyword](node: IKeyword) {
    this.traverse(node.value)
  }
  /** 数组切割表达式 1: 1:1:1 */
  private [ENodeType.SliceExpression](node: ISliceExpression) {
    this.traverse(node.lower)
    this.traverse(node.upper)
    this.traverse(node.step)
  }
  /** 解析 for a in 1*/
  private [ENodeType.Comprehension](node: IComprehension) {
    this.traverse(node.target)
    this.traverse(node.iterable)
    this.traverseArray(node.ifs)
  }
  /** 模版字符串的值 */
  private [ENodeType.TemplateLiteral](node: ITemplateLiteral) {
    this.traverseArray(node.expressions)
  }

  // 表达式
  /** 一元表达式 -1 +1 not 1 */
  private [ENodeType.UnaryExpression](node: IUnaryExpression) {
    this.traverse(node.argument)
  }
  /** if表达式 1 if true else 2 */
  private [ENodeType.IfExpression](node: IIfExpression) {
    this.traverse(node.test)
    this.traverse(node.body)
    this.traverse(node.alternate)
  }
  /** 元组表达式 1,2 (1,2) */
  private [ENodeType.TupleExpression](node: ITupleExpression) {
    this.traverseArray(node.elements)
  }
  /** 数组表达式 [1,2] */
  private [ENodeType.ArrayExpression](node: IArrayExpression) {
    this.traverseArray(node.elements)
  }
  /** 数组解析表达式 [1 for 2 in 3] */
  private [ENodeType.ArrayComprehensionExpression](node: IArrayComprehensionExpression) {
    this.traverse(node.element)
    this.traverseArray(node.generators)
  }
  /** 字典表达式 {a:1} */
  private [ENodeType.DictionaryExpression](node: IDictionaryExpression) {
    this.traverseArray(node.keys)
    this.traverseArray(node.values)
  }
  /** 字典解析表达式 {a: 1 for a in 2} */
  private [ENodeType.DictionaryComprehensionExpression](node: IDictionaryComprehensionExpression) {
    this.traverse(node.key)
    this.traverse(node.value)
    this.traverseArray(node.generators)
  }
  /** 运算表达式 a + b   a == b  a > b */
  private [ENodeType.BinaryExpression](node: IBinaryExpression) {
    this.traverse(node.left)
    this.traverse(node.right)
  }
  /** 赋值表达式 a = 1 */
  private [ENodeType.AssignmentExpression](node: IAssignmentExpression) {
    this.traverseArray(node.targets)
    this.traverse(node.value)
  }
  /** 对象引用表达式 a.b  */
  private [ENodeType.MemberExpression](node: IMemberExpression) {
    this.traverse(node.object)
    this.traverse(node.property)
  }
  /** 下标表达式 a["b"] a[1:] */
  private [ENodeType.SubscriptExpression](node: ISubscriptExpression) {
    this.traverse(node.object)
    this.traverseArray(node.subscript)
  }
  /** 函数调用表达式 a() */
  private [ENodeType.CallExpression](node: ICallExpression) {
    this.traverse(node.callee)
    this.traverseArray(node.args)
    this.traverseArray(node.keywords)
  }
  /** 比较表达式 a in b */
  private [ENodeType.CompareExpression](node: ICompareExpression) {
    this.traverse(node.left)
    this.traverse(node.right)
  }
  /** 逻辑表达式 a and b */
  private [ENodeType.LogicalExpression](node: ILogicalExpression) {
    this.traverse(node.left)
    this.traverse(node.right)
  }
  /** set表达式 {a, b, c} */
  private [ENodeType.SetExpression](node: ISetExpression) {
    this.traverseArray(node.elements)
  }
  /** set解析表达式 */
  private [ENodeType.SetComprehensionExpression](node: ISetComprehensionExpression) {
    this.traverse(node.element)
    this.traverseArray(node.generators)
  }
  /** lambda表达式 lambda a : a + 1 */
  private [ENodeType.LambdaExpression](node: ILambdaExpression) {
    this.traverse(node.args)
    this.traverse(node.body)
  }
  /** yield表达式 */
  private [ENodeType.YieldExpression](node: IYieldExpression) {
    this.traverse(node.value)
  }
  /** yield from 表达式 */
  private [ENodeType.YieldFromExpression](node: IYieldFromExpression) {
    this.traverse(node.value)
  }
  /** a(*b) or class a(*b) 的*b */
  private [ENodeType.StarredExpression](node: IStarredExpression) {
    this.traverse(node.value)
  }
  /** 生成器表达式 必须要有bracket环境 (1 for a in 2) */
  private [ENodeType.GeneratorExpression](node: IGeneratorExpression) {
    this.traverse(node.element)
    this.traverseArray(node.generators)
  }

  private [ENodeType.AwaitExpression](node: IAwaitExpression) {
    this.traverse(node.value)
  }

  private [ENodeType.NamedExpression](node: INamedExpression) {
    this.traverse(node.target)
    this.traverse(node.value)
  }

  // 语句

  private [ENodeType.IfStatement](node: IIfStatement) {
    this.traverse(node.test)
    this.traverse(node.body)
    this.traverse(node.alternate)
  }

  private [ENodeType.ForStatement](node: IForStatement) {
    this.traverse(node.target)
    this.traverse(node.iterable)
    this.traverse(node.body)
  }

  private [ENodeType.BlockStatement](node: IBlockStatement) {
    this.traverseArray(node.body)
  }

  private [ENodeType.Program](node: IProgram) {
    this.traverseArray(node.body)
  }
}

export default AstTraverser
