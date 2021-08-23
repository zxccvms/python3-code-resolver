/** 步骤器 */
class Step<T> {
  private _cacheParam: T
  private _preconditionCb: (param: any) => boolean

  constructor(param?: T, preconditionCb?: (param: T) => boolean) {
    this._cacheParam = param
    this._preconditionCb = preconditionCb
  }

  next<A>(cb: (param: T) => A) {
    const _cb = () => {
      if (!this._preconditionCb || this._preconditionCb(this._cacheParam)) {
        return cb(this._cacheParam)
      }

      return this._cacheParam
    }
    return new Step(_cb(), this._preconditionCb)
  }

  return() {
    return this._cacheParam
  }
}

export default Step
