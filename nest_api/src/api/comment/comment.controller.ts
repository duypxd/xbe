import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guard';
import { CommentService } from './comment.service';
import { GetUser } from '../../decorator';
import { CommentDTO } from './dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CustomApiBadRequestResponse,
  CustomApiForbiddenResponse,
  CustomApiInternalServerErrorResponse,
  CustomApiNotFoundResponse,
  CustomApiResponse,
  CustomApiUnauthorizedResponse,
} from 'src/utils';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('Comments')
@ApiBearerAuth()
@CustomApiBadRequestResponse()
@CustomApiUnauthorizedResponse()
@CustomApiNotFoundResponse()
@CustomApiForbiddenResponse()
@CustomApiInternalServerErrorResponse()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':taskId')
  @CustomApiResponse(true)
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  getComments(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Query() params: PaginationDto,
  ) {
    const page = Number(params.page ?? 1);
    const perPage = Number(params.perPage ?? 10);
    params = { page, perPage };
    return this.commentService.getComments(userId, taskId, params);
  }

  @Get(':taskId/:commentId')
  @CustomApiResponse()
  getCommentById(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.getCommentById(taskId, userId, commentId);
  }

  @Post(':taskId')
  @CustomApiResponse()
  createComment(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() commentDTO: CommentDTO,
  ) {
    return this.commentService.createComment(userId, taskId, commentDTO);
  }

  @Put(':taskId/:commentId')
  @CustomApiResponse()
  updateCommentById(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() commentDTO: CommentDTO,
  ) {
    return this.commentService.updateCommentById(
      userId,
      taskId,
      commentId,
      commentDTO,
    );
  }

  @Delete(':taskId/:commentId')
  @CustomApiResponse()
  deleteCommentById(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.deleteCommentById(userId, taskId, commentId);
  }
}
