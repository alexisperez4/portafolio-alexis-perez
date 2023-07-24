import bcrypt from 'bcrypt';
import { logger } from '../utils/logger';
import { AppError } from '../utils/AppError';

interface IEncryptPassword {
    user_password: string;
    saltRounds?: number;
}
export const encryptPassword = async ({user_password, saltRounds = 10}: IEncryptPassword) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(user_password, salt);
        return hashedPassword;
    } catch (error) {
        logger.error('Error encrypting password:', error);
        throw new AppError(500, 'Internal Server Error');
    }
};




















// // src/services/auth.service.ts

// import jwt from 'jsonwebtoken';
// import { UsersInitializer } from '../types/public/Users';
 

// const SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret_key';

// export const createToken = (user: UsersInitializer) => {
//   const payload = {
//     id: user.user_id,
//     email: user.user_email,
//     role: user.role
//   };

//   return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
// };

// export const verifyToken = (token: string) => {
//   try {
//     return jwt.verify(token, SECRET_KEY);
//   } catch (err) {
//     return null;
//   }
// };
