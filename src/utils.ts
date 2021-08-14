import { conditionExpressionNodeTypes, expressionNodeTypes, statementNodeTypes } from './const'
import {
  ENodeType,
  ETokenType,
  TBaseNodeAttr,
  TConditionExpressionNode,
  TExpressionNode,
  TNode,
  TStatementNode,
  TTokenItem
} from './types'

/** 得到数组的最后一项 */
export function getLatest<T>(array: Array<T>): T {
  if (!Array.isArray(array)) return null
  return array[array.length - 1]
}

export function toArray<T>(array: T | T[]): T[] {
  return Array.isArray(array) ? array : [array]
}

export function heavyArray<T>(targetArray: T[]): T[] {
  return Array.from(new Set(targetArray))
}

/** 节点添加基础属性 */
export function addBaseNodeAttr<T extends TNode>(node: T, baseAttr: TBaseNodeAttr): T {
  return {
    ...node,
    ...baseAttr
  }
}

/** 是否同级token 同行 或者 同列*/
export function isSameRank(
  token1: TTokenItem | TNode,
  token2: TTokenItem | TNode,
  mode: 'lineOrColumn' | 'line' | 'column' | 'endColumn' | 'endAndStartLine'
) {
  if (!token1 || !token2) return false

  let startPosition1 = getPositionInfo(token1, 'start')
  let endPosition1 = getPositionInfo(token1, 'end')
  let startPosition2 = getPositionInfo(token2, 'start')
  let endPosition2 = getPositionInfo(token2, 'end')

  switch (mode) {
    case 'lineOrColumn':
      return startPosition1.line === startPosition2.line || startPosition1.column === startPosition2.column
    case 'line':
      return startPosition1.line === startPosition2.line
    case 'column':
      return startPosition1.column === startPosition2.column
    case 'endColumn':
      return endPosition1.column === endPosition2.column
    case 'endAndStartLine':
      return endPosition1.line === startPosition2.line
  }
}

export function isToken<T extends ETokenType>(
  token: TTokenItem,
  types: T | T[],
  values?: string | string[]
): token is TTokenItem<T> {
  if (!token) return false

  if (values === undefined) {
    return toArray(types).some((type) => type === token.type)
  } else if (!Array.isArray(types) && Array.isArray(values)) {
    return token.type === types && values.some((value) => value === token.value)
  } else {
    values = toArray(values)
    return toArray(types).some((type, index) => type === token.type && values[index] === token.value)
  }
}

export function isAssignmentToken(
  token: TTokenItem
): token is TTokenItem<ETokenType.operator, '=' | '+=' | '-=' | '*=' | '/=' | '%=' | '**=' | '//='> {
  return isToken(token, ETokenType.operator, ['=', '+=', '-=', '*=', '/=', '%=', '**=', '//='])
}

export function isSeparateToken(
  token: TTokenItem
): token is TTokenItem<ETokenType.bracket | ETokenType.punctuation | ETokenType.operator> {
  return (
    isToken(token, ETokenType.bracket, ['(', '[', '{']) ||
    isToken(token, ETokenType.punctuation, [',', ':']) ||
    isAssignmentToken(token)
  )
}

export function isRightBracketToken(token: TTokenItem): token is TTokenItem<ETokenType.bracket> {
  return isToken(token, ETokenType.bracket, [')', ']', '}'])
}

export function isNode<T extends ENodeType>(node: TNode, types: T | T[]): node is TNode<T> {
  if (!node) return false
  return toArray(types).some((type) => type === node.type)
}

export function isConditionExpressionNode(node: TNode): node is TConditionExpressionNode {
  return isNode(node, conditionExpressionNodeTypes)
}

export function isExpressionNode(node: TNode): node is TExpressionNode {
  return isNode(node, expressionNodeTypes)
}

export function isStatementNode(node: TNode): node is TStatementNode {
  return isNode(node, statementNodeTypes)
}

export function createLoc(start: TTokenItem | TNode, end: TTokenItem | TNode): TBaseNodeAttr['loc'] {
  return {
    start: getPositionInfo(start, 'start'),
    end: getPositionInfo(end, 'end')
  }
}

/** 得到定位信息 */
export function getPositionInfo(tokenOrNode: TTokenItem | TNode, startOrEnd: 'start' | 'end') {
  return tokenOrNode.loc[startOrEnd]
}

/** 是否被括号包围 */
export function hasParenthesized(node: TNode): boolean {
  return Boolean(node.extra?.parenthesized)
}
