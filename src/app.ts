import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import path from 'path';
import { taskRoutes } from './routes/tasks.routes';
import { userRoutes } from './routes/user.routes';
import { authenticateJWT } from './middlewares/auth.middleware';
dotenv.config();
const app: Express = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// View engine setup
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index', { title: 'My Express App', message: 'Hello!' });
});

// Task Routes
app.use('/task', authenticateJWT, taskRoutes);

// User Routes
app.use('/user', userRoutes);

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

export default app;

