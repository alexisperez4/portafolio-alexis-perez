import { Router, Request, Response } from 'express';
import { db } from '../database/database-config';

export const taskRoutes: Router = Router();

// Get all task
taskRoutes.get('/', async (req: Request, res: Response) => {
  const { rows } = await db.query(`select now();`);
  console.log(rows)
  res.send('Get all tasks')
});

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
