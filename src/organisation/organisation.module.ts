import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrganisationResolver } from './organisation.resolver'
import { OrganisationService } from './organisation.service'
import { OrganisationEntity } from './entities/organisation.entity'

@Module({
  imports: [TypeOrmModule.forFeature([OrganisationEntity])],
  providers: [OrganisationResolver, OrganisationService],
  exports: [TypeOrmModule, OrganisationService],
})
export class OrganisationModule {}
