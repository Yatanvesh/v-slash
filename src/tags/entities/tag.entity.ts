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
// tags are unique to organisation, pk could be used instead of organisation joinColumn
// but that would constraint the usage to partition key
@Index(['tag', 'organisation'], { unique: true })
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  uid: string

  @Column()
  pk: string

  @Column()
  tag: string

  @ManyToOne((type) => OrganisationEntity)
  @JoinColumn()
  organisation: OrganisationEntity

  @CreateDateColumn()
  createdAt: Date
}
