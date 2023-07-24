import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { TaskDTO } from './dto';
import { TaskEntity } from './entity/task.entity';
import { TaskRepository } from './task.repository';
import { Pagination, PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity) private _taskRepository: TaskRepository,
  ) {}

  async createTask(userId: number, taskDTO: TaskDTO) {
    try {
      const response = await this._taskRepository.create({
        ...taskDTO,
        userId,
      });
      return await this._taskRepository.save(response);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async updateTaskById(userId: number, taskId: number, taskDTO: TaskDTO) {
    try {
      const task = await this._taskRepository.findOne({
        where: {
          userId,
          id: taskId,
        },
      });
      if (!task) throw new ForbiddenException('Cannot find Task to Update');
      const response = await this._taskRepository.create({
        ...taskDTO,
        id: taskId,
        userId,
      });
      return await this._taskRepository.save(response);
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async getMyTasks(userId: number, paginationDTO: PaginationDto) {
    try {
      const data = await this._taskRepository.find({
        where: {
          userId,
        },
        ...Pagination.query(paginationDTO.page, paginationDTO.perPage),
      });
      const total = await this._taskRepository.count();
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
      const data = await this._taskRepository.find({
        ...Pagination.query(paginationDTO.page, paginationDTO.perPage),
      });
      const total = await this._taskRepository.count();
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
      const task = await this._taskRepository.findOne({
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
      const task = await this._taskRepository.findOne({
        where: {
          userId,
          id: taskId,
        },
      });
      if (!task) throw new ForbiddenException('Cannot find Task to delete');
      this._taskRepository.delete(taskId);
      return 'Delete task success';
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
