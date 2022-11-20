import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Shortcut } from './models/shortcut.model'
import { ShortcutService } from './shortcut.service'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { User } from '../user/models/user.model'
import { ShortcutType } from './shortcut.types'

@Resolver((of) => Shortcut)
@UseGuards(GqlAuthGuard)
export class ShortcutResolver {
  constructor(private shortcutService: ShortcutService) {}

  // @Query((returns) => Shortcut)
  // async shortcut(
  //   @Args('uid', { type: () => String }) uid: string,
  // ): Promise<Shortcut> {
  //   return this.shortcutService.findOne(uid)
  // }

  @Query((returns) => [Shortcut])
  async userShortcuts(@CurrentUser() user: User): Promise<Shortcut[]> {
    return this.shortcutService.getUserShortcuts(user.uid, user.pk)
  }

  // @ResolveField()
  // async tags(@Parent() shortcut: Shortcut) {
  //   return this.shortcutService.findTags(shortcut);
  // }

  @Mutation((returns) => Shortcut)
  // @UseGuards(GqlAuthGuard)
  async createShortcut(
    @Args({ name: 'shortLink', type: () => String }) shortLink: string,
    @Args({ name: 'fullUrl', type: () => String }) fullUrl: string,
    @Args({ name: 'description', type: () => String, nullable: true })
    description: string,
    @Args({ name: 'type', type: () => String, nullable: true })
    type: ShortcutType,
    @Args({ name: 'tags', type: () => [String], nullable: true })
    tags: string[],
    @CurrentUser() user: User,
  ) {
    return this.shortcutService.create(
      {
        shortLink,
        fullUrl,
        description,
        type,
      },
      user,
      tags,
    )
  }
}
