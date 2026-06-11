import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import * as CredentialController from '../controllers/credential.controller.js';

const router = Router();

router.get('/projects/:projectId/credentials', adminAuth, CredentialController.getProjectCredentials);
router.post('/projects/:projectId/credentials', adminAuth, CredentialController.createCredential);
router.put('/credentials/:id', adminAuth, CredentialController.updateCredential);
router.delete('/credentials/:id', adminAuth, CredentialController.deleteCredential);

export default router;
