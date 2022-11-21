import { Test, TestingModule } from '@nestjs/testing'
import { DB_CONFIG } from '../db.config'
import { OrganisationModule } from '../organisation/organisation.module'
import { ShortcutResolver } from './shortcut.resolver'
import { ShortcutService } from './shortcut.service'
import { UserModule } from '../user/user.module'
import { TagModule } from '../tags/tag.module'
import { ShortcutModule } from './shortcut.module'
import { ShortcutType } from './shortcut.types'

describe('ShortcutTests', () => {
  let shortcutResolver: ShortcutResolver
  let shortcutService: ShortcutService
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [
        DB_CONFIG,
        UserModule,
        TagModule,
        ShortcutModule,
        OrganisationModule,
      ],
    }).compile()
    shortcutResolver = moduleRef.get<ShortcutResolver>(ShortcutResolver)
    shortcutService = moduleRef.get<ShortcutService>(ShortcutService)
  })

  describe('createShortcut', () => {
    it('should create a shortcut', async () => {
      const result = {
        shortLink: 'slash',
        fullUrl: 'https://test.com',
        type: ShortcutType.PRIVATE,
        description: 'test description',
        uid: 'ed9c0a80-ad1e-4b9f-ac1e-6f097405537a',
        pk: 'ed9c0a80-ad1e-4b9f-ac1e-6f097405537a',
        tags: [],
        createdAt: new Date('2022-11-20T17:38:24.563Z'),
        updatedAt: new Date('2022-11-20T17:38:24.000Z'),
      }
      jest
        .spyOn(shortcutService, 'create')
        .mockImplementation(async () => result)

      expect(
        await shortcutResolver.createShortcut(
          result.shortLink,
          result.fullUrl,
          result.description,
          result.type,
          result.tags,
          {
            uid: 'ed9c0a80-ad1e-4b9f-ac1e-6f097405537a',
            pk: 'ed9c0a80-ad1e-4b9f-ac1e-6f097405537a',
          },
        ),
      ).toBe(result)
    })
  })

  describe('userShortcutsCount', () => {
    it('should fetch count of user shortcuts', async () => {
      const result = 8
      jest
        .spyOn(shortcutService, 'getUserShortcutsCount')
        .mockImplementation(async () => result)

      expect(
        await shortcutResolver.userShortcutsCount({
          uid: 'ed9c0a80-ad1e-4b9f-ac1e-6f097405537a',
          pk: 'ed9c0a80-ad1e-4b9f-ac1e-6f097405537a',
        }),
      ).toBe(result)
    })
  })
})
