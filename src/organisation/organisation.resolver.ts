import {Args, Int, Query, Resolver} from "@nestjs/graphql";
import {Organisation} from "./models/organisation.model";

@Resolver(of => Organisation)
export class OrganisationResolver {
  constructor() {
  }

  @Query(returns => Organisation)
  async organisation(@Args('id', {type: () => Int}) id: number): Promise<Organisation> {
    return {
      id: 5,
      name: 'Test org'
    };
  }
}
