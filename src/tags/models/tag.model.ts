import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Tag {
  @Field()
  uid: string

  @Field()
  tag: string

  @Field()
  createdAt: Date
}
