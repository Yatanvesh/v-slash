import {Args, Int, Query, Resolver} from "@nestjs/graphql";
import {Organisation} from "./models/organisation.model";
import {OrganisationService} from "./organisation.service";

@Resolver(of => Organisation)
export class OrganisationResolver {
  constructor(private organisationService: OrganisationService) {
  }

  @Query(returns => Organisation)
  async organisation(@Args('uid', {type: () => String}) uid: string): Promise<Organisation> {
    return this.organisationService.findOne(uid)
  }
}
