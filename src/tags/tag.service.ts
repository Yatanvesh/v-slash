import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { TagEntity } from './entities/tag.entity'
import { UserService } from '../user/user.service'
import { Tag } from './models/tag.model'
import { Organisation } from '../organisation/models/organisation.model'
import { TagCreationAttributes } from './tag.types'
import { validate } from 'class-validator'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
    private userService: UserService,
  ) {}

  async getOrganisationTags(userUid: string): Promise<Tag[]> {
    const { organisation } = await this.userService.findByPk(userUid)
    return this.tagRepository.find({
      where: {
        organisation: {
          uid: organisation.uid,
        },
      },
    })
  }

  async create(tag: string, userUid: string): Promise<Tag> {
    const user = await this.userService.findByPk(userUid)
    const tagModel = await this.tagRepository.create({
      tag,
      organisation: user.organisation,
      pk: user.pk,
    })
    await this.tagRepository.save(tagModel)
    return tagModel
  }

  async getTagEntities(
    tags: string[],
    organisation: Organisation,
  ): Promise<TagEntity[]> {
    if (!tags?.length) {
      return []
    }
    // const tagStrings = tags.map((tagModel) => tagModel.tag)
    const tagObject = new TagCreationAttributes(tags)
    const tagValidationErrors = await validate(tagObject)
    if (tagValidationErrors.length) {
      throw new BadRequestException(tagValidationErrors)
    }
    const tagEntities = await this.tagRepository.find({
      where: {
        organisation: {
          uid: organisation.uid,
          pk: organisation.pk,
        },
        tag: In(tags),
      },
    })
    // We can also create missing tags on the fly, but i think frontend is more than capable of sending created tags
    if (tagEntities.length !== tags.length) {
      throw new BadRequestException('Please create tags before using them')
    }
    return tagEntities
  }
}
