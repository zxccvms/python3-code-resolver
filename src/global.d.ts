type TStateResponse<T = any> = {
  code: number
  message?: string
  payload?: T
}

type Filter<U, T> = {
  [P in keyof U]: U[P] extends T ? P : never
}[keyof U]
