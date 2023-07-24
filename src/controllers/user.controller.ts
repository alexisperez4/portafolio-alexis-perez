import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';
import { signinSchema, signupSchema } from '../validators/user.validator';
import { UsersInitializer } from '../types/public/Users';
import { createUser, getUserByEmail } from '../services/user.service';
import { comparePassword, generateToken } from '../services/auth.service';
import { serialize } from 'cookie';


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



export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = signinSchema.validate(req.body);
    if (error) {
        logger.error(`SignIn Validation Error: ${error.message}`);
        return next(new AppError(400, error.message));
    }

    try {
        const user_data: UsersInitializer = req.body;
        const { user_email, user_password } = user_data;

        const user_data_from_db = await getUserByEmail({ user_email });

        if (user_data_from_db && user_data_from_db.length > 0) {
            const user_data = user_data_from_db[0];
            const stored_password = user_data.user_password;
            const password_match = await comparePassword({ user_password, stored_password });

            if (password_match) {
                // generate and send token to user
                const token = generateToken({ user_id: user_data.user_id });
                const cookie = serialize('auth', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 3600 * 2,
                    path: '/',
                });

                logger.info(`User logged in successfully: ${user_data.user_id}`);

                res.setHeader('Set-Cookie', cookie);
                res.json({ message: 'Logged in successfully', user_id: user_data.user_id, token });

            } else {
                logger.error('SignIn Error: Invalid password');
                next(new AppError(401, 'Invalid password'));
            }

        } else {
            logger.error('SignIn Error: User not found');
            next(new AppError(404, 'User not found'));
        }

    } catch (error) {
        logger.error(`SignIn DB Error: ${error}`);
        next(new AppError(500, 'Internal Server Error'));
    }
};

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('auth');
      res.json({ message: 'User signed out successfully' });
    } catch (error) {
      logger.error(`SignOut Error: ${error}`);
      next(new AppError(500, 'Internal Server Error'));
    }
  };
  

