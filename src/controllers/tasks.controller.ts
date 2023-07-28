import { Request, Response, NextFunction } from 'express';
import { db } from "../database/database-config";
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';
import { createtaskSchema, taskIdSchema, updateTaskSchema } from '../validators/task.validator';
import { taskExists } from '../services/task.service';
import { TaskInitializer } from '../types/public/Task';


export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await db.query('SELECT * FROM task;');
        const tasks = result.rows;
        const isAuthenticated = req.user ? true : false;
        res.render('task/allTasks', { tasks, isAuthenticated });
    } catch (error) {
        logger.error(error);
        next(new AppError(500, 'Internal Server Error'));
    }
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = taskIdSchema.validate(req.params);
    if (error) {
        logger.error(error);
        return next(new AppError(400, error.message));
    }

    const { task_id } = req.params;
    if (!(await taskExists({ task_id: Number(task_id) }))) {
        return next(new AppError(404, 'Task not found'));
    }

    try {
        const result = await db.query('SELECT * FROM task WHERE task_id = $1', [task_id]);
        const task = result.rows[0];
        const isAuthenticated = req.user ? true : false;
        res.render('task/taskDetail', { task, isAuthenticated });
    
    } catch (error) {
        logger.error(error);
        next(new AppError(500, 'Internal Server Error'));
    }
}


export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = createtaskSchema.validate(req.body);
    if (error) {
        logger.error(`Create Task Validation Error: ${error.message}`);
        return next(new AppError(400, error.message));
    }


    try {
        const task_data: TaskInitializer = req.body;
        const { task_title, task_description, task_status } = task_data;

        const result = await db.query(`
            INSERT INTO task (task_title, task_description, task_status) 
            VALUES($1, $2, $3) RETURNING *`, [task_title, task_description, task_status]
        );
        const task = result.rows[0];
        logger.info(`Task created successfully: ${task.task_id}`);
        res.json(task);

    } catch (error) {
        logger.error(`Create Task DB Error: ${error}`);
        next(new AppError(500, 'Internal Server Error'));
    }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateTaskSchema.validate(req.body);
    if (error) {
        logger.error(`Update Task Validation Error: ${error.message}`);
        return next(new AppError(400, error.message));
    }

    const task_id = req.params.task_id;
    const { task_title, task_description, task_status } = req.body;
    if (!(await taskExists({ task_id : Number(task_id) }))) {
        return next(new AppError(404, 'Task not found'));
    }

    try {
        const result = await db.query(`
            UPDATE task SET task_title = $1, task_description = $2, task_status = $3
            WHERE task_id = $4 RETURNING *`,
            [task_title, task_description, task_status, task_id]
        );
        const updated_task = result.rows[0];
        logger.info(`Task updated successfully: ${updated_task.task_id}`);
        res.json(updated_task);

    } catch (error) {
        logger.error(`Update Task DB Error: ${error}`);
        next(new AppError(500, 'Internal Server Error'));
    }

}

export const deleteTaskById = async (req: Request, res: Response, next: NextFunction) => {
    const { task_id } = req.params;
    const { error } = taskIdSchema.validate({ task_id });
    if (error) {
        logger.error(`Delete Task Validation Error: ${error.message}`);
        return next(new AppError(400, error.message));
    }
    
    if (!(await taskExists({ task_id: Number(task_id) }))) {
        return next(new AppError(404, 'Task not found'));
    }

    try {
        const result = await db.query(`
            DELETE FROM task WHERE task_id = $1 RETURNING *`,
            [task_id]
        );
        const deleted_task = result.rows[0];
        logger.info(`Task deleted successfully: ${deleted_task.task_id}`);
        res.json(deleted_task);

    } catch (error) {
        logger.error(`Delete Task DB Error: ${error}`);
        next(new AppError(500, 'Internal Server Error'));
    }
}

export const renderCreateTaskForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isAuthenticated = req.user ? true : false;
        res.render('task/createTask', { isAuthenticated });
    } catch (error) {
        logger.error(`Show Create Task Form Error: ${error}`);
        next(new AppError(500, 'Internal Server Error'));
    }
}

export const renderUpdateTaskForm = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = taskIdSchema.validate(req.params);
    if (error) {
        logger.error(error);
        return next(new AppError(400, error.message));
    }
    
    const { task_id } = req.params;
    try {
        const result = await db.query('SELECT * FROM task WHERE task_id = $1', [task_id]);
        const task = result.rows[0];
        const isAuthenticated = req.user ? true : false;
        res.render('task/updateTask', { task, isAuthenticated });
    } catch (error) {
        logger.error(`Render Update Task Form Error: ${error}`);
        next(new AppError(500, 'Internal Server Error'));
    }
}
