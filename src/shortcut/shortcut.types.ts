export enum ShortcutType {
  PRIVATE = 'PRIVATE',
  ORGANISATION = 'ORGANISATION',
}

export class ShortcutCreationAttributes {
  pk: string

  shortLink: string
}
