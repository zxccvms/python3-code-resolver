import { TExpressionNode, TToken } from 'src/types'

/** 节点所处环境 */
export enum ENodeEnvironment {
  normal = 0b0,
  bracket = 0b1
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
