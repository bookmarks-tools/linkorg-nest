import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import * as redisStore from 'cache-manager-redis-store';

import { PostEntity } from './post.entity';
import { PostController } from './post.controller';
import { TagModule } from '../tag/tag.module';
import { PostService } from './post.service';

@Module({
  imports: [
    TagModule,
    // CacheModule.register({
    //   store: redisStore,
    //   host: 'redis',
    //   port: 6379,
    //   ttl: 60 * 60, // seconds
    //   max: 10, // maximum number of items in cache
    // }),
    TypeOrmModule.forFeature([PostEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
