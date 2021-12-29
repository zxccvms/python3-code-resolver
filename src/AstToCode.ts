import {
  ENodeType,
  EUnaryExpressionOperator,
  IArgument,
  IArguments,
  IArrayComprehensionExpression,
  IArrayExpression,
  IAssignmentExpression,
  IAwaitExpression,
  IBinaryExpression,
  IBooleanLiteral,
  ICallExpression,
  ICompareExpression,
  IComprehension,
  IDictionaryComprehensionExpression,
  IDictionaryExpression,
  IEllipsis,
  IGeneratorExpression,
  IIdentifier,
  IIfExpression,
  IKeyword,
  ILambdaExpression,
  ILogicalExpression,
  IMemberExpression,
  INamedExpression,
  INoneLiteral,
  INumberLiteral,
  IProgram,
  ISetComprehensionExpression,
  ISetExpression,
  ISliceExpression,
  IStarredExpression,
  IStringLiteral,
  ISubscriptExpression,
  ITemplateLiteral,
  ITupleExpression,
  IUnaryExpression,
  IYieldExpression,
  IYieldFromExpression,
  TNode
} from './types'
import { hasParenthesized, isNode } from './utils'

export interface IAstToCodeOptions {
  transform?(node: TNode, code: string, props: IRecursiveProps): string
}

interface IRecursiveProps {
  rank: number
  parentNode: TNode
}

const recursiveDefaultProps: IRecursiveProps = {
  rank: 0,
  parentNode: null
}

class AstToCode {
  constructor(private options: IAstToCodeOptions = {}) {}

  generate(node: TNode, recursiveProps = recursiveDefaultProps, { prefix = '', suffix = '' } = {}) {
    try {
      if (!node) return ''

      const type = node.type
      let code = this[type]?.(node, {
        parentNode: node,
        rank: recursiveProps.rank + 1
      })
      code = hasParenthesized(node) ? `(${code})` : code

      return prefix + (this.options?.transform?.(node, code, recursiveProps) ?? code) + suffix
    } catch (e) {
      console.error('generate err: ', e)
      return ''
    }
  }

  generateArray(
    nodes: TNode[],
    recursiveProps = recursiveDefaultProps,
    { prefix = '', suffix = '', enableFirstPrefix = true, enableLastSuffix = true } = {}
  ) {
    return nodes.reduce(
      (res, node, index) =>
        res +
        this.generate(node, recursiveProps, {
          prefix: index > 0 || enableFirstPrefix ? prefix : '',
          suffix: index < nodes.length - 1 || enableLastSuffix ? suffix : ''
        }),
      ''
    )
  }

  private [ENodeType.NumberLiteral](node: INumberLiteral) {
    return node.raw
  }

  private [ENodeType.StringLiteral](node: IStringLiteral) {
    return node.raw
  }

  private [ENodeType.Identifier](node: IIdentifier) {
    return node.name
  }
  private [ENodeType.NoneLiteral](node: INoneLiteral) {
    return 'None'
  }
  private [ENodeType.BooleanLiteral](node: IBooleanLiteral) {
    return node.value ? 'True' : 'False'
  }
  private [ENodeType.Ellipsis](node: IEllipsis) {
    return '...'
  }

  /** 参数列表 */
  private [ENodeType.Arguments](node: IArguments, recursiveProps: IRecursiveProps) {
    const { posArgs, args, defaults, varArg, keywordOnlyArgs, keywordDefaults, keywordArg } = node

    const code =
      [...posArgs, ...args].reduce((res, arg, index, args) => {
        if (args.length <= defaults.length + index) {
          const _default = defaults[index - (args.length - defaults.length)]
          res +=
            this.generate(arg, recursiveProps) + this.generate(_default, recursiveProps, { prefix: '=', suffix: ', ' })
        } else {
          res += this.generate(arg, recursiveProps, { suffix: ', ' })
        }

        if (posArgs.length === index + 1) {
          res += '/, '
        }

        return res
      }, '') +
      // this.generate(varArg, recursiveProps, { prefix: '*', suffix: ', ' }) +
      keywordOnlyArgs.reduce(
        (res, arg, index) =>
          res +
          this.generate(arg, recursiveProps) +
          this.generate(keywordDefaults[index], recursiveProps, { prefix: '=' }) +
          ', ',
        keywordOnlyArgs.length
          ? varArg
            ? this.generate(varArg, recursiveProps, { prefix: '*', suffix: ', ' })
            : '*, '
          : ''
      ) +
      this.generate(keywordArg, recursiveProps, { prefix: '**', suffix: ', ' })

    return code.slice(0, code.length - 2)
  }
  /** 参数 */
  private [ENodeType.Argument](node: IArgument) {
    return node.name
  }
  /** 关键字 */
  private [ENodeType.Keyword](node: IKeyword, recursiveProps: IRecursiveProps) {
    return (node.name ? `${node.name}=` : '**') + this.generate(node.value, recursiveProps)
  }
  /** 数组切割表达式 1: 1:1:1 */
  private [ENodeType.SliceExpression](node: ISliceExpression, recursiveProps: IRecursiveProps) {
    return (
      this.generate(node.lower, recursiveProps, {
        suffix: ':'
      }) +
      this.generate(node.upper, recursiveProps, {
        suffix: ':'
      }) +
      this.generate(node.step, recursiveProps)
    )
  }
  /** 解析 for a in 1 if 2*/
  private [ENodeType.Comprehension](node: IComprehension, recursiveProps: IRecursiveProps) {
    return (
      this.generate(node.target, recursiveProps, { prefix: node.isAsync ? 'async for ' : 'for ' }) +
      this.generate(node.iterable, recursiveProps, { prefix: ' in ' }) +
      this.generateArray(node.ifs, recursiveProps, { prefix: ' if ' })
    )
  }
  /** 模版字符串的值 */
  private [ENodeType.TemplateLiteral](node: ITemplateLiteral, recursiveProps: IRecursiveProps) {
    return node.expressions.reduce(
      (res, expression) =>
        res +
        this.generate(
          expression,
          recursiveProps,
          isNode(expression, ENodeType.StringLiteral)
            ? {}
            : {
                prefix: '{',
                suffix: '}'
              }
        ),
      ''
    )
  }

  // 表达式
  /** 一元表达式 -1 +1 not 1 */
  private [ENodeType.UnaryExpression](node: IUnaryExpression, recursiveProps: IRecursiveProps) {
    return this.generate(node.argument, recursiveProps, {
      prefix: node.operator === EUnaryExpressionOperator.not ? 'not ' : node.operator
    })
  }
  /** if表达式 1 if true else 2 */
  private [ENodeType.IfExpression](node: IIfExpression, recursiveProps: IRecursiveProps) {
    return (
      this.generate(node.test, recursiveProps, { suffix: ' if ' }) +
      this.generate(node.body, recursiveProps, { suffix: ' else ' }) +
      this.generate(node.alternate, recursiveProps)
    )
  }
  /** 元组表达式 1,2 (1,2) */
  private [ENodeType.TupleExpression](node: ITupleExpression, recursiveProps: IRecursiveProps) {
    return this.generateArray(node.elements, recursiveProps, { suffix: ', ', enableLastSuffix: false })
  }
  /** 数组表达式 [1,2] */
  private [ENodeType.ArrayExpression](node: IArrayExpression, recursiveProps: IRecursiveProps) {
    return '[' + this.generateArray(node.elements, recursiveProps, { suffix: ', ', enableLastSuffix: false }) + ']'
  }
  /** 数组解析表达式 [1 for 2 in 3] */
  private [ENodeType.ArrayComprehensionExpression](
    node: IArrayComprehensionExpression,
    recursiveProps: IRecursiveProps
  ) {
    return (
      '[' +
      this.generate(node.element, recursiveProps) +
      this.generateArray(node.generators, recursiveProps, { prefix: ' ' }) +
      ']'
    )
  }
  /** 字典表达式 {a:1} */
  private [ENodeType.DictionaryExpression](node: IDictionaryExpression, recursiveProps: IRecursiveProps) {
    const { keys, values } = node

    return (
      '{' +
      keys.reduce(
        (res, key, index) =>
          res +
          this.generate(values[index], recursiveProps, {
            prefix: key ? this.generate(key, recursiveProps, { suffix: ': ' }) : '**',
            suffix: index === keys.length - 1 ? '' : ', '
          }),
        ''
      ) +
      '}'
    )
  }
  /** 字典解析表达式 {a: 1 for a in 2} */
  private [ENodeType.DictionaryComprehensionExpression](
    node: IDictionaryComprehensionExpression,
    recursiveProps: IRecursiveProps
  ) {
    return (
      '{' +
      this.generate(node.key, recursiveProps, { suffix: ': ' }) +
      this.generate(node.value, recursiveProps) +
      this.generateArray(node.generators, recursiveProps, { prefix: ' ' }) +
      '}'
    )
  }
  /** 运算表达式 a + b   a == b  a > b */
  private [ENodeType.BinaryExpression](node: IBinaryExpression, recursiveProps: IRecursiveProps) {
    return (
      this.generate(node.left, recursiveProps, { suffix: ` ${node.operator} ` }) +
      this.generate(node.right, recursiveProps)
    )
  }
  /** 赋值表达式 a = 1 */
  private [ENodeType.AssignmentExpression](node: IAssignmentExpression, recursiveProps: IRecursiveProps) {
    this.generateArray(node.targets, recursiveProps, { suffix: ', ', enableLastSuffix: false }) +
      this.generate(node.value, recursiveProps, { prefix: ` ${node.operator} ` })
  }
  /** 对象引用表达式 a.b  */
  private [ENodeType.MemberExpression](node: IMemberExpression, recursiveProps: IRecursiveProps) {
    return this.generate(node.object, recursiveProps, { suffix: '.' }) + this.generate(node.property, recursiveProps)
  }
  /** 下标表达式 a["b"] a[1:] */
  private [ENodeType.SubscriptExpression](node: ISubscriptExpression, recursiveProps: IRecursiveProps) {
    return (
      this.generate(node.object, recursiveProps, { suffix: '[' }) +
      this.generateArray(node.subscript, recursiveProps, { suffix: ', ', enableLastSuffix: false }) +
      ']'
    )
  }
  /** 函数调用表达式 a() */
  private [ENodeType.CallExpression](node: ICallExpression, recursiveProps: IRecursiveProps) {
    return (
      this.generate(node.callee, recursiveProps, { suffix: '(' }) +
      this.generateArray(node.args, recursiveProps, { suffix: ', ', enableLastSuffix: false }) +
      this.generateArray(node.keywords, recursiveProps, { prefix: ', ' }) +
      ')'
    )
  }
  /** 比较表达式 a in b */
  private [ENodeType.CompareExpression](node: ICompareExpression, recursiveProps: IRecursiveProps) {
    return (
      this.generate(node.left, recursiveProps, { suffix: ` ${node.operator} ` }) +
      this.generate(node.right, recursiveProps)
    )
  }
  /** 逻辑表达式 a and b */
  private [ENodeType.LogicalExpression](node: ILogicalExpression, recursiveProps: IRecursiveProps) {
    return (
      this.generate(node.left, recursiveProps, { suffix: ` ${node.operator} ` }) +
      this.generate(node.right, recursiveProps)
    )
  }
  /** set表达式 {a, b, c} */
  private [ENodeType.SetExpression](node: ISetExpression, recursiveProps: IRecursiveProps) {
    return '{' + this.generateArray(node.elements, recursiveProps, { suffix: ', ', enableLastSuffix: false }) + '}'
  }
  /** set解析表达式 */
  private [ENodeType.SetComprehensionExpression](node: ISetComprehensionExpression, recursiveProps: IRecursiveProps) {
    return (
      '{' +
      this.generate(node.element, recursiveProps) +
      this.generateArray(node.generators, recursiveProps, { prefix: ' ' }) +
      '}'
    )
  }
  /** lambda表达式 lambda a : a + 1 */
  private [ENodeType.LambdaExpression](node: ILambdaExpression, recursiveProps: IRecursiveProps) {
    return (
      this.generate(node.args, recursiveProps, { prefix: 'lambda ', suffix: ' : ' }) +
      this.generate(node.body, recursiveProps)
    )
  }
  /** yield表达式 */
  private [ENodeType.YieldExpression](node: IYieldExpression, recursiveProps: IRecursiveProps) {
    return this.generate(node.value, recursiveProps, { prefix: 'yield ' })
  }
  /** yield from 表达式 */
  private [ENodeType.YieldFromExpression](node: IYieldFromExpression, recursiveProps: IRecursiveProps) {
    return this.generate(node.value, recursiveProps, { prefix: 'yield from ' })
  }
  /** a(*b) or class a(*b) 的*b */
  private [ENodeType.StarredExpression](node: IStarredExpression, recursiveProps: IRecursiveProps) {
    return this.generate(node.value, recursiveProps, { prefix: '*' })
  }
  /** 生成器表达式 必须要有bracket环境 (1 for a in 2) */
  private [ENodeType.GeneratorExpression](node: IGeneratorExpression, recursiveProps: IRecursiveProps) {
    return (
      this.generate(node.element, recursiveProps) + this.generateArray(node.generators, recursiveProps, { prefix: ' ' })
    )
  }
  private [ENodeType.AwaitExpression](node: IAwaitExpression, recursiveProps: IRecursiveProps) {
    return this.generate(node.value, recursiveProps, { prefix: 'await ' })
  }

  private [ENodeType.NamedExpression](node: INamedExpression, recursiveProps: IRecursiveProps) {
    return this.generate(node.target, recursiveProps, { suffix: ' := ' }) + this.generate(node.value, recursiveProps)
  }

  private [ENodeType.Program](node: IProgram, recursiveProps: IRecursiveProps) {
    return this.generateArray(node.body, recursiveProps)
  }
}

export default AstToCode
