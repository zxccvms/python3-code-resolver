import { ENodeType, TExpressionNodeMap, TStatementNodeMap } from './types.d'

export const expressionNodeTypes: (keyof TExpressionNodeMap)[] = [
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
  ENodeType.SliceExpression,
  ENodeType.MemberExpression,
  ENodeType.CallExpression,
  ENodeType.TupleExpression,
  ENodeType.ImportExpreesion
]

export const statementNodeTypes: (keyof TStatementNodeMap)[] = [
  ENodeType.FunctionDeclaration,
  ENodeType.ClassDeclaration,
  ENodeType.BlockStatement,
  ENodeType.EmptyStatement,
  ENodeType.IfStatement,
  ENodeType.Program
]
