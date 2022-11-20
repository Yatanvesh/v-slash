import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { UserPasswordEntity } from './entities/userPassword.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserPasswordEntity])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
