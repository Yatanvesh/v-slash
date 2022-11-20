import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OrganisationEntity } from './entities/organisation.entity'
import { OrganisationCreationAttributes } from './organisation.types'

@Injectable()
export class OrganisationService {
  constructor(
    @InjectRepository(OrganisationEntity)
    private organisationRepository: Repository<OrganisationEntity>,
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

  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }
  //
  findOne(uid: string): Promise<OrganisationEntity> {
    return this.organisationRepository.findOneBy({ uid })
  }
}
