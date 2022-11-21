export interface LoginResponse {
  accessToken: string
}

export interface Tag {
  uid: string
  pk: string
  tag: string
  createdAt: Date
}

export enum ShortcutType {
  PRIVATE = 'PRIVATE',
  ORGANISATION = 'ORGANISATION',
}

export interface Shortcut {
  uid?: string
  pk?: string
  shortLink: string
  description?: string
  type?: ShortcutType
  fullUrl: string
  tags?: Tag[]
  createdAt?: Date
  updatedAt?: Date
}
