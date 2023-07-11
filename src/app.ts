import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { taskRoutes } from './routes/tasks.routes';
dotenv.config();
const app: Express = express();
const port = process.env.PORT;


// Task Routes
app.use('/tasks', taskRoutes);

// Handle errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  switch (statusCode) {
    case 400: // Bad Request
      res.status(400).json({
        status: "error",
        statusCode,
        message: err.message
      });
      break;
    case 404: // Not Found
      res.status(404).json({
        status: "error",
        statusCode,
        message: err.message
      });
      break;
    case 500: // Internal Server Error
    default:
      res.status(500).json({
        status: "error",
        statusCode,
        message: err.message || 'Internal Server Error'
      });
      break;
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


