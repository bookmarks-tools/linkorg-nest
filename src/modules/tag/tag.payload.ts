import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty} from 'class-validator';

export class TagPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name: string;
}
