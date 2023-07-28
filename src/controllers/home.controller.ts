import { Request, Response, NextFunction } from "express";
import { db } from "../database/database-config";
import { logger } from "../utils/logger";
import { AppError } from "../utils/AppError";

export const homePage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await db.query('SELECT content FROM homepage WHERE id = $1', [1]);
        const content = result.rows[0].content;
        const isAuthenticated = req.user ? true : false;
        res.render('home', { content, isAuthenticated });
    } catch (error) {
        logger.error(`Error retrieving home page: ${error}`);
        next(new AppError(500, 'Internal Server Error'));
    }
}