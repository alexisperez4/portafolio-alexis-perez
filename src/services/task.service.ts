import { db } from "../database/database-config";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";

export const taskExists = async ({ task_id }: { task_id: number }): Promise<boolean> => {
    try {
        const result = await db.query('SELECT 1 FROM task WHERE task_id = $1', [task_id]);
        return result.rowCount > 0;
    } catch (error) {
        logger.error(`Error checking if task exists: ${error}`);
        throw new AppError(500, 'Internal Server Error');
    }
}
