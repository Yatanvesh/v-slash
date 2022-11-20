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

  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }
  //

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
      pk: user.pk,
    })
    await this.userPasswordRepository.save(passwordEntity)

    user.password = passwordEntity
    const { password, ...createdUser } = await this.usersRepository.save(user)
    return createdUser
  }

  findOne(uid: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ uid })
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
      relations: ['password'],
    })
  }

  async getHashedPassword(uid: string): Promise<string> {
    const user = await this.usersRepository.findOneBy({ uid })
    return user.password.hashedPassword
  }
}