import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TagEntity } from './entities/tag.entity'
import { UserService } from '../user/user.service'
import { Tag } from './models/tag.model'

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
}
