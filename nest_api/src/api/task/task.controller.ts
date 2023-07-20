import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard';
import {
  CustomApiBadRequestResponse,
  CustomApiForbiddenResponse,
  CustomApiInternalServerErrorResponse,
  CustomApiNotFoundResponse,
  CustomApiResponse,
  CustomApiUnauthorizedResponse,
} from 'src/utils';
import { TaskService } from './task.service';
import { GetUser } from 'src/decorator';
import { TaskDTO } from './dto';

@ApiTags('Tasks')
@ApiBearerAuth()
@CustomApiBadRequestResponse()
@CustomApiUnauthorizedResponse()
@CustomApiNotFoundResponse()
@CustomApiForbiddenResponse()
@CustomApiInternalServerErrorResponse()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('/me')
  @ApiResponse({
    status: 200,
    description: 'OK',
    isArray: true,
  })
  getMyTasks(@GetUser('id') userId: number) {
    return this.taskService.getMyTasks(userId);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'OK',
    isArray: true,
  })
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  @CustomApiResponse()
  getTaskById(@Param('id', ParseIntPipe) taskId: number) {
    return this.taskService.getTaskById(taskId);
  }

  @Post()
  @CustomApiResponse()
  createTask(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() taskDTO: TaskDTO,
  ) {
    return this.taskService.createTask(userId, taskDTO);
  }

  @Put(':id')
  @CustomApiResponse()
  updateTask(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() taskDTO: TaskDTO,
  ) {
    return this.taskService.updateTaskById(userId, taskId, taskDTO);
  }

  @Delete(':id')
  @CustomApiResponse()
  deleteCommentById(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.taskService.deleteTaskById(userId, taskId);
  }
}
