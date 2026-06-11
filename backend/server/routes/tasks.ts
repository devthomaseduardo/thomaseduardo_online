import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import * as TaskController from '../controllers/task.controller.js';

const router = Router();

router.get('/projects/:projectId/tasks', TaskController.getProjectTasks);
router.post('/projects/:projectId/tasks', adminAuth, TaskController.createProjectTask);
router.put('/tasks/:id', adminAuth, TaskController.updateTask);
router.delete('/tasks/:id', adminAuth, TaskController.deleteTask);

export default router;
