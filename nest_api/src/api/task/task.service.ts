import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { TaskDTO } from './dto';
import { TaskEntity } from './entity/task.entity';
import { TaskRepository } from './task.repository';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async createTask(userId: number, taskDTO: TaskDTO) {
    return this.taskRepository.createTask(userId, taskDTO);
  }

  async updateTaskById(userId: number, taskId: number, taskDTO: TaskDTO) {
    return this.taskRepository.updateTaskById(userId, taskId, taskDTO);
  }

  async getMyTasks(userId: number, paginationDTO: PaginationDto) {
    return this.taskRepository.getMyTasks(userId, paginationDTO);
  }

  async getTasks(paginationDTO: PaginationDto) {
    return this.taskRepository.getTasks(paginationDTO);
  }

  async getTaskById(taskId: number): Promise<TaskEntity> {
    return this.taskRepository.getTaskById(taskId);
  }

  async deleteTaskById(userId: number, taskId: number): Promise<string> {
    return this.taskRepository.deleteTaskById(userId, taskId);
  }
}
