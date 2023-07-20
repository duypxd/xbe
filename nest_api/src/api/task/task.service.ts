import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDTO } from './dto';
import { Pagination, PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}
  async createTask(userId: number, taskDTO: TaskDTO) {
    return await this.prismaService.task.create({
      data: {
        ...taskDTO,
        userId,
      },
    });
  }

  async updateTaskById(userId: number, taskId: number, taskDTO: TaskDTO) {
    const where = {
      userId,
      id: taskId,
    };
    try {
      const task = await this.prismaService.task.findUnique({
        where,
      });
      if (!task) throw new ForbiddenException('Cannot find Task to Update');
      return this.prismaService.task.update({
        where,
        data: taskDTO,
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async getMyTasks(userId: number, params: PaginationDto) {
    try {
      const data = await this.prismaService.task.findMany({
        where: {
          userId,
        },
        ...Pagination.query(params.page, params.perPage),
      });
      const total = await this.prismaService.task.count();
      return {
        data,
        total,
        ...params,
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async getTasks(params: PaginationDto) {
    try {
      const data = await this.prismaService.task.findMany({
        ...Pagination.query(params.page, params.perPage),
      });
      const total = await this.prismaService.task.count();
      return {
        data,
        total,
        ...params,
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async getTaskById(taskId: number) {
    try {
      const task = await this.prismaService.task.findFirst({
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
    const where = {
      userId,
      id: taskId,
    };
    try {
      const task = await this.prismaService.task.findUnique({
        where,
      });
      if (!task) throw new ForbiddenException('Cannot find Task to delete');
      this.prismaService.task.delete({
        where,
      });
      return 'Delete task success';
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
