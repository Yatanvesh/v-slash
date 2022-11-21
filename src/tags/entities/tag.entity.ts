import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrganisationEntity } from '../../organisation/entities/organisation.entity'

@Entity({
  name: 'tag',
})
@Index(['tag', 'organisation'], { unique: true })
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string

  @Column()
  @Index()
  tag: string

  @ManyToOne((type) => OrganisationEntity)
  @JoinColumn()
  organisation: OrganisationEntity

  @CreateDateColumn()
  createdAt: Date
}
