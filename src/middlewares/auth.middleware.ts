import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

// Extend Express' Request object to include a user property.
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.auth;
        if (token) {
            const user = verify(token, process.env.JWT_SECRET as string);
            req.user = user;
            next();
        } else {
            res.sendStatus(401);
        }        
    } catch (error) {
        logger.error(`Invalid Token. ${error}`);
        res.sendStatus(401);
    }
};
