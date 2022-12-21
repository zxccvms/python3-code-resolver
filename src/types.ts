export enum ETokenType {
  /** 关键字 def global pass */
  keyword = 'keyword',
  /** 标识符 a b c */
  identifier = 'identifier',
  /** 字符串 '1' '2' '3' */
  string = 'string',
  /** 数字 1 2 3 */
  number = 'number',
  /** 操作符 + - * / % ** // < > = <= >= != == += -= *= /= %= **= //= @ | & */
  operator = 'operator',
  /** 括号 () [] {} */
  bracket = 'bracket',
  /** 标点符号 . , : */
  punctuation = 'punctuation',
  /** ellipsis ... */
  ellipsis = 'ellipsis'
}

export enum EStringTokenPrefix {
  b = 'b',
  u = 'u',
  r = 'r',
  f = 'f',
  fr = 'fr',
  rf = 'rf',
  rb = 'rb',
  br = 'br'
}

export enum EUnaryExpressionOperator {
  '+' = '+',
  '-' = '-',
  'not' = 'not',
  '~' = '~'
}

export enum EBinaryExpressionOperator {
  '+' = '+',
  '-' = '-',
  '*' = '*',
  '/' = '/',
  '%' = '%',
  '//' = '//',
  '**' = '**',
  '==' = '==',
  '!=' = '!=',
  '>=' = '>=',
  '<=' = '<=',
  '^=' = '^=',
  '@=' = '@=',
  ':=' = ':=',
  '<' = '<',
  '<<' = '<<',
  '>' = '>',
  '>>' = '>>',
  '|' = '|',
  '&' = '&',
  '^' = '^',
  '@' = '@'
}

export enum EAssignmentExpressionOperator {
  '=' = '=',
  '+=' = '+=',
  '-=' = '-=',
  '*=' = '*=',
  '/=' = '/=',
  '%=' = '%=',
  '|=' = '|=',
  '&=' = '&=',
  '@=' = '@=',
  '**=' = '**=',
  '//=' = '//=',
  '<<=' = '<<=',
  '>>=' = '>>='
}

export type TStringTokenExtra = {
  prefix?: EStringTokenPrefix
  multipleLines?: boolean
}

export type TTokenExtraMap = {
  [ETokenType.string]: TStringTokenExtra
}

export type TTokenExtra<T extends keyof TTokenExtraMap = keyof TTokenExtraMap> = TTokenExtraMap[T]

/** 定位信息 */
export type TPositionInfo = {
  line: number
  column: number
}

export type TLoc = {
  start: TPositionInfo
  end: TPositionInfo
}

export type TToken<T extends ETokenType = ETokenType, V extends string = string> = {
  type: T
  value: V
  loc: TLoc
  extra?: T extends keyof TTokenExtraMap ? TTokenExtraMap[T] : never
}

export enum ENodeType {
  // 特殊类型 只能在某些类型里使用 不能单独使用
  /** 参数列表 */
  Arguments = 'Arguments',
  /** 参数 */
  Argument = 'Argument',
  /** 关键字 */
  Keyword = 'Keyword',
  /** Except语句 TryStatement except: */
  ExceptHandler = 'ExceptHandler',
  /** 别名表达式 ImportStatement A as B */
  AliasExpression = 'AliasExpression',
  /** 数组切割表达式 1: 1:1:1 */
  SliceExpression = 'SliceExpression',
  /** 解析 for a in 1*/
  Comprehension = 'Comprehension',
  /** 模版字符串的值 */
  TemplateValue = 'TemplateValue',
  /** With语句项 with a,b: 1 */
  WithItem = 'WithItem',

  //基础表达式
  /** None */
  NoneLiteral = 'NoneLiteral',
  /** 布尔 True */
  BooleanLiteral = 'BooleanLiteral',
  /** 数字 1 */
  NumberLiteral = 'NumberLiteral',
  /** 字符串 'a' */
  StringLiteral = 'StringLiteral',
  /** 模版字符串 '{a}a' */
  TemplateLiteral = 'TemplateLiteral',
  /** 标识符 a */
  Identifier = 'Identifier',
  /** Ellipsis ... */
  Ellipsis = 'Ellipsis',

  // 表达式
  /** 一元表达式 -1 +1 not 1 */
  UnaryExpression = 'UnaryExpression',
  /** if表达式 1 if true else 2 */
  IfExpression = 'IfExpression',
  /** 元组表达式 1,2 (1,2) */
  TupleExpression = 'TupleExpression',
  /** 数组表达式 [1,2] */
  ArrayExpression = 'ArrayExpression',
  /** 数组解析表达式 [1 for 2 in 3] */
  ArrayComprehensionExpression = 'ArrayComprehensionExpression',
  /** 字典表达式 {a:1} */
  DictionaryExpression = 'DictionaryExpression',
  /** 字典解析表达式 {a: 1 for a in 2} */
  DictionaryComprehensionExpression = 'DictionaryComprehensionExpression',
  /** 运算表达式 a + b   a == b  a > b */
  BinaryExpression = 'BinaryExpression',
  /** 赋值表达式 a = 1   a = b = 1 */
  AssignmentExpression = 'AssignmentExpression',
  /** 类型定义赋值表达式 a: 1 = 1    a: 1 */
  AnnAssignmentExpression = 'AnnAssignmentExpression',
  /** 对象引用表达式 a.b  */
  MemberExpression = 'MemberExpression',
  /** 下标表达式 a["b"] a[1:] */
  SubscriptExpression = 'SubscriptExpression',
  /** 函数调用表达式 a() */
  CallExpression = 'CallExpression',
  /** 比较表达式 a in b */
  CompareExpression = 'CompareExpression',
  /** 逻辑表达式 a and b */
  LogicalExpression = 'LogicalExpression',
  /** set表达式 {a, b, c} */
  SetExpression = 'SetExpression',
  /** set解析表达式 */
  SetComprehensionExpression = 'SetComprehensionExpression',
  /** lambda表达式 lambda a : a + 1 */
  LambdaExpression = 'LambdaExpression',
  /** yield表达式 */
  YieldExpression = 'YieldExpression',
  /** yield from 表达式 */
  YieldFromExpression = 'YieldFromExpression',
  /** a(*b) or class a(*b) 的*b */
  StarredExpression = 'StarredExpression',
  /** 生成器表达式 必须要有bracket环境 (1 for a in 2) */
  GeneratorExpression = 'GeneratorExpression',
  /** Await表达式 必须要有asyncFunction环境 */
  AwaitExpression = 'AwaitExpression',
  /** 命名表达式 (a := 1) */
  NamedExpression = 'NamedExpression',

  // 语句
  /** 导入语句 */
  ImportStatement = 'ImportStatement',
  /** 导入来自语句 */
  ImportFromStatement = 'ImportFromStatement',
  /** 函数定义 def a(): 1 */
  FunctionDeclaration = 'FunctionDeclaration',
  /** 类定义 class a: 1 */
  ClassDeclaration = 'ClassDeclaration',
  /** 块语句 */
  BlockStatement = 'BlockStatement',
  /** 空语句 pass */
  EmptyStatement = 'EmptyStatement',
  /** if语句 if true: 1 */
  IfStatement = 'IfStatement',
  /** try语句 */
  TryStatement = 'TryStatement',
  /** AST根节点 */
  Program = 'Program',
  /** for 语句 */
  ForStatement = 'ForStatement',
  /** 变量声明语句 global a,b */
  VariableDeclaration = 'VariableDeclaration',
  /** 返回语句 return 1*/
  ReturnStatement = 'ReturnStatement',
  /** while语句 */
  WhileStatement = 'WhileStatement',
  /** continue语句 */
  ContinueStatement = 'ContinueStatement',
  /** with语句 */
  WithStatement = 'WithStatement',
  /** break语句 */
  BreakStatement = 'BreakStatement',
  /** del语句 */
  DeleteStatement = 'DeleteStatement',
  /** raise语句 */
  RaiseStatement = 'RaiseStatement',
  /** assert语句 */
  AssertStatement = 'AssertStatement'
}

/** 特殊的节点映射表 */
export type TSpecialNodeMap = {
  [ENodeType.Arguments]: IArguments
  [ENodeType.Argument]: IArgument
  [ENodeType.Keyword]: IKeyword
  [ENodeType.ExceptHandler]: IExceptHandler
  [ENodeType.SliceExpression]: ISliceExpression
  [ENodeType.AliasExpression]: IAliasExpression
  [ENodeType.Comprehension]: IComprehension
  [ENodeType.TemplateValue]: ITemplateValue
  [ENodeType.WithItem]: IWithItem
}

export type TSpecialNode<T extends keyof TSpecialNodeMap = keyof TSpecialNodeMap> = TSpecialNodeMap[T]

/** 基础表达式节点映射表 */
export type TBasicExpressionNodeMap = {
  [ENodeType.NoneLiteral]: INoneLiteral
  [ENodeType.BooleanLiteral]: IBooleanLiteral
  [ENodeType.NumberLiteral]: INumberLiteral
  [ENodeType.StringLiteral]: IStringLiteral
  [ENodeType.TemplateLiteral]: ITemplateLiteral
  [ENodeType.Identifier]: IIdentifier
  [ENodeType.Ellipsis]: IEllipsis
}

export type TBasicExpressionNode<T extends keyof TBasicExpressionNodeMap = keyof TBasicExpressionNodeMap> =
  TBasicExpressionNodeMap[T]

/** 表达式节点映射表 */
export type TExpressionNodeMap = {
  [ENodeType.UnaryExpression]: IUnaryExpression
  [ENodeType.ArrayExpression]: IArrayExpression
  [ENodeType.ArrayComprehensionExpression]: IArrayComprehensionExpression
  [ENodeType.DictionaryExpression]: IDictionaryExpression
  [ENodeType.DictionaryComprehensionExpression]: IDictionaryComprehensionExpression
  [ENodeType.BinaryExpression]: IBinaryExpression
  [ENodeType.AssignmentExpression]: IAssignmentExpression
  [ENodeType.AnnAssignmentExpression]: IAnnAssignmentExpression
  [ENodeType.MemberExpression]: IMemberExpression
  [ENodeType.SubscriptExpression]: ISubscriptExpression
  [ENodeType.CallExpression]: ICallExpression
  [ENodeType.TupleExpression]: ITupleExpression
  [ENodeType.CompareExpression]: ICompareExpression
  [ENodeType.IfExpression]: IIfExpression
  [ENodeType.LogicalExpression]: ILogicalExpression
  [ENodeType.SetExpression]: ISetExpression
  [ENodeType.SetComprehensionExpression]: ISetComprehensionExpression
  [ENodeType.LambdaExpression]: ILambdaExpression
  [ENodeType.YieldExpression]: IYieldExpression
  [ENodeType.YieldFromExpression]: IYieldFromExpression
  [ENodeType.StarredExpression]: IStarredExpression
  [ENodeType.GeneratorExpression]: IGeneratorExpression
  [ENodeType.AwaitExpression]: IAwaitExpression
  [ENodeType.NamedExpression]: INamedExpression
} & TBasicExpressionNodeMap

export type TExpressionNode<T extends keyof TExpressionNodeMap = keyof TExpressionNodeMap> = TExpressionNodeMap[T]

/** 可类型定义赋值的表达式 */
export type TAnnAssignableExpressionNode = IIdentifier | IMemberExpression | ISubscriptExpression

/** 可赋值的表达式 */
export type TAssignableExpressionNode =
  | TAnnAssignableExpressionNode
  | IStarredExpression
  | IArrayExpression
  | ITupleExpression

export type TBigBracketExpressionNode =
  | ISetExpression
  | ISetComprehensionExpression
  | IDictionaryExpression
  | IDictionaryComprehensionExpression

/** 装饰的表达式 */
export type TDecorativeExpressionNode = IIdentifier | IMemberExpression | ICallExpression

/** 语句节点映射表 */
export type TStatementNodeMap = {
  [ENodeType.ImportStatement]: IImportStatement
  [ENodeType.ImportFromStatement]: IImportFromStatement
  [ENodeType.FunctionDeclaration]: IFunctionDeclaration
  [ENodeType.ClassDeclaration]: IClassDeclaration
  [ENodeType.BlockStatement]: IBlockStatement
  [ENodeType.EmptyStatement]: IEmptyStatement
  [ENodeType.IfStatement]: IIfStatement
  [ENodeType.TryStatement]: ITryStatement
  [ENodeType.Program]: IProgram
  [ENodeType.ForStatement]: IForStatement
  [ENodeType.VariableDeclaration]: IVariableDeclaration
  [ENodeType.ReturnStatement]: IReturnStatement
  [ENodeType.WhileStatement]: IWhileStatement
  [ENodeType.ContinueStatement]: IContinueStatement
  [ENodeType.WithStatement]: IWithStatement
  [ENodeType.BreakStatement]: IBreakStatement
  [ENodeType.DeleteStatement]: IDeleteStatement
  [ENodeType.RaiseStatement]: IRaiseStatement
  [ENodeType.AssertStatement]: IAssertStatement
}

export type TStatementNode<T extends keyof TStatementNodeMap = keyof TStatementNodeMap> = TStatementNodeMap[T]

/** 所有节点的映射表 */
export type TNodeMap = TSpecialNodeMap & TExpressionNodeMap & TStatementNodeMap

export type TNode<T extends ENodeType = ENodeType> = TNodeMap[T]

export interface IBaseNodeAttr {
  /** 额外的信息 */
  extra?: {
    /** 是否被小括号包裹 */
    parenthesized?: boolean
    /** 小括号的开始定位信息 */
    parentLoc?: TLoc
  }
  /** 定位信息 */
  loc?: TLoc
}

// 特殊节点定义
export interface IArguments extends IBaseNodeAttr {
  type: ENodeType.Arguments
  /** / 前的参数 */
  posArgs: IArgument[]
  /** 参数名 */
  args: IArgument[]
  /** 参数名的默认值 */
  defaults: TExpressionNode[]
  /** *a参数名 */
  varArg: IArgument
  /** *a参数后的参数名 */
  keywordOnlyArgs: IArgument[]
  /** *a参数后的参数默认值 */
  keywordDefaults: TExpressionNode[]
  /** **a参数名 */
  keywordArg: IArgument
}

export interface IArgument extends IBaseNodeAttr {
  type: ENodeType.Argument
  name: string
  annotation?: TExpressionNode
}

export interface IKeyword extends IBaseNodeAttr {
  type: ENodeType.Keyword
  name: string
  value: TExpressionNode
}

export interface IStarredExpression extends IBaseNodeAttr {
  type: ENodeType.StarredExpression
  value: TExpressionNode
}

export interface IGeneratorExpression extends IBaseNodeAttr {
  type: ENodeType.GeneratorExpression
  element: TExpressionNode
  generators: IComprehension[]
}

export interface IAwaitExpression extends IBaseNodeAttr {
  type: ENodeType.AwaitExpression
  value: TExpressionNode
}

export interface INamedExpression extends IBaseNodeAttr {
  type: ENodeType.NamedExpression
  target: IIdentifier
  value: TExpressionNode
}

export interface IExceptHandler extends IBaseNodeAttr {
  type: ENodeType.ExceptHandler
  errName?: TExpressionNode
  name?: IIdentifier
  body: IBlockStatement
}

export interface ISliceExpression extends IBaseNodeAttr {
  type: ENodeType.SliceExpression
  lower: TExpressionNode
  upper: TExpressionNode
  step: TExpressionNode
}

export interface IWithItem extends IBaseNodeAttr {
  type: ENodeType.SliceExpression
  expression: TExpressionNode
  optionalVars?: TAssignableExpressionNode
}

// 表达式节点定义
export interface INoneLiteral extends IBaseNodeAttr {
  type: ENodeType.NoneLiteral
}

export interface IBooleanLiteral extends IBaseNodeAttr {
  type: ENodeType.BooleanLiteral
  value: boolean
}

export interface INumberLiteral extends IBaseNodeAttr {
  type: ENodeType.NumberLiteral
  value: number
  raw: string
}

export interface IStringLiteral extends IBaseNodeAttr {
  type: ENodeType.StringLiteral
  value: string
  raw: string
  prefix?: Omit<EStringTokenPrefix, 'f' | 'fr' | 'rf'>
}

export interface ITemplateLiteral extends IBaseNodeAttr {
  type: ENodeType.TemplateLiteral
  expressions: (IStringLiteral | ITemplateValue)[]
}

export interface IIdentifier extends IBaseNodeAttr {
  type: ENodeType.Identifier
  name: string
}

export interface IEllipsis extends IBaseNodeAttr {
  type: ENodeType.Ellipsis
}

export interface IUnaryExpression extends IBaseNodeAttr {
  type: ENodeType.UnaryExpression
  operator: EUnaryExpressionOperator
  argument: TExpressionNode
}
export interface IIfExpression extends IBaseNodeAttr {
  type: ENodeType.IfExpression
  test: TExpressionNode
  body: TExpressionNode
  alternate: TExpressionNode
}

export interface ILogicalExpression extends IBaseNodeAttr {
  type: ENodeType.LogicalExpression
  operator: 'and' | 'or'
  left: TExpressionNode
  right: TExpressionNode
}

export interface ISetExpression extends IBaseNodeAttr {
  type: ENodeType.SetExpression
  elements: TExpressionNode[]
}

export interface ISetComprehensionExpression extends IBaseNodeAttr {
  type: ENodeType.SetComprehensionExpression
  element: TExpressionNode
  generators: IComprehension[]
}

export interface ILambdaExpression extends IBaseNodeAttr {
  type: ENodeType.LambdaExpression
  args: IArguments
  body: TExpressionNode
}

export interface IYieldExpression extends IBaseNodeAttr {
  type: ENodeType.YieldExpression
  value?: TExpressionNode
}

export interface IYieldFromExpression extends IBaseNodeAttr {
  type: ENodeType.YieldFromExpression
  value: TExpressionNode
}

export interface ITupleExpression extends IBaseNodeAttr {
  type: ENodeType.TupleExpression
  elements: TExpressionNode[]
}

export interface IArrayExpression extends IBaseNodeAttr {
  type: ENodeType.ArrayExpression
  elements: TExpressionNode[]
}

export interface IArrayComprehensionExpression extends IBaseNodeAttr {
  type: ENodeType.ArrayComprehensionExpression
  element: TExpressionNode
  generators: IComprehension[]
}
export interface IDictionaryExpression extends IBaseNodeAttr {
  type: ENodeType.DictionaryExpression
  keys: TExpressionNode[]
  values: TExpressionNode[]
}

export interface IDictionaryComprehensionExpression extends IBaseNodeAttr {
  type: ENodeType.DictionaryComprehensionExpression
  key: TExpressionNode
  value: TExpressionNode
  generators: IComprehension[]
}

export interface IBinaryExpression extends IBaseNodeAttr {
  type: ENodeType.BinaryExpression
  operator: EBinaryExpressionOperator
  left: TExpressionNode
  right: TExpressionNode
}

export interface IAssignmentExpression extends IBaseNodeAttr {
  type: ENodeType.AssignmentExpression
  targets: TAssignableExpressionNode[]
  operator: EAssignmentExpressionOperator
  value: TExpressionNode
}

export interface IAnnAssignmentExpression extends IBaseNodeAttr {
  type: ENodeType.AnnAssignmentExpression
  annotation: TExpressionNode
  target: TAssignableExpressionNode
  value: TExpressionNode
}

export interface IAliasExpression extends IBaseNodeAttr {
  type: ENodeType.AliasExpression
  name: string
  asname?: string
}

export interface IComprehension extends IBaseNodeAttr {
  type: ENodeType.Comprehension
  isAsync: boolean
  ifs: TExpressionNode[]
  iterable: TExpressionNode
  target: TAssignableExpressionNode
}

export interface ITemplateValue extends IBaseNodeAttr {
  type: ENodeType.TemplateValue
  value: TExpressionNode
}

export interface IMemberExpression extends IBaseNodeAttr {
  type: ENodeType.MemberExpression
  object: TExpressionNode
  property: IIdentifier
}

export interface ISubscriptExpression extends IBaseNodeAttr {
  type: ENodeType.SubscriptExpression
  object: TExpressionNode
  subscript: (TExpressionNode | ISliceExpression)[]
}

export interface ICallExpression extends IBaseNodeAttr {
  type: ENodeType.CallExpression
  callee: TExpressionNode
  args: TExpressionNode[]
  keywords: IKeyword[]
}

export interface ICompareExpression extends IBaseNodeAttr {
  type: ENodeType.CompareExpression
  left: TExpressionNode
  operator: 'is' | 'in' | 'not in'
  right: TExpressionNode
}

// 语句节点定义
export interface IImportStatement extends IBaseNodeAttr {
  type: ENodeType.ImportStatement
  names: IAliasExpression[]
}

export interface IImportFromStatement extends IBaseNodeAttr {
  type: ENodeType.ImportFromStatement
  names: IAliasExpression[]
  level: number
  module?: string
}

export interface IFunctionDeclaration extends IBaseNodeAttr {
  type: ENodeType.FunctionDeclaration
  name: string
  args: IArguments
  body: IBlockStatement
  returnType?: TExpressionNode
  decorators?: TDecorativeExpressionNode[]
}

export interface IClassDeclaration extends IBaseNodeAttr {
  type: ENodeType.ClassDeclaration
  name: string
  bases: TExpressionNode[]
  keywords: IKeyword[]
  body: IBlockStatement
  decorators?: TDecorativeExpressionNode[]
}

export interface IBlockStatement extends IBaseNodeAttr {
  type: ENodeType.BlockStatement
  body: (TExpressionNode | TStatementNode)[]
}

export interface IEmptyStatement extends IBaseNodeAttr {
  type: ENodeType.EmptyStatement
}

export interface IIfStatement extends IBaseNodeAttr {
  type: ENodeType.IfStatement
  test: TExpressionNode
  body: IBlockStatement
  alternate?: IBlockStatement | IIfStatement
}

export interface ITryStatement extends IBaseNodeAttr {
  type: ENodeType.TryStatement
  body: IBlockStatement
  handlers?: IExceptHandler[]
  elseBody: IBlockStatement
  finalBody: IBlockStatement
}

export interface IProgram extends IBaseNodeAttr {
  type: ENodeType.Program
  body: TNode[]
}

export interface IForStatement extends IBaseNodeAttr {
  type: ENodeType.ForStatement
  target: TAssignableExpressionNode
  iterable: TExpressionNode
  body: IBlockStatement
}

export interface IVariableDeclaration extends IBaseNodeAttr {
  type: ENodeType.VariableDeclaration
  kind: string
  declarations: IIdentifier[]
}

export interface IReturnStatement extends IBaseNodeAttr {
  type: ENodeType.ReturnStatement
  argument?: TExpressionNode
}

export interface IWhileStatement extends IBaseNodeAttr {
  type: ENodeType.WhileStatement
  test: TExpressionNode
  body: IBlockStatement
}

export interface IContinueStatement extends IBaseNodeAttr {
  type: ENodeType.ContinueStatement
}

export interface IWithStatement extends IBaseNodeAttr {
  type: ENodeType.WithStatement
  withItems: IWithItem[]
  body: IBlockStatement
}

export interface IBreakStatement extends IBaseNodeAttr {
  type: ENodeType.BreakStatement
}

export interface IDeleteStatement extends IBaseNodeAttr {
  type: ENodeType.DeleteStatement
  targets: Omit<TExpressionNode, ENodeType.AssignmentExpression | ENodeType.IfExpression>[]
}

export interface IRaiseStatement extends IBaseNodeAttr {
  type: ENodeType.RaiseStatement
  target: TExpressionNode
}

export interface IAssertStatement extends IBaseNodeAttr {
  type: ENodeType.AssertStatement
  msg?: TExpressionNode
  test: TExpressionNode
}
