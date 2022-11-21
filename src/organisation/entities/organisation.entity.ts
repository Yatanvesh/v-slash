import {
  Column,
  CreateDateColumn,
  Entity,
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

  /*
    Mapping creator to organisation is a good proxy for role based checks for now
   */
  @OneToOne((type) => UserEntity, (user) => user.organisation)
  @JoinColumn()
  creator: UserEntity

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
