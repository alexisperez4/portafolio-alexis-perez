import { Router } from 'express';
import { createTask, 
  renderCreateTaskForm, 
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTask,
  renderUpdateTaskForm
} from '../controllers/tasks.controller';
import { authorizeRoles } from '../middlewares/auth.middleware';
import UserRole from '../types/public/UserRole';

export const taskRoutes: Router = Router();

taskRoutes.route('/')
  .get(
    authorizeRoles([UserRole.admin, UserRole.user, UserRole.guest]),
    getAllTasks
  )
  .post(
    authorizeRoles([UserRole.admin, UserRole.user]),
    createTask
  );

  taskRoutes.route('/create')
  .get(
    authorizeRoles([UserRole.admin, UserRole.user]),
    renderCreateTaskForm
  );


  taskRoutes.route('/:task_id')
  .get(
    authorizeRoles([UserRole.admin, UserRole.user, UserRole.guest]),
    getTaskById
  )
  .delete(
    authorizeRoles([UserRole.admin]),
    deleteTaskById
  )
  .put(authorizeRoles([UserRole.admin, UserRole.user]),
    updateTask
  );

  taskRoutes.route('/:task_id/edit')
  .get(
    authorizeRoles([UserRole.admin, UserRole.user]),
    renderUpdateTaskForm
  );
