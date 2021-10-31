import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CurrentUser } from '../common/decorator/current-user.decorator';
import { User } from '../user';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { ChecklistFilter, PostPayload } from './post.payload';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('api/post')
@ApiTags('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard())
  // @Get('')
  // @ApiResponse({ status: 200, description: 'Successful Response' })
  // @ApiResponse({ status: 401, description: 'Unauthorized' })
  // async gePosts(@CurrentUser() user: User): Promise<PostEntity[]> {
  //   return this.postService.getAll(user);
  // }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async index(
    @CurrentUser() user: User,
    @Query(new ValidationPipe({ transform: true })) tags: ChecklistFilter,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<PostEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.postService.paginate(
      tags?.tags || [],
      {
        page,
        limit,
        route: '/api/post',
      },
      user,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getPost(
    @Param() params,
    @CurrentUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.get(params.id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deletePost(@Param() params, @Res() response: Response): Promise<any> {
    await this.postService.delete(params.id);
    return response.status(HttpStatus.OK).send('deleted');
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async add(
    @Body() payload: PostPayload,
    @CurrentUser() user: User,
  ): Promise<any> {
    return await this.postService.create(payload, user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put(':id')
  @ApiResponse({ status: 201, description: 'Successful Registration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(@Param() params, @Body() payload: PostPayload): Promise<any> {
    return await this.postService.update(params.id, payload);
  }
}
