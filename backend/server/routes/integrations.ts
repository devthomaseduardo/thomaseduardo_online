import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import * as IntegrationController from '../controllers/integration.controller.js';

const router = Router();

router.get('/projects/:projectId/integrations', adminAuth, IntegrationController.getProjectIntegrations);
router.post('/projects/:projectId/integrations', adminAuth, IntegrationController.createIntegration);
router.put('/integrations/:id', adminAuth, IntegrationController.updateIntegration);
router.delete('/integrations/:id', adminAuth, IntegrationController.deleteIntegration);

export default router;
