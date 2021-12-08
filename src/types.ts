import { MemberExpression } from '@babel/types'
import SubscriptExpression from './AstGenerator/expression/SubscriptExpression'

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

export type TStringTokenExtra = {
  prefix?: 'u' | 'r' | 'f'
  tokensFragment?: TToken[][]
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

export type TTokenExtraConfig = {
  /** 前置表达式 */
  beforeExpression?: boolean
  /** 后置表达式 */
  afterExpression?: boolean
}

export type TTokenExtraConfigMap = {
  [tokenValue: string]: TTokenExtraConfig
}

export const enum ENodeType {
  // 特殊类型 只能在某些类型里使用 不能单独使用
  /** 字典属性 DictionaryExpression内使用 a:1 */
  DictionaryProperty = 'DictionaryProperty',
  /** 参数赋值 CallExpression FunctionDeclaration ClassDeclaration a=1 */
  AssignmentParam = 'AssignmentParam',
  /** 元组参数 FunctionDeclaration ClassDeclaration *a */
  TupleParam = 'TupleParam',
  /** 字典参数 FunctionDeclaration ClassDeclaration **a */
  DictionaryParam = 'DictionaryParam',
  /** Except语句 TryStatement except: */
  ExceptHandler = 'ExceptHandler',
  /** 别名表达式 ImportStatement A as B */
  AliasExpression = 'AliasExpression',
  /** 数组切割表达式 1: 1:1:1 */
  SliceExpression = 'SliceExpression',

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

  // 表达式
  /** 一元表达式 -1 +1 not 1 */
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
  /** 赋值表达式 a = 1 */
  AssignmentExpression = 'AssignmentExpression',
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
  DeleteStatement = 'DeleteStatement'
}

/** 特殊的节点映射表 */
export type TSpecialNodeMap = {
  [ENodeType.DictionaryProperty]: IDictionaryProperty
  [ENodeType.AssignmentParam]: IAssignmentParam
  [ENodeType.TupleParam]: ITupleParam
  [ENodeType.DictionaryParam]: IDictionaryParam
  [ENodeType.ExceptHandler]: IExceptHandler
  [ENodeType.SliceExpression]: ISliceExpression
  [ENodeType.AliasExpression]: IAliasExpression
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
}

export type TBasicExpressionNode<T extends keyof TBasicExpressionNodeMap = keyof TBasicExpressionNodeMap> =
  TBasicExpressionNodeMap[T]

/** 表达式节点映射表 */
export type TExpressionNodeMap = {
  [ENodeType.UnaryExpression]: IUnaryExpression
  [ENodeType.ArrayExpression]: IArrayExpression
  [ENodeType.DictionaryExpression]: IDictionaryExpression
  [ENodeType.BinaryExpression]: IBinaryExpression
  [ENodeType.AssignmentExpression]: IAssignmentExpression
  [ENodeType.MemberExpression]: IMemberExpression
  [ENodeType.SubscriptExpression]: ISubscriptExpression
  [ENodeType.CallExpression]: ICallExpression
  [ENodeType.TupleExpression]: ITupleExpression
  [ENodeType.CompareExpression]: ICompareExpression
  [ENodeType.IfExpression]: IIfExpression
  [ENodeType.LogicalExpression]: ILogicalExpression
} & TBasicExpressionNodeMap

export type TExpressionNode<T extends keyof TExpressionNodeMap = keyof TExpressionNodeMap> = TExpressionNodeMap[T]

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
}

export type TStatementNode<T extends keyof TStatementNodeMap = keyof TStatementNodeMap> = TStatementNodeMap[T]

/** 所有节点的映射表 */
export type TNodeMap = TSpecialNodeMap & TExpressionNodeMap & TStatementNodeMap

export type TNode<T extends ENodeType = ENodeType> = TNodeMap[T]

export interface TBaseNodeAttr {
  /** 额外的信息 */
  extra?: {
    /** 是否被小括号包裹 */
    parenthesized?: boolean
    /** 小括号的开始定位信息 */
    parentStart?: TPositionInfo
  }
  /** 定位信息 */
  loc?: TLoc
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

export interface ITupleParam extends TBaseNodeAttr {
  type: ENodeType.TupleParam
  name: IIdentifier
}

export interface IDictionaryParam extends TBaseNodeAttr {
  type: ENodeType.DictionaryParam
  name: IIdentifier
}

export interface IExceptHandler extends TBaseNodeAttr {
  type: ENodeType.ExceptHandler
  errName?: TExpressionNode
  name?: IIdentifier
  body: IBlockStatement
}

export interface ISliceExpression extends TBaseNodeAttr {
  type: ENodeType.SliceExpression
  lower: TExpressionNode
  upper: TExpressionNode
  step: TExpressionNode
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
  prefix?: 'u' | 'r'
}

export interface ITemplateLiteral extends TBaseNodeAttr {
  type: ENodeType.TemplateLiteral
  expressions: TExpressionNode[]
}

export interface IIdentifier extends TBaseNodeAttr {
  type: ENodeType.Identifier
  name: string
}

export interface IUnaryExpression extends TBaseNodeAttr {
  type: ENodeType.UnaryExpression
  operator: '-' | '+' | 'not'
  argument: TExpressionNode
}
export interface IIfExpression extends TBaseNodeAttr {
  type: ENodeType.IfExpression
  test: TExpressionNode
  body: TExpressionNode
  alternate: TExpressionNode
}

export interface ILogicalExpression extends TBaseNodeAttr {
  type: ENodeType.LogicalExpression
  operator: 'and' | 'or'
  left: TExpressionNode
  right: TExpressionNode
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
  operator: '+' | '-' | '*' | '/' | '%' | '//' | '**' | '==' | '!=' | '>=' | '<=' | '<' | '>'
  left: TExpressionNode
  right: TExpressionNode
}

export interface IAssignmentExpression extends TBaseNodeAttr {
  type: ENodeType.AssignmentExpression
  targets: (IIdentifier | IMemberExpression | ISubscriptExpression | ITupleExpression | IArrayExpression)[]
  operator: '=' | '+=' | '-=' | '*=' | '/=' | '%=' | '**=' | '//='
  value: TExpressionNode
}

export interface IAliasExpression extends TBaseNodeAttr {
  type: ENodeType.AliasExpression
  name: string
  asname?: string
}

export interface IMemberExpression extends TBaseNodeAttr {
  type: ENodeType.MemberExpression
  object: TExpressionNode
  property: IIdentifier
}

export interface ISubscriptExpression extends TBaseNodeAttr {
  type: ENodeType.SubscriptExpression
  object: TExpressionNode
  subscript: (TExpressionNode | ISliceExpression)[]
}

export interface ICallExpression extends TBaseNodeAttr {
  type: ENodeType.CallExpression
  callee: TExpressionNode
  params: TExpressionNode[]
  keywords: IAssignmentParam[]
}

export interface IImportStatement extends TBaseNodeAttr {
  type: ENodeType.ImportStatement
  names: IAliasExpression[]
}

export interface IImportFromStatement extends TBaseNodeAttr {
  type: ENodeType.ImportFromStatement
  names: IAliasExpression[]
  level: number
  module: IIdentifier | IMemberExpression
}

export interface ICompareExpression extends TBaseNodeAttr {
  type: ENodeType.CompareExpression
  left: TExpressionNode
  operator: 'in' | 'not in'
  right: TExpressionNode
}

// 语句节点定义
export interface IFunctionDeclaration extends TBaseNodeAttr {
  type: ENodeType.FunctionDeclaration
  id: IIdentifier
  params: (IIdentifier | IAssignmentParam | ITupleParam | IDictionaryParam)[]
  body: IBlockStatement
}

export interface IClassDeclaration extends TBaseNodeAttr {
  type: ENodeType.ClassDeclaration
  id: IIdentifier
  params: (IIdentifier | IAssignmentParam | ITupleParam | IDictionaryParam)[]
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
  elseBody: IBlockStatement
  finalBody: IBlockStatement
}

export interface IProgram extends TBaseNodeAttr {
  type: ENodeType.Program
  body: TNode[]
}

export interface IForStatement extends TBaseNodeAttr {
  type: ENodeType.ForStatement
  left: TExpressionNode
  right: TExpressionNode
  body: IBlockStatement
}

export interface IVariableDeclaration extends TBaseNodeAttr {
  type: ENodeType.VariableDeclaration
  kind: string
  declarations: IIdentifier[]
}

export interface IReturnStatement extends TBaseNodeAttr {
  type: ENodeType.ReturnStatement
  argument: TExpressionNode
}

export interface IWhileStatement extends TBaseNodeAttr {
  type: ENodeType.WhileStatement
  test: TExpressionNode
  body: IBlockStatement
}

export interface IContinueStatement extends TBaseNodeAttr {
  type: ENodeType.ContinueStatement
}

export interface IWithStatement extends TBaseNodeAttr {
  left: Omit<TExpressionNode, ENodeType.AssignmentExpression>[]
  right: (IIdentifier | MemberExpression | SubscriptExpression | IArrayExpression)[]
  body: IBlockStatement
}

export interface IBreakStatement extends TBaseNodeAttr {
  type: ENodeType.BreakStatement
}

export interface IDeleteStatement extends TBaseNodeAttr {
  type: ENodeType.DeleteStatement
  targets: Omit<TExpressionNode, ENodeType.AssignmentExpression | ENodeType.IfExpression>[]
}
