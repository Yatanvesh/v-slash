import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({
  name: 'user_password',
})
export class UserPasswordEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string

  @Column()
  hashedPassword: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
