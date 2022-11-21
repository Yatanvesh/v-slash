import { Test, TestingModule } from '@nestjs/testing'
import { v4 } from 'uuid'
import { DB_CONFIG } from '../db.config'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { UserModule } from './user.module'
import { UserEntity } from './entities/user.entity'
import { UserCreationAttributes } from './user.types'
import { OrganisationModule } from '../organisation/organisation.module'

describe('UserTests', () => {
  let userResolver: UserResolver
  let userService: UserService
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [DB_CONFIG, UserModule, OrganisationModule],
    }).compile()
    userResolver = moduleRef.get<UserResolver>(UserResolver)
    userService = moduleRef.get<UserService>(UserService)
  })

  describe('createUser', () => {
    it('should create a user', async () => {
      const result: UserEntity = {
        name: 'yatan',
        email: 'oggybuddy1@gmail.com',
        uid: 'a96cd76e-6b4b-4d29-a8c9-56630fb29f7a',
        pk: 'ed9c0a80-ad1e-4b9f-ac1e-6f097405537a',
        createdAt: new Date('2022-11-20T17:38:24.563Z'),
        updatedAt: new Date('2022-11-20T17:38:24.000Z'),
      }
      jest.spyOn(userService, 'create').mockImplementation(async () => result)

      const userCreationDto: UserCreationAttributes = {
        name: 'yatan',
        email: 'oggybuddy1@gmail.com',
        hashedPassword: v4(),
      }
      expect(await userService.create(userCreationDto)).toBe(result)
    })
  })
})
