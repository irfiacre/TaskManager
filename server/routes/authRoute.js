import express from 'express';
import { validateSignupData } from '../middleware/validate';
import { signup } from '../controllers/authController';

const authRouter = express.Router();
authRouter.post('/v1/signup', validateSignupData, signup);

export default authRouter;
