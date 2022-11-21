import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { UserModule } from '../user/user.module'
import { OrganisationModule } from '../organisation/organisation.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JWT_CONSTANTS } from './auth.constants'
import { UserEntity } from '../user/entities/user.entity'
import { OrganisationEntity } from '../organisation/entities/organisation.entity'
import { CreateUserDto } from './auth.types'
import { v4 } from 'uuid'
import { DB_CONFIG } from '../db.config'

describe('AuthController', () => {
  let authController: AuthController
  let authService: AuthService
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      imports: [
        DB_CONFIG,
        UserModule,
        OrganisationModule,
        PassportModule,
        JwtModule.register({
          secret: JWT_CONSTANTS.secret,
          signOptions: { expiresIn: '360m' },
        }),
      ],
    }).compile()
    authController = moduleRef.get<AuthController>(AuthController)
    authService = moduleRef.get<AuthService>(AuthService)
  })

  describe('register', () => {
    it('should register a user', async () => {
      const result = {
        user: {
          name: 'yatan',
          email: 'oggybuddy1@gmail.com',
          uid: 'a96cd76e-6b4b-4d29-a8c9-56630fb29f7a',
          createdAt: '2022-11-20T17:38:24.563Z',
          updatedAt: '2022-11-20T17:38:24.000Z',
          organisation: {
            name: 'ORG_yatan',
            creator: {
              uid: 'a96cd76e-6b4b-4d29-a8c9-56630fb29f7a',
              name: 'yatan',
              email: 'oggybuddy1@gmail.com',
              createdAt: '2022-11-20T17:38:24.563Z',
              updatedAt: '2022-11-20T17:38:24.000Z',
            },
            uid: '1cc504f5-5f38-46ce-902c-70e86110cbf1',
            createdAt: '2022-11-20T17:38:24.594Z',
            updatedAt: '2022-11-20T17:38:24.594Z',
          },
          createdOrganisation: {
            name: 'ORG_yatan',
            creator: {
              uid: 'a96cd76e-6b4b-4d29-a8c9-56630fb29f7a',
              name: 'yatan',
              email: 'oggybuddy1@gmail.com',
              createdAt: '2022-11-20T17:38:24.563Z',
              updatedAt: '2022-11-20T17:38:24.000Z',
            },
            uid: '1cc504f5-5f38-46ce-902c-70e86110cbf1',
            createdAt: '2022-11-20T17:38:24.594Z',
            updatedAt: '2022-11-20T17:38:24.594Z',
          },
        },
        organisation: {
          name: 'ORG_yatan',
          creator: {
            uid: 'a96cd76e-6b4b-4d29-a8c9-56630fb29f7a',
            name: 'yatan',
            email: 'oggybuddy1@gmail.com',
            createdAt: '2022-11-20T17:38:24.563Z',
            updatedAt: '2022-11-20T17:38:24.000Z',
          },
          uid: '1cc504f5-5f38-46ce-902c-70e86110cbf1',
          createdAt: '2022-11-20T17:38:24.594Z',
          updatedAt: '2022-11-20T17:38:24.594Z',
        },
      }
      jest.spyOn(authService, 'createUser').mockImplementation(
        async () =>
          result as unknown as {
            user: UserEntity
            organisation: OrganisationEntity
          },
      )

      const registerDto: CreateUserDto = {
        email: 'oggybuddy1@gmail.com',
        password: '123',
        name: 'yatan',
      }
      expect(await authController.register(registerDto)).toBe(result)
    })
  })

  describe('login', () => {
    it('should login a user', async () => {
      const result = {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6ImVkOWMwYTgwLWFkMWUtNGI5Zi1hYzFlLTZmMDk3NDA1NTM3YSIsInN1YiI6ImE5NmNkNzZlLTZiNGItNGQyOS1hOGM5LTU2NjMwZmIyOWY3YSIsImlhdCI6MTY2OTAyMDI5NSwiZXhwIjoxNjY5MDIzODk1fQ.si1nD4tzG0mF3qdmR2LdJi4wZirhnvFj8I4YE6YLqWQ',
      }
      jest.spyOn(authService, 'login').mockImplementation(async () => result)

      const loginDto: Partial<UserEntity> = {
        uid: v4(),
      }
      expect(await authController.login(loginDto)).toBe(result)
    })
  })
})
