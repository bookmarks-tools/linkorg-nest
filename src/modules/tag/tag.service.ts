import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user';
import { Tag, TagFillableFields } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async get(id: number) {
    return this.tagRepository.findOne({ id });
  }

  async getAll(user: User) {
    return this.tagRepository.find({ where: { user: user } });
  }

  async create(payload: TagFillableFields, user: User) {
    return await this.tagRepository
      .save({
        ...payload,
        user: user.id,
      })
      .catch((e) => {
        throw new BadRequestException('Tag with this name already exists.');
      });
  }
}
