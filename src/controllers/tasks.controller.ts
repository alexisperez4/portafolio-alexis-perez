import { Request, Response, NextFunction } from 'express';
import { db } from "../database/database-config";
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';
import { error } from 'console';


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

