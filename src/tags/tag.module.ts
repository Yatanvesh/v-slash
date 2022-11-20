import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagEntity } from './entities/tag.entity'
import { TagService } from './tag.service'
import { TagResolver } from './tag.resolver'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity]), UserModule],
  providers: [TagService, TagResolver],
  exports: [TagService],
})
export class TagModule {}
