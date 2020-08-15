export interface IUser {
  id?: number
  displayName: string
  email: string
  password?: string
}

export interface IToken {
  id: number,
  displayName: string,
  email: string,
  iat: number,
  exp: number
}
