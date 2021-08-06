import { TTokenItem } from '../../types'

class TokenArray {
  private index: number = 0
  private tokens: TTokenItem[]

  constructor(tokens: TTokenItem[]) {
    if (!Array.isArray(tokens)) throw new TypeError('tokens is not Array')

    this.tokens = tokens
  }

  last(extraIndex: number = 1) {
    this.index -= extraIndex
  }

  next(extraIndex: number = 1) {
    this.index += extraIndex
  }

  getToken(extraIndex: number = 0) {
    return this.tokens[this.index + extraIndex]
  }

  getTokens() {
    return this.tokens
  }

  getLength() {
    return this.tokens.length
  }

  getIndex() {
    return this.index
  }

  setIndex(index: number) {
    this.index = index
  }
}

export default TokenArray
