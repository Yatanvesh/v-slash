import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ShortcutEntity } from './entities/shortcut.entity'
import { UserEntity } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { Shortcut } from './models/shortcut.model'

@Injectable()
export class ShortcutService {
  constructor(
    @InjectRepository(ShortcutEntity)
    private shortcutRepository: Repository<ShortcutEntity>,
    private userService: UserService,
  ) {}

  async create(
    shortcutCreationAttributes: Partial<ShortcutEntity>,
    partialUser: Partial<UserEntity>,
  ): Promise<ShortcutEntity> {
    const user = await this.userService.findOne(partialUser.uid)
    const shortcut = this.shortcutRepository.create({
      ...shortcutCreationAttributes,
      pk: user.pk,
      creator: user,
    })
    await this.shortcutRepository.save(shortcut)
    return shortcut
  }

  async findOne(uid: string): Promise<ShortcutEntity> {
    return this.shortcutRepository.findOneBy({ uid })
  }
}
