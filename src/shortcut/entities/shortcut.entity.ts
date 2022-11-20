import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsUrl } from 'class-validator'
import { ShortcutType } from '../shortcut.types'
import { UserEntity } from '../../user/entities/user.entity'
import { TagEntity } from '../../tags/entities/tag.entity'

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
  @Index()
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

  @ManyToMany((type) => TagEntity)
  @JoinTable()
  tags?: TagEntity[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
