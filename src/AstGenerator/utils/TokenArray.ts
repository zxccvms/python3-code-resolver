import { ETokenType, TTokenItem } from '../../types'

class TokenArray {
  private index: number = 0
  private tokens: TTokenItem[]

  constructor(tokens: TTokenItem[]) {
    this.tokens = tokens
  }

  last(extraIndex: number = 1) {
    this.index -= extraIndex
  }

  next(extraIndex: number = 1) {
    this.index += extraIndex
  }

  getToken<T extends TTokenItem>(extraIndex: number = 0): T {
    return this.tokens[this.index + extraIndex] as T
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
