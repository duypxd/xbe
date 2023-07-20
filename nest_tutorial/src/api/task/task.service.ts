import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDTO } from './dto';

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

  async getMyTasks(userId: number) {
    try {
      return await this.prismaService.task.findMany({
        where: {
          userId,
        },
      });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async getTasks() {
    try {
      return await this.prismaService.task.findMany();
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
