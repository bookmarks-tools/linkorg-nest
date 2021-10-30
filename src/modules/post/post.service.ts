import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user';
import { PostEntity, PostFillableFields } from './post.entity';
import { Tag } from '../tag/tag.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async get(id: number) {
    return this.postRepository.findOne({ id });
  }

  async getAll(user: User) {
    return this.postRepository.find({
      where: { user: user },
      relations: ['tags'],
    });
  }

  async create(payload: PostFillableFields, user: User) {
    const tags: Tag[] = await this.tagRepository.findByIds(payload.tags);
    return await this.postRepository.save({
      ...payload,
      user: user.id,
      tags: tags,
    });
  }
}
