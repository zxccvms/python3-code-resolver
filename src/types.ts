export enum ETokenType {
  /** 关键字 def global pass */
  keyword = 'keyword',
  /** 标识符 a b c */
  identifier = 'identifier',
  /** 字符串 '1' '2' '3' */
  string = 'string',
  /** 数字 1 2 3 */
  number = 'number',
  /** 运算符 + - * / % ** // < > = <= >= != == += -= *= /= %= **= //= */
  operator = 'operator',
  /** 括号 () [] {} */
  bracket = 'bracket',
  /** 标点符号 . , : */
  punctuation = 'punctuation'
}

/** 定位信息 */
export type TPositionInfo = {
  line: number
  column: number
}

export type TTokenItem<T extends ETokenType = ETokenType, V extends string = string> = {
  type: T
  value: V
  loc: {
    start: TPositionInfo
    end: TPositionInfo
  }
}

export const enum ENodeType {
  // 特殊类型 只能在某些类型里使用 不能单独使用
  /** 字典属性 DictionaryExpression内使用 a:1 */
  DictionaryProperty = 'DictionaryProperty',
  /** 参数赋值 CallExpression ClassDeclaration a=1 */
  AssignmentParam = 'AssignmentParam',
  /** Except语句 TryStatement except: */
  ExceptHandler = 'ExceptHandler',

  //表达式
  NoneLiteral = 'NoneLiteral',
  /** 布尔 True */
  BooleanLiteral = 'BooleanLiteral',
  /** 数字 1 */
  NumberLiteral = 'NumberLiteral',
  /** 字符串 'a' */
  StringLiteral = 'StringLiteral',
  /** 标识符 a */
  Identifier = 'Identifier',
  /** 一元表达式 -1 +1 */
  UnaryExpression = 'UnaryExpression',
  /** if表达式 1 if true else 2 */
  IfExpression = 'IfExpression',
  /** 元组表达式 1,2 (1,2) */
  TupleExpression = 'TupleExpression',
  /** 数组表达式 [1,2] */
  ArrayExpression = 'ArrayExpression',
  /** 字典表达式 {a:1} */
  DictionaryExpression = 'DictionaryExpression',
  /** 运算表达式 a + b   a == b  a > b */
  BinaryExpression = 'BinaryExpression',
  /** 变量声明表达式 global a,b */
  VariableDeclaration = 'VariableDeclaration',
  /** 赋值表达式 a = 1 */
  AssignmentExpression = 'AssignmentExpression',
  /** 数组切割表达式 1: 1:1:1 */
  SliceExpression = 'SliceExpression',
  /** 对象引用表达式 a.b a["b"] a[1:] */
  MemberExpression = 'MemberExpression',
  /** 函数调用表达式 a() */
  CallExpression = 'CallExpression',

  // 语句
  /** 导入语句 */
  ImportStatement = 'ImportStatement',
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
  ForStatement = 'ForStatement'
}

/** 特殊的节点映射表 */
export type TSpecialNodeMap = {
  [ENodeType.DictionaryProperty]: IDictionaryProperty
  [ENodeType.AssignmentParam]: IAssignmentParam
  [ENodeType.ExceptHandler]: IExceptHandler
  [ENodeType.SliceExpression]: ISliceExpression
}

export type TSpecialNode<T extends keyof TSpecialNodeMap = keyof TSpecialNodeMap> = TSpecialNodeMap[T]

/** 条件表达式节点映射表 */
export type TConditionExpressionNodeMap = {
  [ENodeType.IfExpression]: IIfExpression
}

export type TConditionExpressionNode<T extends keyof TConditionExpressionNodeMap = keyof TConditionExpressionNodeMap> =
  TConditionExpressionNodeMap[T]

/** 表达式节点映射表 */
export type TExpressionNodeMap = {
  [ENodeType.NoneLiteral]: INoneLiteral
  [ENodeType.BooleanLiteral]: IBooleanLiteral
  [ENodeType.NumberLiteral]: INumberLiteral
  [ENodeType.StringLiteral]: IStringLiteral
  [ENodeType.Identifier]: IIdentifier
  [ENodeType.UnaryExpression]: IUnaryExpression
  [ENodeType.ArrayExpression]: IArrayExpression
  [ENodeType.DictionaryExpression]: IDictionaryExpression
  [ENodeType.BinaryExpression]: IBinaryExpression
  [ENodeType.VariableDeclaration]: IVariableDeclaration
  [ENodeType.AssignmentExpression]: IAssignmentExpression
  [ENodeType.MemberExpression]: IMemberExpression
  [ENodeType.CallExpression]: ICallExpression
  [ENodeType.TupleExpression]: ITupleExpression
} & TConditionExpressionNodeMap

export type TExpressionNode<T extends keyof TExpressionNodeMap = keyof TExpressionNodeMap> = TExpressionNodeMap[T]

/** 语句节点映射表 */
export type TStatementNodeMap = {
  [ENodeType.ImportStatement]: IImportStatement
  [ENodeType.FunctionDeclaration]: IFunctionDeclaration
  [ENodeType.ClassDeclaration]: IClassDeclaration
  [ENodeType.BlockStatement]: IBlockStatement
  [ENodeType.EmptyStatement]: IEmptyStatement
  [ENodeType.IfStatement]: IIfStatement
  [ENodeType.TryStatement]: ITryStatement
  [ENodeType.Program]: IProgram
  [ENodeType.ForStatement]: IForStatement
}

export type TStatementNode<T extends keyof TStatementNodeMap = keyof TStatementNodeMap> = TStatementNodeMap[T]

/** 所有节点的映射表 */
export type TNodeMap = TSpecialNodeMap & TExpressionNodeMap & TStatementNodeMap

export type TNode<T extends ENodeType = ENodeType> = TNodeMap[T]

export type TBaseNodeAttr = {
  /** 额外的信息 */
  extra?: {
    /** 是否被小括号包裹 */
    parenthesized?: boolean
    /** 小括号的开始定位信息 */
    parentStart?: TPositionInfo
  }
  /** 定位信息 */
  loc?: {
    start: TPositionInfo
    end: TPositionInfo
  }
}

// 特殊节点定义
export interface IDictionaryProperty extends TBaseNodeAttr {
  type: ENodeType.DictionaryProperty
  key: TExpressionNode
  value: TExpressionNode
}

export interface IAssignmentParam extends TBaseNodeAttr {
  type: ENodeType.AssignmentParam
  name: IIdentifier
  value: TExpressionNode
}

export interface IExceptHandler extends TBaseNodeAttr {
  type: ENodeType.ExceptHandler
  errName?: TExpressionNode
  name?: IIdentifier
  body: IBlockStatement
}

// 表达式节点定义
export interface INoneLiteral extends TBaseNodeAttr {
  type: ENodeType.NoneLiteral
}

export interface IBooleanLiteral extends TBaseNodeAttr {
  type: ENodeType.BooleanLiteral
  value: boolean
}

export interface INumberLiteral extends TBaseNodeAttr {
  type: ENodeType.NumberLiteral
  value: number
  raw: string
}

export interface IStringLiteral extends TBaseNodeAttr {
  type: ENodeType.StringLiteral
  value: string
  raw: string
}

export interface IIdentifier extends TBaseNodeAttr {
  type: ENodeType.Identifier
  name: string
}

export interface IUnaryExpression extends TBaseNodeAttr {
  type: ENodeType.UnaryExpression
  oprator: '-' | '+' | 'not'
  argument: TExpressionNode
}
export interface IIfExpression extends TBaseNodeAttr {
  type: ENodeType.IfExpression
  test: TExpressionNode
  body: TExpressionNode
  alternate: TExpressionNode
}
export interface ITupleExpression extends TBaseNodeAttr {
  type: ENodeType.TupleExpression
  elements: TExpressionNode[]
}

export interface IArrayExpression extends TBaseNodeAttr {
  type: ENodeType.ArrayExpression
  elements: TExpressionNode[]
}
export interface IDictionaryExpression extends TBaseNodeAttr {
  type: ENodeType.DictionaryExpression
  properties: IDictionaryProperty[]
}
export interface IBinaryExpression extends TBaseNodeAttr {
  type: ENodeType.BinaryExpression
  operator: string
  left: TExpressionNode
  right: TExpressionNode
}

export interface IVariableDeclaration extends TBaseNodeAttr {
  type: ENodeType.VariableDeclaration
  kind: string
  declarations: IIdentifier[]
}

export interface IAssignmentExpression extends TBaseNodeAttr {
  type: ENodeType.AssignmentExpression
  targets: (IIdentifier | IMemberExpression | ITupleExpression)[]
  operator: '=' | '+=' | '-=' | '*=' | '/=' | '%=' | '**=' | '//='
  value: TExpressionNode
}

export interface ISliceExpression extends TBaseNodeAttr {
  type: ENodeType.SliceExpression
  lower: TExpressionNode
  upper: TExpressionNode
  step: TExpressionNode
}

export interface IMemberExpression extends TBaseNodeAttr {
  type: ENodeType.MemberExpression
  object: IIdentifier | IStringLiteral | IMemberExpression | ICallExpression
  property: IIdentifier | INumberLiteral | IStringLiteral | ISliceExpression
}

export interface ICallExpression extends TBaseNodeAttr {
  type: ENodeType.CallExpression
  callee: IIdentifier | IMemberExpression | ICallExpression
  params: TExpressionNode[]
  keywords: IAssignmentParam[]
}

export interface IImportStatement extends TBaseNodeAttr {
  type: ENodeType.ImportStatement
  names: IIdentifier[]
  module?: IIdentifier | IMemberExpression
}

// 语句节点定义
export interface IFunctionDeclaration extends TBaseNodeAttr {
  type: ENodeType.FunctionDeclaration
  id: IIdentifier
  params: IIdentifier[]
  defaults: TExpressionNode[]
  body: IBlockStatement
}

export interface IClassDeclaration extends TBaseNodeAttr {
  type: ENodeType.ClassDeclaration
  id: IIdentifier
  bases: IIdentifier[]
  keywords: IAssignmentParam[]
  body: IBlockStatement
}

export interface IBlockStatement extends TBaseNodeAttr {
  type: ENodeType.BlockStatement
  body: (TExpressionNode | TStatementNode)[]
}

export interface IEmptyStatement extends TBaseNodeAttr {
  type: ENodeType.EmptyStatement
}

export interface IIfStatement extends TBaseNodeAttr {
  type: ENodeType.IfStatement
  test: TExpressionNode
  body: IBlockStatement
  alternate?: IBlockStatement | IIfStatement
}

export interface ITryStatement extends TBaseNodeAttr {
  type: ENodeType.TryStatement
  body: IBlockStatement
  handlers?: IExceptHandler[]
  finalBody: IBlockStatement
}

export interface IProgram extends TBaseNodeAttr {
  type: ENodeType.Program
  body: (TExpressionNode | TStatementNode)[]
}

export interface IForStatement extends TBaseNodeAttr {
  type: ENodeType.ForStatement
  left: TExpressionNode
  right: TExpressionNode
  body: IBlockStatement
}
