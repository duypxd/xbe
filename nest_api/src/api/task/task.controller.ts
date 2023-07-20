import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
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
import { PaginationDto } from 'src/common/dto/pagination.dto';

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
  @CustomApiResponse(true)
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  getMyTasks(@Query() params: PaginationDto, @GetUser('id') userId: number) {
    const page = Number(params.page ?? 1);
    const perPage = Number(params.perPage ?? 10);
    params = { page, perPage };
    return this.taskService.getMyTasks(userId, params);
  }

  @Get()
  @CustomApiResponse(true)
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'page', required: false })
  getTasks(@Query() params: PaginationDto) {
    const page = Number(params.page ?? 1);
    const perPage = Number(params.perPage ?? 10);
    params = { page, perPage };
    return this.taskService.getTasks(params);
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
