import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'

@Entity({
  name: 'organisation',
})
export class OrganisationEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string

  @Column()
  pk: string

  @Column()
  name: string

  @OneToOne((type) => UserEntity, (user) => user.organisation)
  @JoinColumn()
  creator: UserEntity

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
