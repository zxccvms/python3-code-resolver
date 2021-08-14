import { ENodeType, TConditionExpressionNodeMap, TExpressionNodeMap, TStatementNodeMap } from './types'

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

export const conditionExpressionNodeTypes: (keyof TConditionExpressionNodeMap)[] = [ENodeType.IfExpression]

export const expressionNodeTypes: (keyof TExpressionNodeMap)[] = [
  ENodeType.NoneLiteral,
  ENodeType.BooleanLiteral,
  ENodeType.NumberLiteral,
  ENodeType.StringLiteral,
  ENodeType.Identifier,
  ENodeType.UnaryExpression,
  ENodeType.IfExpression,
  ENodeType.ArrayExpression,
  ENodeType.DictionaryExpression,
  ENodeType.BinaryExpression,
  ENodeType.VariableDeclaration,
  ENodeType.AssignmentExpression,
  ENodeType.MemberExpression,
  ENodeType.CallExpression,
  ENodeType.TupleExpression
]

export const statementNodeTypes: (keyof TStatementNodeMap)[] = [
  ENodeType.ImportStatement,
  ENodeType.FunctionDeclaration,
  ENodeType.ClassDeclaration,
  ENodeType.BlockStatement,
  ENodeType.EmptyStatement,
  ENodeType.IfStatement,
  ENodeType.Program
]
