import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { Tag } from '../tag/tag.entity';
import { Transform, Type } from 'class-transformer';

export class PostPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  href: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  provider: string;

  @ApiProperty()
  tags: Tag[];
}

export class ChecklistFilter {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  tags?: string[];
}
