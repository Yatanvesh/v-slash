import { Field, ObjectType } from '@nestjs/graphql'
import { OrganisationEntity } from '../entities/organisation.entity'

@ObjectType()
export class Organisation implements Partial<OrganisationEntity> {
  @Field()
  uid: string

  @Field()
  name: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
