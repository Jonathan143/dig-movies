export type Role = 'root' | 'tourist' | 'registered'

export interface UserState {
  openid?: string
  id: string
  userid: string
  username: string
  token: string
  role: Role
  email?: string
  avatar?: string
  nickname?: string
}
