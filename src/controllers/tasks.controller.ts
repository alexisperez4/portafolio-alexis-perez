import { Request, Response, NextFunction } from 'express';
import { db } from "../database/database-config";
import { AppError } from '../app';

  


export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await db.query('SELECT * FROM tasks;');
        const tasks = result.rows;
        res.json(tasks);
    } catch (error) {
        console.error(error); 
        next(new AppError(500, 'Se produjo un error interno del servidor'));
    }
};

