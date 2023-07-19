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
import { MyJwtGuard } from '../auth/guard';
import { NoteService } from './note.service';
import { GetUser } from '../auth/decorator';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CustomApiBadRequestResponse,
  CustomApiForbiddenResponse,
  CustomApiInternalServerErrorResponse,
  CustomApiNotFoundResponse,
  CustomApiResponse,
  CustomApiUnauthorizedResponse,
} from 'src/utils';

@ApiTags('Notes')
@UseGuards(MyJwtGuard)
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
    isArray: true,
  })
  @CustomApiBadRequestResponse()
  @CustomApiUnauthorizedResponse()
  @CustomApiNotFoundResponse()
  @CustomApiForbiddenResponse()
  @CustomApiInternalServerErrorResponse()
  getNotes(@GetUser('id') userId: number) {
    return this.noteService.getNotes(userId);
  }

  @Get(':id')
  @CustomApiResponse()
  @CustomApiBadRequestResponse()
  @CustomApiUnauthorizedResponse()
  @CustomApiNotFoundResponse()
  @CustomApiForbiddenResponse()
  @CustomApiInternalServerErrorResponse()
  getNoteById(@Param('id') noteId: number) {
    return this.noteService.getNoteById(noteId);
  }

  @Post()
  @CustomApiResponse()
  @CustomApiBadRequestResponse()
  @CustomApiUnauthorizedResponse()
  @CustomApiNotFoundResponse()
  @CustomApiForbiddenResponse()
  @CustomApiInternalServerErrorResponse()
  insertNote(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() insertNoteDTO: InsertNoteDTO,
  ) {
    console.log(userId);
    console.log(insertNoteDTO);
    return this.noteService.insertNote(userId, insertNoteDTO);
  }

  @Put(':id')
  @CustomApiResponse()
  @CustomApiBadRequestResponse()
  @CustomApiUnauthorizedResponse()
  @CustomApiNotFoundResponse()
  @CustomApiForbiddenResponse()
  @CustomApiInternalServerErrorResponse()
  updateNoteById(
    @Param('id', ParseIntPipe) noteId: number,
    @Body() updateNoteDTO: UpdateNoteDTO,
  ) {
    return this.noteService.updateNoteById(noteId, updateNoteDTO);
  }

  @Delete(':id')
  @CustomApiResponse()
  @CustomApiBadRequestResponse()
  @CustomApiUnauthorizedResponse()
  @CustomApiNotFoundResponse()
  @CustomApiForbiddenResponse()
  @CustomApiInternalServerErrorResponse()
  deleteNoteById(@Param('id', ParseIntPipe) noteId: number) {
    return this.noteService.deleteNoteById(noteId);
  }
}
