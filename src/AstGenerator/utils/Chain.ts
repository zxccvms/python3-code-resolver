type TDataChain<T> = {
  next: TDataChain<T>
  data: T
}

/** 链表 */
class Chain<T> {
  private dataChain: TDataChain<T>
  private stagingDataChain: TDataChain<T>
  private stagingDataChainHead: TDataChain<T>

  get(count: number = 1) {
    let nextDataChain = this.dataChain
    for (let i = 1; i < count; i++) {
      if (!nextDataChain) return undefined
      nextDataChain = nextDataChain.next
    }

    return nextDataChain?.data
  }

  /** 将数据推送至链条上 如果存在暂存链 再将暂存链衔接上 */
  push(...datas: T[]) {
    for (const data of datas) {
      const next = this.dataChain
      this.dataChain = {
        next,
        data
      }
    }

    if (this.stagingDataChainHead) this._stagingChainToDataChain()
  }

  pop(count: number = 1): T[] {
    const result = []

    for (let i = 0; i < count; i++) {
      if (!this.dataChain) return result
      result.unshift(this.dataChain.data)
      this.dataChain = this.dataChain.next
    }

    return result
  }

  popByTarget(data: T): T[] {
    const result = []

    while (this.dataChain?.data !== data) {
      if (!this.dataChain) return result
      result.unshift(this.dataChain.data)
      this.dataChain = this.dataChain.next
    }

    return result
  }

  /** 将数据推送至暂存链上 */
  pushStaging(...datas: T[]) {
    for (const data of datas) {
      const next = this.stagingDataChain
      this.stagingDataChain = {
        next,
        data
      }
      if (!this.stagingDataChainHead) {
        this.stagingDataChainHead = this.stagingDataChain
      }
    }
  }

  /** 将暂存链衔接上数据链 */
  private _stagingChainToDataChain() {
    this.stagingDataChainHead.next = this.dataChain
    this.dataChain = this.stagingDataChain
    this.stagingDataChain = undefined
    this.stagingDataChainHead = undefined
  }
}

export default Chain
