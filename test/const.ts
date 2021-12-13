import { NodeGenerator } from 'src'
import { ENodeType } from 'src/types'

const nodeGenerator = new NodeGenerator()

export const NumberLiteral = nodeGenerator.generate(ENodeType.NumberLiteral, { value: 1, raw: '1' })
export const StringLiteral = nodeGenerator.generate(ENodeType.StringLiteral, { value: '1', raw: JSON.stringify('1') })
export const NoneLiteral = nodeGenerator.generate(ENodeType.NoneLiteral, {})
export const BooleanLiteral = nodeGenerator.generate(ENodeType.BooleanLiteral, { value: true })
export const Identifier = nodeGenerator.generate(ENodeType.Identifier, { name: 'a' })
export const TupleExpression = nodeGenerator.generate(ENodeType.TupleExpression, {
  elements: [NumberLiteral, StringLiteral]
})
export const UnaryExpression = nodeGenerator.generate(ENodeType.UnaryExpression, {
  operator: '-',
  argument: NumberLiteral
})
export const dictionaryProperty = nodeGenerator.generate(ENodeType.DictionaryProperty, {
  key: Identifier,
  value: NumberLiteral
})
export const AssignmentParam = nodeGenerator.generate(ENodeType.Argument, {
  value: Identifier,
  name: Identifier
})
export const BlockStatement = nodeGenerator.generate(ENodeType.BlockStatement, { body: [TupleExpression] })
export const ExceptHandler = nodeGenerator.generate(ENodeType.ExceptHandler, { body: BlockStatement })

export const IfExpression = nodeGenerator.generate(ENodeType.IfExpression, {
  body: NumberLiteral,
  test: BooleanLiteral,
  alternate: StringLiteral
})
export const ArrayExpression = nodeGenerator.generate(ENodeType.ArrayExpression, {
  elements: [NumberLiteral, StringLiteral]
})
export const DictionaryExpression = nodeGenerator.generate(ENodeType.DictionaryExpression, {
  properties: [dictionaryProperty]
})
export const BinaryExpression = nodeGenerator.generate(ENodeType.BinaryExpression, {
  operator: '+',
  left: NumberLiteral,
  right: NumberLiteral
})
export const VariableDeclaration = nodeGenerator.generate(ENodeType.VariableDeclaration, {
  kind: 'global',
  declarations: [Identifier]
})
export const AssignmentExpression = nodeGenerator.generate(ENodeType.AssignmentExpression, {
  value: NumberLiteral,
  targets: [Identifier],
  operator: '='
})
export const SliceExpression = nodeGenerator.generate(ENodeType.SliceExpression, {
  lower: NumberLiteral,
  upper: NumberLiteral,
  step: NumberLiteral
})
export const MemberExpression = nodeGenerator.generate(ENodeType.MemberExpression, {
  object: Identifier,
  property: Identifier
})
export const CallExpression = nodeGenerator.generate(ENodeType.CallExpression, {
  callee: Identifier,
  params: [NumberLiteral],
  keywords: [AssignmentParam]
})
export const AliasExpression = nodeGenerator.generate(ENodeType.AliasExpression, { name: 'a' })
export const ImportStatement = nodeGenerator.generate(ENodeType.ImportStatement, { names: [AliasExpression] })
export const FunctionDeclaration = nodeGenerator.generate(ENodeType.FunctionDeclaration, {
  body: BlockStatement,
  params: [Identifier],
  id: Identifier
})
export const ClassDeclaration = nodeGenerator.generate(ENodeType.ClassDeclaration, {
  body: BlockStatement,
  id: Identifier,
  params: [Identifier]
})
export const EmptyStatement = nodeGenerator.generate(ENodeType.EmptyStatement, {})
export const IfStatement = nodeGenerator.generate(ENodeType.IfStatement, { body: BlockStatement, test: BooleanLiteral })
export const TryStatement = nodeGenerator.generate(ENodeType.TryStatement, {
  body: BlockStatement,
  handlers: [ExceptHandler],
  finalBody: BlockStatement
})
export const Program = nodeGenerator.generate(ENodeType.Program, { body: [CallExpression] })
