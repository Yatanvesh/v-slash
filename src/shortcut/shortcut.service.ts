import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Like, Repository } from 'typeorm'
import { ShortcutEntity } from './entities/shortcut.entity'
import { UserEntity } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { validate } from 'class-validator'
import { TagService } from '../tags/tag.service'
import { ShortcutType } from './shortcut.types'

@Injectable()
export class ShortcutService {
  constructor(
    @InjectRepository(ShortcutEntity)
    private shortcutRepository: Repository<ShortcutEntity>,
    private userService: UserService,
    private tagService: TagService,
  ) {}

  /*
    Creates a new shortcut
    Throws error schema is invalid
   */
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
      // Throwing first error for now for ease of parsing
      throw new BadRequestException(validationErrors[0].toString())
    }

    // get hydrated tag entities from tag strings
    shortcut.tags = await this.tagService.getTagEntities(
      tags,
      user.organisation,
    )
    shortcut.organisation = user.organisation
    await this.shortcutRepository.save(shortcut)
    return shortcut
  }

  /*
    Get shortcuts for a given user
    Fetches all public shortcuts of organisation, private shortcuts scoped to the user
   */
  async getUserShortcuts(
    userUid: string,
    pk: string,
    { offset, limit, sortKey, sortDir },
  ): Promise<ShortcutEntity[]> {
    const user = await this.userService.findByPk(userUid, pk)
    return this.shortcutRepository.find({
      where: [
        {
          organisation: {
            uid: user.organisation.uid,
            pk: pk,
          },
          type: ShortcutType.ORGANISATION,
          pk,
        },
        {
          creator: {
            uid: userUid,
          },
          type: ShortcutType.PRIVATE,
          pk,
        },
      ],
      order: {
        [sortKey]: sortDir,
      },
      take: limit,
      skip: offset,
      relations: ['tags'],
    })
  }

  /*
    Delete a shortcut
   */
  async delete(uid: string, user: Partial<UserEntity>) {
    await this.shortcutRepository.delete({
      uid,
      pk: user.pk,
    })
    return true
  }

  /*
    Count public organisation shortcuts and private user shortcuts
   */
  async getUserShortcutsCount(userUid: string, pk: string): Promise<number> {
    const user = await this.userService.findByPk(userUid, pk)
    return this.shortcutRepository.count({
      where: [
        {
          organisation: {
            uid: user.organisation.uid,
            pk: pk,
          },
          type: ShortcutType.ORGANISATION,
          pk,
        },
        {
          creator: {
            uid: userUid,
          },
          type: ShortcutType.PRIVATE,
          pk,
        },
      ],
    })
  }

  /*
    Search shortcuts using shortLink, description and tags
   */
  async getMatchedShortcuts(searchTerm: string, userUid: string, pk: string) {
    const user = await this.userService.findByPk(userUid, pk)
    // find organisation and private shortcuts first, along with tag entities
    // An array of where condition indicates OR operator between them
    const [shortcuts, tags] = await Promise.all([
      this.shortcutRepository.find({
        where: [
          {
            shortLink: Like(`${searchTerm}%`),
            organisation: {
              uid: user.organisation.uid,
              pk: pk,
            },
            type: ShortcutType.ORGANISATION,
            pk,
          },
          {
            description: Like(`%${searchTerm}%`),
            organisation: {
              uid: user.organisation.uid,
              pk: pk,
            },
            type: ShortcutType.ORGANISATION,
            pk,
          },
          {
            shortLink: Like(`${searchTerm}%`),
            creator: {
              uid: user.uid,
            },
            type: ShortcutType.PRIVATE,
            pk: user.pk,
          },
          {
            description: Like(`%${searchTerm}%`),
            pk,
            creator: {
              uid: user.uid,
            },
            type: ShortcutType.PRIVATE,
          },
        ],
        relations: ['tags'],
      }),
      this.tagService.findTagsLike(searchTerm, user.organisation.uid, pk),
    ])
    // Second step, find shortcuts linked to tag entities found in the prev step
    // A join condition in first step could have directly yielded rows with certain tags, but this method is chosen as it generally performs better
    // and organisation tags can also be cached in a in memory datastore like redis
    const taggedShortcuts = await this.shortcutRepository.find({
      where: [
        {
          tags: {
            uid: In(tags.map((tag) => tag.uid)),
          },
          organisation: {
            uid: user.organisation.uid,
            pk: pk,
          },
          type: ShortcutType.ORGANISATION,
          pk,
        },
        {
          tags: {
            uid: In(tags.map((tag) => tag.uid)),
          },
          creator: {
            uid: user.uid,
          },
          type: ShortcutType.PRIVATE,
          pk: user.pk,
        },
      ],
      relations: ['tags'],
    })
    return [...shortcuts, ...taggedShortcuts]
  }
}
