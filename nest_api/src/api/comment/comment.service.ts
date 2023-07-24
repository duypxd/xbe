import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { CommentDTO } from './dto';
import { CommentEntity } from './entity/comment.entity';
import { CommentRepository } from './comment.repository';
import { Pagination, PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private _commentRepository: CommentRepository,
  ) {}
  async createComment(userId: number, taskId: number, commentDTO: CommentDTO) {
    try {
      const response = await this._commentRepository.create({
        ...commentDTO,
        taskId,
        userId,
      });
      return await this._commentRepository.save(response);
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
      const data = await this._commentRepository.find({
        where: {
          userId,
          taskId,
        },
        ...Pagination.query(paginationDTO.page, paginationDTO.perPage),
      });
      const total = await this._commentRepository.count();
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
      const comment = await this._commentRepository.findOne({
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
      const comment = await this._commentRepository.findOne({
        where: {
          id: commentId,
          userId,
          taskId,
        },
      });
      if (!comment) {
        throw new ForbiddenException('Cannot find Comment to update');
      } else {
        const response = await this._commentRepository.create({
          ...commentDTO,
          id: commentId,
          userId,
          taskId,
        });
        return await this._commentRepository.save(response);
      }
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async deleteCommentById(taskId: number, userId: number, commentId: number) {
    const comment = await this._commentRepository.findOne({
      where: {
        id: commentId,
        userId,
        taskId,
      },
    });
    if (!comment) throw new ForbiddenException('Cannot find Comment to delete');
    try {
      this._commentRepository.delete(commentId);
      return 'Delete successfully!';
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
