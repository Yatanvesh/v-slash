import { Injectable } from '@nestjs/common'
import { UserEntity } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserPasswordEntity } from './entities/userPassword.entity'
import { UserCreationAttributes } from './user.types'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserPasswordEntity)
    private userPasswordRepository: Repository<UserPasswordEntity>,
  ) {}

  /*
    Creates a user and an entry password table
   */
  async create(
    creationAttributes: UserCreationAttributes,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.create({
      email: creationAttributes.email,
      name: creationAttributes.name,
    })
    await this.usersRepository.save(user)

    const passwordEntity = await this.userPasswordRepository.create({
      hashedPassword: creationAttributes.hashedPassword,
    })
    await this.userPasswordRepository.save(passwordEntity)

    user.password = passwordEntity
    const { password, ...createdUser } = await this.usersRepository.save(user)
    return createdUser
  }

  update(user: UserEntity) {
    return this.usersRepository.save(user)
  }

  findByPk(uid: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        uid,
      },
      relations: ['organisation'],
    })
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
      relations: ['password'],
    })
  }
}
