import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ShortcutEntity } from './entities/shortcut.entity'
import { UserEntity } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { validate } from 'class-validator'
import { TagService } from '../tags/tag.service'

@Injectable()
export class ShortcutService {
  constructor(
    @InjectRepository(ShortcutEntity)
    private shortcutRepository: Repository<ShortcutEntity>,
    private userService: UserService,
    private tagService: TagService,
  ) {}

  async create(
    shortcutCreationAttributes: Partial<ShortcutEntity>,
    partialUser: Partial<UserEntity>,
    tags: string[] = [],
  ): Promise<ShortcutEntity> {
    const user = await this.userService.findByPk(
      partialUser.uid,
      partialUser.pk,
    )
    const shortcut = this.shortcutRepository.create({
      ...shortcutCreationAttributes,
      pk: user.pk,
      creator: user,
    })
    const validationErrors = await validate(shortcut)
    if (validationErrors.length) {
      throw new BadRequestException(validationErrors)
    }

    shortcut.tags = await this.tagService.getTagEntities(
      tags,
      user.organisation,
    )
    await this.shortcutRepository.save(shortcut)
    return shortcut
  }
  // async findOne(uid: string): Promise<ShortcutEntity> {
  //   return this.shortcutRepository.findOneBy({ uid })
  // }

  async getUserShortcuts(uid: string, pk: string): Promise<ShortcutEntity[]> {
    return this.shortcutRepository.find({
      where: {
        creator: {
          uid,
        },
        pk,
      },
      relations: ['tags'],
    })
  }
}
