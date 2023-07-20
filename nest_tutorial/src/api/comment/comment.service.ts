import { ForbiddenException, Injectable } from '@nestjs/common';
import { CommentDTO } from './dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async createComment(userId: number, taskId: number, commentDTO: CommentDTO) {
    try {
      return await this.prismaService.comment.create({
        data: {
          ...commentDTO,
          taskId,
          userId,
        },
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async getComments(userId: number, taskId: number) {
    try {
      return await this.prismaService.comment.findMany({
        where: {
          userId,
          taskId,
        },
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async getCommentById(taskId: number, userId: number, commentId: number) {
    try {
      const comment = await this.prismaService.comment.findFirst({
        where: {
          id: commentId,
          userId,
          taskId,
        },
      });
      if (!comment) throw new ForbiddenException('Comment not found');
      return comment;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async updateCommentById(
    userId: number,
    taskId: number,
    commentId: number,
    commentDTO: CommentDTO,
  ) {
    const where = {
      id: commentId,
      userId,
      taskId,
    };
    try {
      const comment = await this.prismaService.comment.findUnique({
        where,
      });
      if (!comment) {
        throw new ForbiddenException('Cannot find Comment to update');
      } else {
        return await this.prismaService.comment.update({
          where,
          data: commentDTO,
        });
      }
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async deleteCommentById(taskId: number, userId: number, commentId: number) {
    const where = {
      id: commentId,
      userId,
      taskId,
    };
    const comment = await this.prismaService.comment.findUnique({
      where,
    });
    if (!comment) throw new ForbiddenException('Cannot find Comment to delete');
    try {
      this.prismaService.comment.delete({
        where,
      });
      return 'Delete successfully!';
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
