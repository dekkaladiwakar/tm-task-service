import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Task } from "./models/task.model";
import { Op } from "sequelize";

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task)
    private readonly repository: typeof Task,
  ) { }

  async findAllByUserID(userID: number) {
    try {
      return this.repository.findAll({
        where: {
          userID: {
            [Op.eq]: userID,
          }
        }
      })
    } catch (error) {
      console.error('Error finding user tasks: ', error);
      throw error;
    }
  }

  async findOne(taskID: number, userID: number) {
    try {
      return await this.repository.findOne({
        where: {
          [Op.and]: [
            {id: taskID},
            {userID: userID}
          ]
        }
      });
    } catch (error) {
      console.error('Error finding user tasks: ', error);
      throw error;
    }
  }
  async findByPk(taskID: number) {
    try {
      return await this.repository.findByPk(taskID);
    } catch (error) {
      console.error('Error retrieving task: ', error);
      throw error;
    }
  }
  async findAll(order: Array<any>) {
    try {
      console.log(order);
      const tasks = await this.repository.findAll({ order: order });
      return tasks;
    } catch (error) {
      console.error('Error retrieving tasks:', error);
      throw error;
    }
  }

  async create(taskData: Partial<Task>) {
    try {
      const task = await this.repository.create(taskData);
      return task;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async update(taskID: number, updateData: Partial<Task>) {
    try {
      const task = await this.findByPk(taskID);

      await task.update(updateData);
      return task;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async complete(completeTaskData: Partial<Task>) {
    try {
      const task = await this.findOne(completeTaskData.id, completeTaskData.userID);

      await task.update({ isCompleted: completeTaskData.isCompleted, completedAt: completeTaskData.completedAt ? completeTaskData.completedAt: new Date() });
      return task;
    } catch (error) {
      console.error('Error completing task:', error);
      throw error;
    }
  }
}
