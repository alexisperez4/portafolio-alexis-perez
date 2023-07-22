import { Router, Request, Response } from 'express';
import { db } from '../database/database-config';
import { createTask, deleteTaskById, getAllTasks, getTaskById, updateTask } from '../controllers/tasks.controller';

export const taskRoutes: Router = Router();

taskRoutes.route('/')
  .get(getAllTasks)
  .post(createTask)
  .delete(deleteTaskById)
  .put(updateTask);

taskRoutes.route('/:task_id')
  .get(getTaskById);

