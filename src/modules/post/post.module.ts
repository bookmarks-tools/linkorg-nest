import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { PostEntity } from './post.entity';
import { PostController } from './post.controller';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [
    TagModule,
    TypeOrmModule.forFeature([PostEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
