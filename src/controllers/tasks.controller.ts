import { Request, Response, NextFunction } from 'express';
import { db } from "../database/database-config";
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';


export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await db.query('SELECT * FROM task;');
        const tasks = result.rows;
        res.json(tasks);
    } catch (error) {
        logger.error(error);
        next(new AppError(500, 'Internal Server Error'));
    }
};


export const getTaskByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { task_id } = req.params;

        const result = await db.query('SELECT * FROM task WHERE task_id = $1', [task_id]);
        const task = result.rows;
        res.json(task);
        
    } catch (error) {
        logger.error(error);
        next(new AppError(500, 'Internal Server Error'));
    }
}

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { task_title, task_description, status_id } = req.body;
        const result = await db.query(`
            INSERT INTO task (task_title, task_description, status_id) 
            VALUES($1, $2, $3) RETURNING *`, [task_title, task_description, status_id]
        );
        const task = result.rows;
        res.json(task);

    } catch (error) {
        logger.error(error);
        next(new AppError(500, 'Internal Server Error'));
    }
}

export const updateTask =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { task_id, task_title, task_description, status_id } = req.body;
        
        const result = await db.query(`
            UPDATE task SET task_title = $1, task_description = $2, status_id = $3
            WHERE task_id = $4 RETURNING *`,
            [task_title, task_description, status_id, task_id]
        );
        const updated_task = result.rows;
        res.json(updated_task)
        
    } catch (error) {
        logger.error(error);
        next(new AppError(500, 'Internal Server Error'));
    }
    
}

export const deleteTask =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { task_id } = req.body;

        const result = await db.query(`
            DELETE FROM task WHERE task_id = $1 RETURNING *`,
            [task_id]
        );
        const deleted_task = result.rows;
        res.json(deleted_task);

    } catch (error) {
        logger.error(error);
        next(new AppError(500, 'Internal Server Error'));
    }
}