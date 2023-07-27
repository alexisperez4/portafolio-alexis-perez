import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import UserRole from '../types/public/UserRole';

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
        }        
        next();
    } catch (error) {
        logger.error(`Invalid Token. ${error}`);
        res.sendStatus(401);
    }
};


export const authorizeRoles = (roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).send('Unauthorized');
        }

        const hasRole = roles.indexOf(req.user.role) > -1;
        if (!hasRole) {
            return res.status(403).send('Forbidden');
        }

        next();
    };
};
