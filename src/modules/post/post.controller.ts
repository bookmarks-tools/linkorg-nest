import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CurrentUser } from '../common/decorator/current-user.decorator';
import { User } from '../user';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { PostPayload } from './post.payload';

@Controller('api/post')
@ApiTags('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInUser(@CurrentUser() user: User): Promise<PostEntity[]> {
    return this.postService.getAll(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async register(
    @Body() payload: PostPayload,
    @CurrentUser() user: User,
  ): Promise<any> {
    return await this.postService.create(payload, user);
  }
}
