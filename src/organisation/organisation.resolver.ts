import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { Organisation } from './models/organisation.model'
import { OrganisationService } from './organisation.service'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { User } from '../user/models/user.model'

@Resolver((of) => Organisation)
@UseGuards(GqlAuthGuard)
export class OrganisationResolver {
  constructor(private organisationService: OrganisationService) {}

  @Query((returns) => Organisation)
  async organisation(@CurrentUser() user: User): Promise<Organisation> {
    return this.organisationService.findOne(user)
  }
}
