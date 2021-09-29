import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user';
import { Tag } from './tag.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), PassportModule.register({ defaultStrategy: 'jwt' }),],
  providers: [TagService],
  controllers: [TagController]
})
export class TagModule {}
