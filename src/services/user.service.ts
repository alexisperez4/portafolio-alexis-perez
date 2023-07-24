import { db } from "../database/database-config";
import { UsersInitializer } from "../types/public/Users";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";
import { encryptPassword } from "./auth.service";


export const createUser = async ({ user_email, user_password, first_name, last_name, role }: UsersInitializer) => {
    try {
        const password_encrypted = await encryptPassword({ user_password });
        const new_user = await db.query(`
            INSERT INTO users (user_email, user_password, first_name, last_name, role)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [user_email, password_encrypted, first_name, last_name, role]
        );
        return new_user.rows[0];

    } catch (error) {
        logger.error(`createUser DB Error: ${error}`);
        throw new AppError(500, `Internal Server Error.`);
    }
}

