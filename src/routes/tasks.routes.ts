import { Router, Request, Response } from 'express';
import { db } from '../database/database-config';
import { createTask, deleteTask, getAllTasks, getTaskByID, updateTask } from '../controllers/tasks.controller';

export const taskRoutes: Router = Router();

taskRoutes.route('/')
  .get(getAllTasks)
  .post(createTask);

taskRoutes.route('/:task_id')
  .get(getTaskByID)
  .put(updateTask)
  .delete(deleteTask);
