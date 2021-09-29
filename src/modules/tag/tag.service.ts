import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserFillableFields } from '../user';
import { Repository } from 'typeorm';
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
    return this.tagRepository.find( {where: { user: user }});
  }

  async create(payload: TagFillableFields, user: User) {

    return await this.tagRepository.save({
      ...payload,
      user: user
    });
  }
}
