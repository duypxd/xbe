import { ForbiddenException, Injectable } from '@nestjs/common';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}
  async insertNote(userId: number, insertNoteDTO: InsertNoteDTO) {
    return await this.prismaService.comment.create({
      data: {
        ...insertNoteDTO,
        userId,
      },
    });
  }

  async getNotes(userId: number) {
    return await this.prismaService.comment.findMany({
      where: {
        userId,
      },
    });
  }

  async getNoteById(noteId: number) {
    try {
      return await this.prismaService.comment.findFirst({
        where: {
          id: noteId,
        },
      });
    } catch (_) {
      throw new ForbiddenException('Cannot find Note!');
    }
  }

  async updateNoteById(noteId: number, updateNoteDTO: UpdateNoteDTO) {
    const note = this.prismaService.comment.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new ForbiddenException('Cannot find Note to update');
    }
    return await this.prismaService.comment.update({
      where: {
        id: noteId,
      },
      data: { ...updateNoteDTO },
    });
  }

  async deleteNoteById(noteId: number) {
    const note = await this.prismaService.comment.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new ForbiddenException('Cannot find Comment to delete');
    }
    return this.prismaService.comment.delete({
      where: {
        id: noteId,
      },
    });
  }
}
