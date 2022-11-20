import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsEmail } from 'class-validator'
import { UserPasswordEntity } from './userPassword.entity'
import { OrganisationEntity } from '../../organisation/entities/organisation.entity'

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string

  @Column()
  @Generated('uuid')
  pk: string

  @Column()
  name: string

  @Column({
    unique: true,
  })
  @IsEmail()
  email: string

  @OneToOne((type) => UserPasswordEntity)
  @JoinColumn()
  password?: UserPasswordEntity

  @OneToOne((type) => OrganisationEntity, (org) => org.creator)
  @JoinColumn()
  createdOrganisation?: OrganisationEntity

  @ManyToOne((type) => OrganisationEntity)
  @JoinColumn()
  organisation?: OrganisationEntity

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
