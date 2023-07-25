import bcrypt from 'bcrypt';
import { logger } from '../utils/logger';
import { AppError } from '../utils/AppError';
import { UsersUserId } from '../types/public/Users';
import jwt from 'jsonwebtoken';
import UserRole from '../types/public/UserRole';

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

interface IComparePassword {
    user_password: string;
    stored_password: string;
}

export const comparePassword = async ({user_password, stored_password}: IComparePassword) => {
    try {
        return await bcrypt.compare(user_password, stored_password);
    } catch (error) {
        throw new Error('Comparison failed');
    }
};


interface IGenerateToken {
    user_id: UsersUserId;
    user_email: string;  
    first_name: string;
    last_name: string;
    role: UserRole | null;
}

export const generateToken = ({
    user_id, 
    user_email, 
    first_name, 
    last_name, 
    role
}: IGenerateToken) => {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error('JWT Secret not configured');
    }
    const token = jwt.sign({ 
        user_id,
        user_email,
        first_name,
        last_name,
        role
    }, secretKey, {
        expiresIn: '2h',
    });

    return token;
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
