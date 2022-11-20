import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from '../user/entities/user.entity'
import { CreateUserDto } from './auth.types'
import * as bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './auth.constants'
import { OrganisationService } from '../organisation/organisation.service'
import { OrganisationEntity } from '../organisation/entities/organisation.entity'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private organisationService: OrganisationService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email)
    if (!user) {
      return null
    }
    console.log('pass', user.password.hashedPassword)
    const isMatch = await bcrypt.compare(
      password,
      user?.password?.hashedPassword,
    )
    if (isMatch) {
      return user
    }
    return null
  }

  async createUser(
    user: CreateUserDto,
  ): Promise<{ user: UserEntity; organisation: OrganisationEntity }> {
    const { password, ...rest } = user
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS)
    const createdUser = await this.userService.create({
      ...rest,
      hashedPassword,
    })
    const organisation = await this.organisationService.create({
      name: this.organisationService.generateDefaultName(createdUser.name),
      creator: createdUser,
    })
    return {
      user: createdUser,
      organisation,
    }
  }

  async login(user: UserEntity) {
    const payload = { email: user.email, sub: user.uid }
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }

  // TODO: blacklist token
  async logout() {
    return true
  }
}
