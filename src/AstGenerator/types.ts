import { TExpressionNode, TToken } from '../types'

/** 节点所处环境 */
export enum EEnvironment {
  /** 正常环境 */
  normal = 0b0,
  /** 括号环境 */
  bracket = 0b1,
  /** 循环体内 */
  loopBody = 0b10,
  /** 函数体内 */
  functionBody = 0b100,
  /** lambda环境 */
  lambda = 0b1000,
  /** 赋值环境 */
  assign = 0b10000,
  /** 装饰器环境 */
  decorative = 0b100000,
  /** subscript环境 */
  subscript = 0b1000000
}

export interface IFindNodesParams<T> {
  end: (token: TToken) => boolean
  step: () => T
  isSlice?: boolean
}

export interface ICheckParams {
  checkToken?: () => boolean
  extraCheck?: () => boolean
  environment?: EEnvironment
  isBefore?: boolean | number
  isAfter?: boolean | number
  isDecorativeExpression?: boolean
  isAssignableExpression?: boolean
}

export interface IExpressionHandler<T extends TExpressionNode = TExpressionNode> {
  handle(lastNode: TExpressionNode, environment: EEnvironment): T
  handleMaybe?(lastNode: TExpressionNode, environment: EEnvironment): TExpressionNode
}
