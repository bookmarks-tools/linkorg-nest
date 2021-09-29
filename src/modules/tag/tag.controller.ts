import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorator/current-user.decorator';
import { User } from '../user';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { RegisterPayload } from '../auth';
import { TagPayload } from './tag.payload';

@Controller('tag')
export class TagController {
  constructor(
    private readonly tagService: TagService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('tags')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(@CurrentUser() user: User): Promise<Tag[]> {
    console.log(user);
    return this.tagService.getAll(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('create')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(@Body() payload: TagPayload, @CurrentUser() user: User): Promise<any> {
    console.log(payload);
    console.log(user);
    return  await this.tagService.create(payload, user);
  }
}
