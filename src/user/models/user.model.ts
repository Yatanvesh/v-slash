import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field()
  uid: string

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
