import { ENodeType, TExpressionNodeMap, TStatementNodeMap, TTokenExtraConfigMap } from './types'

export const PYTHON = {
  INDENT: '  ',
  LINE_BREAK: '\n',
  PASS: 'pass',
  COMMENT: '#',
  /** python关键字列表 */
  KEYWORDS: [
    'False',
    'None',
    'True',
    'and',
    'as',
    'assert',
    'break',
    'class',
    'continue',
    'def',
    'del',
    'elif',
    'else',
    'except',
    'finally',
    'for',
    'from',
    'global',
    'if',
    'import',
    'in',
    'is',
    'lambda',
    'nonlocal',
    'not',
    'or',
    'pass',
    'raise',
    'return',
    'try',
    'while',
    'with',
    'yield'
  ]
}

export const tokenExtraConfig: TTokenExtraConfigMap = {
  '.': {
    beforeExpression: true,
    afterExpression: true
  },
  '[': {
    beforeExpression: true
  },
  and: {
    beforeExpression: true,
    afterExpression: true
  },
  or: {
    beforeExpression: true,
    afterExpression: true
  },
  if: {
    beforeExpression: true,
    afterExpression: true
  },
  else: {
    beforeExpression: true,
    afterExpression: true
  },
  '+': {
    beforeExpression: true,
    afterExpression: true
  },
  '-': {
    beforeExpression: true,
    afterExpression: true
  },
  '*': {
    beforeExpression: true,
    afterExpression: true
  },
  '/': {
    beforeExpression: true,
    afterExpression: true
  },
  '%': {
    beforeExpression: true,
    afterExpression: true
  },
  '//': {
    beforeExpression: true,
    afterExpression: true
  },
  '**': {
    beforeExpression: true,
    afterExpression: true
  },
  '==': {
    beforeExpression: true,
    afterExpression: true
  },
  '!=': {
    beforeExpression: true,
    afterExpression: true
  },
  '>=': {
    beforeExpression: true,
    afterExpression: true
  },
  '<=': {
    beforeExpression: true,
    afterExpression: true
  },
  '<': {
    beforeExpression: true,
    afterExpression: true
  },
  '>': {
    beforeExpression: true,
    afterExpression: true
  },
  not: {
    beforeExpression: true,
    afterExpression: true
  },
  in: {
    beforeExpression: true,
    afterExpression: true
  },
  ',': {
    beforeExpression: true
  },
  '=': {
    afterExpression: true
  },
  '+=': {
    afterExpression: true
  },
  '-=': {
    afterExpression: true
  },
  '*=': {
    afterExpression: true
  },
  '/=': {
    afterExpression: true
  },
  '%=': {
    afterExpression: true
  },
  '**=': {
    afterExpression: true
  },
  '//=': {
    afterExpression: true
  }
}

export const expressionNodeTypes: (keyof TExpressionNodeMap)[] = [
  ENodeType.NoneLiteral,
  ENodeType.BooleanLiteral,
  ENodeType.NumberLiteral,
  ENodeType.StringLiteral,
  ENodeType.TemplateLiteral,
  ENodeType.Identifier,
  ENodeType.UnaryExpression,
  ENodeType.IfExpression,
  ENodeType.ArrayExpression,
  ENodeType.DictionaryExpression,
  ENodeType.BinaryExpression,
  ENodeType.AssignmentExpression,
  ENodeType.MemberExpression,
  ENodeType.SubscriptExpression,
  ENodeType.CallExpression,
  ENodeType.TupleExpression,
  ENodeType.CompareExpression,
  ENodeType.LogicalExpression
]

export const statementNodeTypes: (keyof TStatementNodeMap)[] = [
  ENodeType.VariableDeclaration,
  ENodeType.ImportStatement,
  ENodeType.FunctionDeclaration,
  ENodeType.ClassDeclaration,
  ENodeType.BlockStatement,
  ENodeType.EmptyStatement,
  ENodeType.IfStatement,
  ENodeType.Program
]
