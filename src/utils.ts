import { EEnvironment } from './AstGenerator/types'
import { expressionNodeTypes, statementNodeTypes } from './const'
import {
  ENodeType,
  ETokenType,
  IBaseNodeAttr,
  TExpressionNode,
  TLoc,
  TNode,
  TPositionInfo,
  TStatementNode,
  TToken
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
export function addBaseNodeAttr<T extends TNode>(node: T, baseAttr: IBaseNodeAttr): T {
  return {
    ...node,
    ...baseAttr
  }
}

export function getTokenExtra<T extends TToken>(token: T): T['extra'] {
  return token.extra || {}
}

/** 是否同级 同行 或者 同列*/
export function isSameRank(
  targets: (TToken | TNode)[],
  mode: 'lineOrColumn' | 'line' | 'column' | 'endColumn' | 'endAndStartLine'
) {
  if (targets.length < 2) return false

  return targets.every((cTarget, index) => {
    if (index === targets.length - 1) return true

    const nTarget = targets[index + 1]
    if (!cTarget || !nTarget) return false

    let startPosition1 = getPositionInfo(cTarget, 'start')
    let endPosition1 = getPositionInfo(cTarget, 'end')
    let startPosition2 = getPositionInfo(nTarget, 'start')
    let endPosition2 = getPositionInfo(nTarget, 'end')

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
  })
}

export function isToken<T extends ETokenType, V extends string>(
  token: TToken,
  types: T | T[],
  values?: V | V[]
): token is TToken<T, V> {
  if (!token) return false

  if (values === undefined) {
    return toArray(types).some(type => type === token.type)
  } else if (!Array.isArray(types) && Array.isArray(values)) {
    return token.type === types && values.some(value => value === token.value)
  } else {
    const _values = toArray(values)
    return toArray(types).some((type, index) => type === token.type && _values[index] === token.value)
  }
}

/** 赋值token */
export function isAssignmentToken(
  token: TToken
): token is TToken<ETokenType.operator, '=' | '+=' | '-=' | '*=' | '/=' | '%=' | '**=' | '//='> {
  return isToken(token, ETokenType.operator, ['=', '+=', '-=', '*=', '/=', '%=', '**=', '//='])
}

/** 左括号token */
export function isLeftBracketToken(token: TToken): token is TToken<ETokenType.bracket, '(' | '[' | '{'> {
  return isToken(token, ETokenType.bracket, ['(', '[', '{'])
}

/** 右括号token */
export function isRightBracketToken(token: TToken): token is TToken<ETokenType.bracket, ')' | ']' | '}'> {
  return isToken(token, ETokenType.bracket, [')', ']', '}'])
}

/** 隔断的标点符号token */
export function isSeparatePunctuationToken(token: TToken): token is TToken<ETokenType.punctuation, ',' | ':'> {
  return isToken(token, ETokenType.punctuation, [',', ':'])
}

export function isSeparateKeywordToken(token: TToken): token is TToken<ETokenType.punctuation, 'in' | 'not'> {
  return isToken(token, ETokenType.keyword, ['in', 'not'])
}

export function isNode<T extends ENodeType>(node: TNode, types: T | T[]): node is TNode<T> {
  if (!node) return false
  return toArray(types).some(type => type === node.type)
}

export function isExpressionNode(node: TNode): node is TExpressionNode {
  return isNode(node, expressionNodeTypes)
}

export function isExpressionNodes(nodes: TNode[]): nodes is TExpressionNode[] {
  return nodes.every(node => isNode(node, expressionNodeTypes))
}

export function isStatementNode(node: TNode): node is TStatementNode {
  return isNode(node, statementNodeTypes)
}

export function createLoc(start: TToken | TNode, end?: TToken | TNode): TLoc {
  return {
    start: getPositionInfo(start, 'start'),
    end: getPositionInfo(end || start, 'end')
  }
}

export function createLocByPosition(start: TPositionInfo, end: TPositionInfo): TLoc {
  return {
    start,
    end
  }
}

/** 得到定位信息 */
export function getPositionInfo(tokenOrNode: TToken | TNode, startOrEnd: 'start' | 'end') {
  return tokenOrNode.loc[startOrEnd]
}

/** 得到column */
export function getColumn(tokenOrNode: TToken | TNode, startOrEnd: 'start' | 'end') {
  return getPositionInfo(tokenOrNode, startOrEnd).column
}

/** 得到闭合的括号 */
export function getRightBracket(leftBracket: '(' | '[' | '{') {
  switch (leftBracket) {
    case '(':
      return ')'
    case '[':
      return ']'
    case '{':
      return '}'
    default:
      throw new TypeError('getRightBracket param is not "(" or "[" or "{"')
  }
}

/** 是否被括号包围 */
export function hasParenthesized(node: TNode): boolean {
  return Boolean(node.extra?.parenthesized)
}

/** 校验位 */
export function checkBit(num: number, targetNum: number) {
  return Boolean(num & targetNum)
}

/** 去除位 */
export function deleteBit(num: number, targetNum: number) {
  return num & ~targetNum
}
