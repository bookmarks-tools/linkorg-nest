import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  Unique,
} from 'typeorm';

import { User } from '../user';
import { PostEntity } from '../post/post.entity';

@Entity({
  name: 'tag',
})
@Unique(['name', 'user'])
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @ManyToOne((type) => User, (user) => user.id)
  user: number;

  @ManyToMany((type) => PostEntity, (post) => post.tags)
  posts: PostEntity[];
}

export class TagFillableFields {
  name: string;
}
