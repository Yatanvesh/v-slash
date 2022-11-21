import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OrganisationEntity } from './entities/organisation.entity'
import { OrganisationCreationAttributes } from './organisation.types'
import { UserService } from '../user/user.service'
import { User } from '../user/models/user.model'

@Injectable()
export class OrganisationService {
  constructor(
    @InjectRepository(OrganisationEntity)
    private organisationRepository: Repository<OrganisationEntity>,
    private userService: UserService,
  ) {}

  async create(creationAttributes: OrganisationCreationAttributes) {
    const organisation = await this.organisationRepository.create(
      creationAttributes,
    )
    return this.organisationRepository.save(organisation)
  }

  generateDefaultName(userName: string) {
    return `ORG_${userName}`
  }

  async findOne(authUser: User): Promise<OrganisationEntity> {
    const user = await this.userService.findByPk(authUser.uid)
    return user.organisation
  }
}
