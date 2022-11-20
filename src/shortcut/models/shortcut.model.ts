import { Field, ObjectType } from '@nestjs/graphql'
import { ShortcutEntity } from '../entities/shortcut.entity'
import { ShortcutType } from '../shortcut.types'

@ObjectType()
export class Shortcut {
  @Field()
  uid: string

  @Field()
  pk: string

  @Field()
  shortLink: string

  @Field()
  description?: string

  @Field()
  type?: ShortcutType

  @Field()
  fullUrl: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
