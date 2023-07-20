import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guard';
import { CommentService } from './comment.service';
import { GetUser } from '../../decorator';
import { CommentDTO } from './dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CustomApiBadRequestResponse,
  CustomApiForbiddenResponse,
  CustomApiInternalServerErrorResponse,
  CustomApiNotFoundResponse,
  CustomApiResponse,
  CustomApiUnauthorizedResponse,
} from 'src/utils';

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
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: String,
    isArray: true,
  })
  getComments(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    return this.commentService.getComments(userId, taskId);
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
