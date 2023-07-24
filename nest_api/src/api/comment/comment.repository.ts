import { ForbiddenException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { CommentEntity } from './entity/comment.entity';
import { CommentDTO } from './dto';
import { Pagination, PaginationDto } from 'src/common/dto/pagination.dto';

@EntityRepository()
export class CommentRepository extends Repository<CommentEntity> {
  async createComment(userId: number, taskId: number, commentDTO: CommentDTO) {
    try {
      return await this.save({
        ...commentDTO,
        taskId,
        userId,
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async getComments(
    userId: number,
    taskId: number,
    paginationDTO: PaginationDto,
  ) {
    try {
      const data = await this.find({
        where: {
          userId,
          taskId,
        },
        ...Pagination.query(paginationDTO.page, paginationDTO.perPage),
      });
      const total = await this.count();
      return {
        data,
        total,
        ...paginationDTO,
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async getCommentById(
    taskId: number,
    userId: number,
    commentId: number,
  ): Promise<CommentEntity> {
    try {
      const comment = await this.findOne({
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
  ): Promise<CommentEntity> {
    try {
      const comment = await this.findOne({
        where: {
          id: commentId,
          userId,
          taskId,
        },
      });
      if (!comment) {
        throw new ForbiddenException('Cannot find Comment to update');
      } else {
        return await this.save({
          ...commentDTO,
          id: commentId,
          userId,
          taskId,
        });
      }
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async deleteCommentById(taskId: number, userId: number, commentId: number) {
    const comment = await this.findOne({
      where: {
        id: commentId,
        userId,
        taskId,
      },
    });
    if (!comment) throw new ForbiddenException('Cannot find Comment to delete');
    try {
      this.delete(commentId);
      return 'Delete successfully!';
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
