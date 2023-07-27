import { Router } from 'express';
import { signIn, signUp, signOut, showSignUpForm, showSignInForm } from '../controllers/user.controller';

export const userRoutes: Router = Router();

userRoutes.route('/signup')
  .get(showSignUpForm)
  .post(signUp);

userRoutes.route('/signin')
  .get(showSignInForm)
  .post(signIn);

userRoutes.route('/signout')
  .post(signOut);
