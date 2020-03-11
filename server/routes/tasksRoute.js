import express from 'express';
import TaskController from '../controllers/TaskController';
import { validateCreateTask } from '../middleware/validate';
import Auth from '../middleware/authorisation';

const taskRoute = express.Router();

taskRoute.get('/v1/tasks', Auth.access, TaskController.getCollection);
taskRoute.post('/v1/tasks', [Auth.access, validateCreateTask], TaskController.create);
taskRoute.delete('/v1/tasks/:id',Auth.access, TaskController.delete);
taskRoute.get('/v1/task', Auth.access, TaskController.View);

export default taskRoute;
