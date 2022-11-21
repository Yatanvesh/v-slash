import { Controller, Get, Query } from '@nestjs/common'
import { faker } from '@faker-js/faker'
import { PromisePool } from '@supercharge/promise-pool'
import { ShortcutService } from './shortcut.service'
import { ShortcutEntity } from './entities/shortcut.entity'
import { UserService } from '../user/user.service'

@Controller('shortcut')
export class ShortcutController {
  constructor(
    private shortcutService: ShortcutService,
    private userService: UserService,
  ) {}

  @Get('populateRecords')
  async populate(@Query() query) {
    const user = await this.userService.findByEmail('oggybuddy1@gmail.com')
    const insertCount = query.count || 10
    const fakeRecords = Array.from(Array(Number(insertCount)).keys())
    console.log(fakeRecords)
    const { results, errors } = await PromisePool.withConcurrency(100)
      .for(fakeRecords)
      .process(async () => {
        try {
          const shortcut: Partial<ShortcutEntity> = {
            shortLink: `${faker.internet.userName()}${faker.word.noun()}${faker.word.noun()}`,
            fullUrl: `https://${faker.internet.userName()}${faker.word.noun()}.${faker.internet.domainName()}`,
            description:
              faker.word.adverb() + faker.word.noun() + faker.word.adjective(),
          }
          await this.shortcutService.create(shortcut, user)
        } catch (e) {}
      })
    console.log('inserted records ', insertCount)
    return true
  }
}
