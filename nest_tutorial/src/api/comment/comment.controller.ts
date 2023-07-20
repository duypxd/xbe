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
import { InsertCommentDTO, UpdateCommentDTO } from './dto';
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

  @Get()
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: String,
  })
  getComments(@GetUser('id') userId: number) {
    return this.commentService.getComments(userId);
  }

  @Get(':id')
  @CustomApiResponse()
  getCommentById(@Param('id') commentId: number) {
    return this.commentService.getCommentById(commentId);
  }

  @Post()
  @CustomApiResponse()
  insertComment(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() insertCommentDTO: InsertCommentDTO,
  ) {
    return this.commentService.insertComment(userId, insertCommentDTO);
  }

  @Put(':id')
  @CustomApiResponse()
  updateCommentById(
    @Param('id', ParseIntPipe) commentId: number,
    @Body() updateCommentDTO: UpdateCommentDTO,
  ) {
    return this.commentService.updateCommentById(commentId, updateCommentDTO);
  }

  @Delete(':id')
  @CustomApiResponse()
  deleteCommentById(@Param('id', ParseIntPipe) commentId: number) {
    return this.commentService.deleteCommentById(commentId);
  }
}
