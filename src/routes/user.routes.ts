import { Router } from 'express';
import { signIn, signUp, signOut } from '../controllers/user.controller';

export const userRoutes: Router = Router();

userRoutes.route('/signup')
  .post(signUp);

userRoutes.route('/signin')
  .post(signIn);

userRoutes.route('/signout')
  .post(signOut);
