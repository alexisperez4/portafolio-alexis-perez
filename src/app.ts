import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { taskRoutes } from './routes/tasks.routes';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

export class AppError extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}


// Task Routes
app.use('/tasks', taskRoutes);

// Handle errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Se produjo un error interno del servidor';
  
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


