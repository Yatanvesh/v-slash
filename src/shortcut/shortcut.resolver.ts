import { Args, Int, Query, Resolver } from '@nestjs/graphql'
import { Shortcut } from './models/shortcut.model'
import { ShortcutService } from './shortcut.service'

@Resolver((of) => Shortcut)
export class ShortcutResolver {
  constructor(private shortcutService: ShortcutService) {}

  @Query((returns) => Shortcut)
  async shortcut(
    @Args('uid', { type: () => String }) uid: string,
  ): Promise<Shortcut> {
    return this.shortcutService.findOne(uid)
  }
}
