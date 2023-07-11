import { Router, Request, Response } from 'express';
import { db } from '../database/database-config';
import { getAllTasks } from '../controllers/tasks.controller';

export const taskRoutes: Router = Router();

// Get all task
taskRoutes.get('/', getAllTasks);

// Get task by ID
taskRoutes.get('/:task_id', (req: Request, res: Response) => {
  
});

// Create task
taskRoutes.post('/', (req: Request, res: Response) => {
  
});

// Update task by ID
taskRoutes.put('/:task_id', (req: Request, res: Response) => {
  
});

// Delete task by ID
taskRoutes.delete('/:task_id', (req: Request, res: Response) => {
  
});
