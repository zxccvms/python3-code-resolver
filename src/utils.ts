import { ENodeType, ETokenType, IBaseNodeAttr, TLoc, TNode, TNodeMap, TPositionInfo, TToken } from './types'

/** 得到数组的最后一项 */
export function getLatest<T>(array: Array<T>): T {
  if (!Array.isArray(array)) return null
  return array[array.length - 1]
}

/** 转成数组类型 */
export function toArray<T>(array: T | T[]): T[] {
  return Array.isArray(array) ? array : [array]
}

/** 数组去重 */
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

export function isNode<T extends ENodeType>(node: TNode, types: T | T[]): node is TNode<T> {
  if (!node) return false
  return toArray(types).some(type => type === node.type)
}

export function createNode<T extends ENodeType>(type: T, attr: Omit<TNodeMap[T], 'type'> & IBaseNodeAttr): TNode<T> {
  return {
    type,
    ...attr
  } as TNode<T>
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
export function getPositionInfo(tokenOrNode: TToken | TNode, startOrEnd: 'start' | 'end'): TPositionInfo {
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

export function mergeObject<T extends Record<string, any>>(o: T, p: Partial<T>): T {
  return {
    ...o,
    ...p
  }
}
