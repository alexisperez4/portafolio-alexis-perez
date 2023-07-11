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
        console.log(task)
        res.json(task);
        
    } catch (error) {
        logger.error(error);
        next(new AppError(500, 'Internal Server Error'));
    }
}

export const createTask =async () => {
    
}

export const updateTask =async () => {
    
}

export const deleteTask =async () => {
    
}