import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';
import { signupSchema } from '../validators/user.validator';
import { UsersInitializer } from '../types/public/Users';
import { createUser } from '../services/user.service';


export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = signupSchema.validate(req.body);
    if (error) {
        logger.error(`SignUn Validation Error: ${error.message}`);
        return next(new AppError(400, error.message));
    }

    try {
        const user_data: UsersInitializer = req.body;
        const { user_email, user_password, first_name, last_name, role } = user_data;
        const user = await createUser({ user_email, user_password, first_name, last_name, role });

        logger.info(`User registred successfully: ${user.user_id}`);
        res.json({ message: 'User registred successfully' });

    } catch (error) {
        logger.error(`SignUp DB Error: ${error}`);
        next(new AppError(500, 'Internal Server Error'));
    }
};


