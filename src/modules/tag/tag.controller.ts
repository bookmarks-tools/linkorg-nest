import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CurrentUser } from '../common/decorator/current-user.decorator';
import { User } from '../user';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { TagPayload } from './tag.payload';

@Controller('api/tag')
@ApiTags('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(@CurrentUser() user: User): Promise<Tag[]> {
    return this.tagService.getAll(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(
    @Body() payload: TagPayload,
    @CurrentUser() user: User,
  ): Promise<any> {
    return await this.tagService.create(payload, user);
  }
}
