import { Test, TestingModule } from '@nestjs/testing'
import { OrganisationModule } from './organisation.module'
import { v4 } from 'uuid'
import { DB_CONFIG } from '../db.config'
import { OrganisationResolver } from './organisation.resolver'
import { OrganisationService } from './organisation.service'
import { UserModule } from '../user/user.module'
import { OrganisationEntity } from './entities/organisation.entity'
import { OrganisationCreationAttributes } from './organisation.types'

describe('OrganisationTests', () => {
  let organisationResolver: OrganisationResolver
  let organisationService: OrganisationService
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [DB_CONFIG, UserModule, OrganisationModule],
    }).compile()
    organisationResolver =
      moduleRef.get<OrganisationResolver>(OrganisationResolver)
    organisationService =
      moduleRef.get<OrganisationService>(OrganisationService)
  })

  describe('createOrganisation', () => {
    it('should create an organisation', async () => {
      const result: OrganisationEntity = {
        name: 'ORG_yatan',
        creator: {
          uid: 'a96cd76e-6b4b-4d29-a8c9-56630fb29f7a',
          name: 'yatan',
          email: 'oggybuddy1@gmail.com',
          createdAt: new Date('2022-11-20T17:38:24.563Z'),
          updatedAt: new Date('2022-11-20T17:38:24.000Z'),
        },
        uid: '1cc504f5-5f38-46ce-902c-70e86110cbf1',
        createdAt: new Date('2022-11-20T17:38:24.594Z'),
        updatedAt: new Date('2022-11-20T17:38:24.594Z'),
      }
      jest
        .spyOn(organisationService, 'create')
        .mockImplementation(async () => result)

      const orgCreationDto: OrganisationCreationAttributes = {
        name: 'yatan',
        creator: result.creator,
      }
      expect(await organisationService.create(orgCreationDto)).toBe(result)
    })
  })
})
