import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Tag } from '../tag/tag.entity';

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
