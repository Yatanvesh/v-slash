import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class Organisation {
  @Field()
  uid: string;

  @Field()
  pk: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}