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
import { OrganisationEntity } from '../../organisation/entities/organisation.entity'

@Entity({
  name: 'shortcut',
})
@Index(['shortLink', 'creator', 'type'], { unique: true })
@Index(['shortLink', 'creator'])
export class ShortcutEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string

  @Column()
  @Index()
  shortLink: string

  @Column({
    nullable: true,
  })
  @Index()
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

  @ManyToOne((type) => OrganisationEntity)
  @JoinColumn()
  organisation?: OrganisationEntity

  @ManyToMany((type) => TagEntity)
  @JoinTable()
  tags?: TagEntity[]

  @CreateDateColumn()
  createdAt: Date

  // index column for createdAt field, I'm rounding time to nearest hour
  @Column('varchar', {
    length: 24,
  })
  @Index()
  createdAtIndex: string

  @UpdateDateColumn()
  updatedAt: Date
}
