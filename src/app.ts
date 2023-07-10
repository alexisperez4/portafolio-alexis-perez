import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { taskRoutes } from './routes/tasks.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Task Routes
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


