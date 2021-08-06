/** 处理的code枚举 */
export enum EHandleCode {
  /** 不操作 */
  null = 0b0,
  /** 添加单个 */
  single = 0b1,
  /** 添加多个 */
  multi = 0b10,
  /** 递增索引 */
  addIndex = 0b100
}

/** 节点所处环境 */
export enum ENodeEnvironment {
  normal = 'normal',
  smallBracket = 'smallBracket'
}
