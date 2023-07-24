import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { CommentDTO } from './dto';
import { CommentEntity } from './entity/comment.entity';
import { CommentRepository } from './comment.repository';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}

  async createComment(userId: number, taskId: number, commentDTO: CommentDTO) {
    return this.commentRepository.createComment(userId, taskId, commentDTO);
  }

  async getComments(
    userId: number,
    taskId: number,
    paginationDTO: PaginationDto,
  ) {
    return this.commentRepository.getComments(userId, taskId, paginationDTO);
  }

  async getCommentById(
    taskId: number,
    userId: number,
    commentId: number,
  ): Promise<CommentEntity> {
    return this.getCommentById(taskId, userId, commentId);
  }

  async updateCommentById(
    userId: number,
    taskId: number,
    commentId: number,
    commentDTO: CommentDTO,
  ): Promise<CommentEntity> {
    return this.updateCommentById(userId, taskId, commentId, commentDTO);
  }

  async deleteCommentById(taskId: number, userId: number, commentId: number) {
    return this.commentRepository.deleteCommentById(taskId, userId, commentId);
  }
}
