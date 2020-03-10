import express from 'express';
import { validateSignupData, validateSignin } from '../middleware/validate';
import { signup, signin } from '../controllers/authController';

const authRouter = express.Router();
authRouter.post('/v1/signup', validateSignupData, signup);
authRouter.post('/v1/signin', validateSignin, signin);

export default authRouter;
