import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsUrl } from 'class-validator'
import { ShortcutType } from '../shortcut.types'
import { UserEntity } from '../../user/entities/user.entity'

@Entity({
  name: 'shortcut',
})
@Index(['shortLink', 'creator', 'type'], { unique: true })
export class ShortcutEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string

  @Column()
  pk: string

  @Column()
  shortLink: string

  @Column({
    nullable: true,
  })
  description?: string

  @Column({
    type: 'enum',
    enum: ShortcutType,
    default: ShortcutType.ORGANISATION,
  })
  type?: ShortcutType

  @Column('varchar', {
    length: 2000,
    transformer: {
      from(value: string | null): URL | string {
        return value !== null ? new URL(value) : value
      },
      to(value: URL | null): string | null {
        return value?.toString() || null
      },
    },
  })
  @IsUrl()
  fullUrl: string

  @ManyToOne((type) => UserEntity)
  @JoinColumn()
  creator?: UserEntity

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
