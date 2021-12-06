import { TExpressionNode, TToken } from 'src/types'

/** 节点所处环境 */
export enum ENodeEnvironment {
  /** 正常环境 */
  normal = 0b0,
  /** 括号环境 */
  bracket = 0b1,
  /** 循环体内 */
  loopBody = 0b01,
  /** 函数体内 */
  functionBody = 0b001
}

export interface IFindNodesParams<T> {
  end: (token: TToken) => boolean
  step: () => T
  slice?: (token: TToken) => boolean
}

export interface ICheckParams {
  checkToken: () => boolean
  environment?: ENodeEnvironment
  isBefore?: boolean | number
  isAfter?: boolean | number
  extraCheck?: () => boolean
}

export interface IExpressionHandler<T extends TExpressionNode = TExpressionNode> {
  handle(lastNode: TExpressionNode, environment: ENodeEnvironment): T
  handleMaybe?(lastNode: TExpressionNode, environment: ENodeEnvironment): TExpressionNode
}

export interface IStatementHandler {}
