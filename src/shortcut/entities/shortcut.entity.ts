import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsUrl} from "class-validator";

@Entity()
export class Shortcut {
  @PrimaryGeneratedColumn("uuid")
  uid: string

  @Column()
  pk: string

  @Column()
  shortLink: string

  @Column()
  description: string;

  @Column("varchar", {
    length: 2000,
    transformer: {
      from(value: string | null): URL | string {
        return value !== null ? new URL(value) : value;
      },
      to(value: URL | null): string | null {
        return value?.toString() || null;
      },
    },
  })
  @IsUrl()
  fullUrl: URL;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
