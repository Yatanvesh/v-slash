import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrganisationResolver } from './organisation.resolver'
import { OrganisationService } from './organisation.service'
import { OrganisationEntity } from './entities/organisation.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([OrganisationEntity]), UserModule],
  providers: [OrganisationResolver, OrganisationService],
  exports: [TypeOrmModule, OrganisationService],
})
export class OrganisationModule {}
