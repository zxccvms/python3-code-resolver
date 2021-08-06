import { AstToCode } from 'src'
import {
  AssignmentParam,
  BlockStatement,
  BooleanLiteral,
  DictionaryExpression,
  dictionaryProperty,
  Identifier,
  NoneLiteral,
  NumberLiteral,
  StringLiteral,
  TupleExpression,
  UnaryExpression
} from './const'

const astToCode = new AstToCode()

test('test AstToCode', () => {
  expect(astToCode.generate(NumberLiteral)).toBe('1')
  expect(astToCode.generate(StringLiteral)).toBe(JSON.stringify('1'))
  expect(astToCode.generate(NoneLiteral)).toBe('None')
  expect(astToCode.generate(BooleanLiteral)).toBe('True')
  expect(astToCode.generate(Identifier)).toBe('a')
  expect(astToCode.generate(TupleExpression)).toBe('1, "1"')
  expect(astToCode.generate(UnaryExpression)).toBe('-1')
  expect(astToCode.generate(dictionaryProperty)).toBe('  a: 1')
  expect(astToCode.generate(AssignmentParam)).toBe('a = a')
  // expect(astToCode.generate(BlockStatement)).toBe('1, "1"')
  expect(astToCode.generate(DictionaryExpression)).toBe(`{
  a: 1
}`)
  expect(astToCode.generate(TupleExpression)).toBe('1, "1"')
  expect(astToCode.generate(TupleExpression)).toBe('1, "1"')
  expect(astToCode.generate(TupleExpression)).toBe('1, "1"')
})
