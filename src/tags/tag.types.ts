import { IsArray, IsDefined, IsString } from 'class-validator'

export class TagCreationAttributes {
  @IsDefined()
  @IsArray()
  @IsString({ each: true })
  tags: string[]

  constructor(tags: string[]) {
    this.tags = tags
  }
}
