import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [TagService],
  controllers: [TagController],
  exports: [TypeOrmModule.forFeature([Tag])],
})
export class TagModule {}
