import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import { User } from '../user';
import { Tag } from '../tag/tag.entity';

@Entity({
  name: 'post',
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
}

export class PostFillableFields {
  href: string;
  tags: Tag[];
  provider: string;
}
