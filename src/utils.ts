import { toArray } from 'src/base/common/utils'
import { expressionNodeTypes, statementNodeTypes } from './const'
import { ENodeType, ETokenType, TBaseNodeAttr, TExpressionNode, TNode, TStatementNode, TTokenItem } from './types.d'

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
  mode: 'lineOrColumn' | 'line' | 'column' | 'endAndStartLine'
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
    return toArray(types).some(type => type === token.type)
  } else if (!Array.isArray(types) && Array.isArray(values)) {
    return token.type === types && values.some(value => value === token.value)
  } else {
    values = toArray(values)
    return toArray(types).some((type, index) => type === token.type && values[index] === token.value)
  }
}

export function isLeftBracketToken(token: TTokenItem): token is TTokenItem<ETokenType.bracket> {
  return isToken(token, ETokenType.bracket, ['(', '[', '{'])
}

export function isRightBracketToken(token: TTokenItem): token is TTokenItem<ETokenType.bracket> {
  return isToken(token, ETokenType.bracket, [')', ']', '}'])
}

export function isNode<T extends ENodeType>(node: TNode, types: T | T[]): node is TNode<T> {
  if (!node) return false
  return toArray(types).some(type => type === node.type)
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
