import { UserEntity } from '../user/entities/user.entity'

export interface OrganisationCreationAttributes {
  name: string
  creator: UserEntity
}
