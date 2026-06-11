import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import * as ContractController from '../controllers/contract.controller.js';

const router = Router();

router.get('/projects/:projectId/contracts', adminAuth, ContractController.getProjectContracts);
router.post('/projects/:projectId/contracts', adminAuth, ContractController.createContract);
router.put('/contracts/:id', adminAuth, ContractController.updateContract);
router.delete('/contracts/:id', adminAuth, ContractController.deleteContract);

export default router;
