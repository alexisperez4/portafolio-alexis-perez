import { Router } from 'express';
import { signIn, signUp } from '../controllers/user.controller';

export const userRoutes: Router = Router();

userRoutes.route('/signup')
  .post(signUp);

userRoutes.route('/signin')
  .post(signIn);