import { Router } from 'express';
import { signUp } from '../controllers/user.controller';

export const userRoutes: Router = Router();

userRoutes.route('/signup')
  .post(signUp);

