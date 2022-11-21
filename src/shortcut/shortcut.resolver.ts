import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Shortcut } from './models/shortcut.model'
import { ShortcutService } from './shortcut.service'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { User } from '../user/models/user.model'
import { ShortcutType } from './shortcut.types'
import { SortDirection } from '../../v-slash-frontend/src/app/core/core.types'

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
  async userShortcuts(
    @Args({ name: 'offset', defaultValue: 0, type: () => Number })
    offset: number,
    @Args({ name: 'limit', defaultValue: 10, type: () => Number })
    limit: number,
    @Args({ name: 'sortKey', defaultValue: 'createdAt', type: () => String })
    sortKey: string,
    @Args({
      name: 'sortDir',
      defaultValue: SortDirection.DESC,
      type: () => String,
    })
    sortDir: string,
    @CurrentUser() user: User,
  ): Promise<Shortcut[]> {
    return this.shortcutService.getUserShortcuts(user.uid, user.pk, {
      offset,
      limit,
      sortKey,
      sortDir,
    })
  }

  @Query((returns) => [Shortcut])
  async searchShortcut(
    @Args({ name: 'searchTerm', type: () => String })
    searchTerm: string,
    @CurrentUser() user: User,
  ): Promise<Shortcut[]> {
    return this.shortcutService.getMatchedShortcuts(
      searchTerm,
      user.uid,
      user.pk,
    )
  }

  @Query((returns) => Number)
  async userShortcutsCount(@CurrentUser() user: User): Promise<Number> {
    return this.shortcutService.getUserShortcutsCount(user.uid, user.pk)
  }

  // @ResolveField()
  // async tags(@Parent() shortcut: Shortcut) {
  //   return this.shortcutService.findTags(shortcut);
  // }

  @Mutation((returns) => Shortcut)
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

  @Mutation((returns) => Boolean)
  async deleteShortcut(
    @Args({ name: 'uid', type: () => String }) uid: string,
    @CurrentUser() user: User,
  ) {
    return this.shortcutService.delete(uid, user)
  }
}
