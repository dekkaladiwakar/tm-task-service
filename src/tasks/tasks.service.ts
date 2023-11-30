import { Injectable } from '@nestjs/common';
import { TaskRepository } from './tasks.repository';
import { Task } from './models/task.model';

@Injectable()
export class TasksService {
    constructor(
        private readonly taskRepository: TaskRepository,
    ) { }

    async findAllByUserID(userID: number) {
        return await this.taskRepository.findAllByUserID(userID);
    }
    async findTasks(sortBy = 'dueDate', orderBy: string) {

        if(orderBy !== 'ASC' && orderBy !==  'DESC') {
            orderBy = 'ASC'
        }

        const order = [];
        if (['completedAt', 'dueDate', 'priority'].includes(sortBy)) {
            order.push([sortBy, orderBy]);
        }
        return await this.taskRepository.findAll(order);
    }

    async createTask(taskData: Partial<Task>) {
        return await this.taskRepository.create(taskData);
    }

    async editTask(taskID: number, updateData: Partial<Task>) {
        return await this.taskRepository.update(taskID, updateData);
    }

    async completeTask(completeTaskData: Partial<Task>) {
        await this.taskRepository.complete(completeTaskData);
    }
}
