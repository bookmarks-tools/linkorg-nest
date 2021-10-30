import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { PasswordTransformer } from './password.transformer';
import { Tag } from '../tag/tag.entity';
import { PostEntity } from '../post/post.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 255 })
  email: string;

  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  password: string;

  @OneToMany((type) => Tag, (tag) => tag.user)
  tags: Tag[];

  @OneToMany((type) => PostEntity, (post) => post.user)
  posts: PostEntity[];

  toJSON() {
    const { password, ...self } = this;
    return self;
  }
}

export class UserFillableFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
