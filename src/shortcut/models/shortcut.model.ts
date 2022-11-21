import { Field, ObjectType } from '@nestjs/graphql'
import { ShortcutType } from '../shortcut.types'
import { Tag } from '../../tags/models/tag.model'

@ObjectType()
export class Shortcut {
  @Field()
  uid: string

  @Field()
  shortLink: string

  @Field()
  description?: string

  @Field()
  type?: ShortcutType

  @Field()
  fullUrl: string

  @Field((type) => [Tag])
  tags?: Tag[]

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
