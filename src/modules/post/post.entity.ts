import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../user';
import { Tag } from '../tag/tag.entity';

@Entity({
  name: 'post',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  href: string;

  @Column({ length: 255 })
  provider: string;

  @ManyToOne((type) => User, (user) => user.id)
  user: number;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

export class PostFillableFields {
  href: string;
  tags: Tag[];
  provider: string;
}
