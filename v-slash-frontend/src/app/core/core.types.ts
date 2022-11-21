export interface LoginResponse {
  accessToken: string
}

export interface Tag {
  uid?: string
  tag: string
  createdAt?: Date
}

export enum ShortcutType {
  PRIVATE = 'PRIVATE',
  ORGANISATION = 'ORGANISATION',
}

export interface Shortcut {
  uid?: string
  shortLink: string
  description?: string
  type?: ShortcutType
  fullUrl: string
  tags?: Tag[]
  createdAt?: Date
  updatedAt?: Date
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface SortOptions {
  name: string
  key: string
  direction: SortDirection
}
