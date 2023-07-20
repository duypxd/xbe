import { ForbiddenException, Injectable } from '@nestjs/common';
import { InsertCommentDTO, UpdateCommentDTO } from './dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}
  async insertComment(userId: number, insertCommentDTO: InsertCommentDTO) {
    return await this.prismaService.comment.create({
      data: {
        ...insertCommentDTO,
        userId,
      },
    });
  }

  async getComments(userId: number) {
    return await this.prismaService.comment.findMany({
      where: {
        userId,
      },
    });
  }

  async getCommentById(commentId: number) {
    try {
      return await this.prismaService.comment.findFirst({
        where: {
          id: commentId,
        },
      });
    } catch (_) {
      throw new ForbiddenException('Cannot find Comment!');
    }
  }

  async updateCommentById(
    commentId: number,
    updateCommentDTO: UpdateCommentDTO,
  ) {
    const comment = this.prismaService.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new ForbiddenException('Cannot find Comment to update');
    }
    return await this.prismaService.comment.update({
      where: {
        id: commentId,
      },
      data: { ...updateCommentDTO },
    });
  }

  async deleteCommentById(commentId: number) {
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      throw new ForbiddenException('Cannot find Comment to delete');
    }
    return this.prismaService.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
