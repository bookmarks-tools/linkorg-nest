import {
  Entity,
  Column,
  PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, RelationId,
} from 'typeorm';
import { User } from '../user';

@Entity({
  name: 'tag',
})
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @ManyToOne(type => User, user => user.tags)
  user: User;

}

export class TagFillableFields {
  name: string;
}
