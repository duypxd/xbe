import { ForbiddenException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { TaskEntity } from './entity/task.entity';
import { TaskDTO } from './dto';
import { Pagination, PaginationDto } from 'src/common/dto/pagination.dto';

@EntityRepository()
export class TaskRepository extends Repository<TaskEntity> {
  async createTask(userId: number, taskDTO: TaskDTO) {
    try {
      return await this.save({
        ...taskDTO,
        userId,
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async updateTaskById(userId: number, taskId: number, taskDTO: TaskDTO) {
    try {
      const task = await this.findOne({
        where: {
          userId,
          id: taskId,
        },
      });
      if (!task) throw new ForbiddenException('Cannot find Task to Update');
      return this.save({
        ...taskDTO,
        id: taskId,
        userId,
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async getMyTasks(userId: number, paginationDTO: PaginationDto) {
    try {
      const data = await this.find({
        where: {
          userId,
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

  async getTasks(paginationDTO: PaginationDto) {
    try {
      const data = await this.find({
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

  async getTaskById(taskId: number): Promise<TaskEntity> {
    try {
      const task = await this.findOne({
        where: {
          id: taskId,
        },
      });
      if (!task) throw new ForbiddenException('Task not found');
      return task;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async deleteTaskById(userId: number, taskId: number) {
    try {
      const task = await this.findOne({
        where: {
          userId,
          id: taskId,
        },
      });
      if (!task) throw new ForbiddenException('Cannot find Task to delete');
      this.delete(taskId);
      return 'Delete task success';
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
