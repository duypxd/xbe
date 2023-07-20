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
import { JwtAuthGuard } from '../auth/guard';
import { CommentService } from './comment.service';
import { GetUser } from '../auth/decorator';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';
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
  getNotes(@GetUser('id') userId: number) {
    return this.commentService.getNotes(userId);
  }

  @Get(':id')
  @CustomApiResponse()
  getNoteById(@Param('id') noteId: number) {
    return this.commentService.getNoteById(noteId);
  }

  @Post()
  @CustomApiResponse()
  insertNote(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() insertNoteDTO: InsertNoteDTO,
  ) {
    console.log(userId);
    console.log(insertNoteDTO);
    return this.commentService.insertNote(userId, insertNoteDTO);
  }

  @Put(':id')
  @CustomApiResponse()
  updateNoteById(
    @Param('id', ParseIntPipe) noteId: number,
    @Body() updateNoteDTO: UpdateNoteDTO,
  ) {
    return this.commentService.updateNoteById(noteId, updateNoteDTO);
  }

  @Delete(':id')
  @CustomApiResponse()
  deleteNoteById(@Param('id', ParseIntPipe) noteId: number) {
    return this.commentService.deleteNoteById(noteId);
  }
}
