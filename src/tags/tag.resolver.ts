import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { Tag } from './models/tag.model'
import { TagService } from './tag.service'
import { User } from '../user/models/user.model'

@Resolver((of) => Tag)
@UseGuards(GqlAuthGuard)
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Query((returns) => [Tag])
  async tags(@CurrentUser() user: User): Promise<Tag[]> {
    return this.tagService.getOrganisationTags(user)
  }

  @Mutation((returns) => Tag)
  async createTag(
    @Args({ name: 'tag', type: () => String }) tag: string,
    @CurrentUser() user: User,
  ) {
    return this.tagService.create(tag, user)
  }
}
