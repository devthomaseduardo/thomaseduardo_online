import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import { authenticateToken } from '../lib/auth.js';
import * as MilestoneController from '../controllers/milestone.controller.js';

const router = Router();

router.get('/projects/:projectId/milestones', MilestoneController.getProjectMilestones);
router.post('/projects/:projectId/milestones', adminAuth, MilestoneController.createMilestone);
router.post('/milestones/:id/approve', authenticateToken, MilestoneController.approveMilestone);
router.delete('/milestones/:id', adminAuth, MilestoneController.deleteMilestone);

export default router;
