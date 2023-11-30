import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './models/task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get('users/:userID')
  async findAllByUserID(@Param('userID') userID: number) {
    return await this.tasksService.findAllByUserID(userID);
  }
  @Get()
  async findTasks(@Query('sortBy') sortBy: string, @Query('orderBy') orderBy: string) {
    return await this.tasksService.findTasks(sortBy, orderBy);
  }

  @Post()
  async createTask(@Body() taskData: Partial<Task>) {
    return await this.tasksService.createTask(taskData);
  }

  @Put()
  async editTask(@Body() updateData: Partial<Task>) {
    const taskID = updateData['id'];
    return await this.tasksService.editTask(taskID, updateData);
  }

  @Patch()
  async completeTask(@Body() completeTaskData: Partial<Task>) {
    return await this.tasksService.completeTask(completeTaskData);
  }
}
