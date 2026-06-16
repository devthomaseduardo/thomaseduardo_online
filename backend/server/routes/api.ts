import { Router } from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import { authenticateToken } from '../lib/auth.js';
import * as ClientController from '../controllers/client.controller.js';
import * as ProjectController from '../controllers/project.controller.js';
import * as InvoiceController from '../controllers/invoice.controller.js';
import * as ProposalController from '../controllers/proposal.controller.js';
import * as LeadController from '../controllers/lead.controller.js';
import * as MessageController from '../controllers/message.controller.js';
import * as DashboardController from '../controllers/dashboard.controller.js';
import * as AdminController from '../controllers/admin.controller.js';
import * as TimelineController from '../controllers/timeline.controller.js';
import * as DeployController from '../controllers/deploy.controller.js';
import * as IntegrationController from '../controllers/integration.controller.js';
import * as ContractController from '../controllers/contract.controller.js';
import * as FileController from '../controllers/file.controller.js';
import * as TeamController from '../controllers/team.controller.js';
import * as TaskController from '../controllers/task.controller.js';
import * as CredentialController from '../controllers/credential.controller.js';
import * as MilestoneController from '../controllers/milestone.controller.js';
import { chatWithData } from '../controllers/ai.controller.js';

import { validate } from '../middleware/validate.js';
import { createClientSchema, updateClientSchema } from '../schemas/client.schema.js';
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schema.js';
import { createLeadSchema, updateLeadSchema } from '../schemas/lead.schema.js';
import { createInvoiceSchema, updateInvoiceSchema } from '../schemas/invoice.schema.js';
import { createProposalSchema, updateProposalSchema } from '../schemas/proposal.schema.js';
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema.js';
import { teamMemberSchema } from '../schemas/team.schema.js';

const router = Router();

export default function(upload: any) {
  // ==========================================
  // PUBLIC ROUTES
  // ==========================================
  router.post('/public/contact', LeadController.createPublicContact);
  router.post('/public/chat', chatWithData);

  // ==========================================
  // DEVELOPMENT TOOLS (Protected)
  // ==========================================
  router.post('/dev/wipe', adminAuth, AdminController.wipeDatabase);
  router.post('/dev/seed', adminAuth, AdminController.seedDatabase);

  // ==========================================
  // ANALYTICS & DASHBOARD
  // ==========================================
  router.get('/analytics/kpis', adminAuth, DashboardController.getKPIs);
  router.get('/dashboard', adminAuth, DashboardController.getDashboardData);

  // ==========================================
  // CLIENTES
  // ==========================================
  router.get('/clients', adminAuth, ClientController.getAllClients);
  router.get('/clients/:id', adminAuth, ClientController.getClientById);
  router.post('/clients', adminAuth, validate(createClientSchema), ClientController.createClient);
  router.put('/clients/:id', adminAuth, validate(updateClientSchema), ClientController.updateClient);
  router.delete('/clients/:id', adminAuth, ClientController.deleteClient);
  router.post('/clients/:id/portal-key', adminAuth, ClientController.generatePortalKey);
  router.delete('/clients/:id/portal-key', adminAuth, ClientController.deletePortalKey);

  // ==========================================
  // PROJETOS
  // ==========================================
  router.get('/projects', adminAuth, ProjectController.getAllProjects);
  router.get('/projects/:id', adminAuth, ProjectController.getProjectById);
  router.post('/projects', adminAuth, validate(createProjectSchema), ProjectController.createProject);
  router.put('/projects/:id', adminAuth, validate(updateProjectSchema), ProjectController.updateProject);
  router.delete('/projects/:id', adminAuth, ProjectController.deleteProject);

  // ==========================================
  // TIMELINE
  // ==========================================
  router.get('/projects/:id/timeline', adminAuth, TimelineController.getProjectTimeline);
  router.post('/projects/:id/timeline', adminAuth, TimelineController.createTimelineEvent);
  router.put('/projects/:projectId/timeline/:id', adminAuth, TimelineController.updateTimelineEvent);
  router.delete('/projects/:projectId/timeline/:id', adminAuth, TimelineController.deleteTimelineEvent);

  // ==========================================
  // FINANCEIRO (INVOICES)
  // ==========================================
  router.get('/invoices', adminAuth, InvoiceController.getAllInvoices);
  router.get('/invoices/:id', authenticateToken, InvoiceController.getInvoiceById);
  router.put('/invoices/:id', adminAuth, validate(updateInvoiceSchema), InvoiceController.updateInvoice);
  router.delete('/invoices/:id', adminAuth, InvoiceController.deleteInvoice);
  router.post('/payments/intent', authenticateToken, InvoiceController.createPaymentIntent);
  router.get('/projects/:id/invoices', authenticateToken, InvoiceController.getProjectInvoices);
  router.post('/projects/:id/invoices', adminAuth, validate(createInvoiceSchema), InvoiceController.createInvoice);

  // ==========================================
  // CONTRATOS
  // ==========================================
  router.get('/contracts', adminAuth, ContractController.getAllContracts);
  router.get('/projects/:id/contracts', authenticateToken, ContractController.getProjectContracts);
  router.post('/projects/:id/contracts', adminAuth, ContractController.createContract);
  router.put('/projects/:projectId/contracts/:id', adminAuth, ContractController.updateContract);
  router.delete('/contracts/:id', adminAuth, ContractController.deleteContract);

  // ==========================================
  // DEPLOYS
  // ==========================================
  router.get('/deploys', adminAuth, DeployController.getAllDeploys);
  router.get('/projects/:id/deploys', authenticateToken, DeployController.getProjectDeploys);
  router.post('/projects/:id/deploys', adminAuth, DeployController.createDeploy);
  router.put('/projects/:projectId/deploys/:id', adminAuth, DeployController.updateDeploy);
  router.delete('/deploys/:id', adminAuth, DeployController.deleteDeploy);

  // ==========================================
  // INTEGRAÇÕES
  // ==========================================
  router.get('/projects/:id/integrations', authenticateToken, IntegrationController.getProjectIntegrations);
  router.post('/projects/:id/integrations', adminAuth, IntegrationController.createIntegration);
  router.put('/projects/:projectId/integrations/:id', adminAuth, IntegrationController.updateIntegration);
  router.delete('/integrations/:id', adminAuth, IntegrationController.deleteIntegration);

  // ==========================================
  // ARQUIVOS
  // ==========================================
  router.get('/projects/:id/files', authenticateToken, FileController.getProjectFiles);
  router.post('/projects/:projectId/files', authenticateToken, upload.array('files', 20), FileController.uploadFiles);
  router.put('/projects/:projectId/files/:id', adminAuth, FileController.updateProjectFile);
  router.delete('/projects/:projectId/files/:id', adminAuth, FileController.deleteProjectFile);

  // ==========================================
  // PROPOSTAS
  // ==========================================
  router.get('/proposals', adminAuth, ProposalController.getAllProposals);
  router.get('/proposals/:id', authenticateToken, ProposalController.getProposalById);
  router.post('/proposals', adminAuth, validate(createProposalSchema), ProposalController.createProposal);
  router.put('/proposals/:id', adminAuth, validate(updateProposalSchema), ProposalController.updateProposal);
  router.delete('/proposals/:id', adminAuth, ProposalController.deleteProposal);
  router.post('/proposals/:id/approve', authenticateToken, ProposalController.acceptProposal);
  router.post('/proposals/:id/convert', adminAuth, ProposalController.convertProposalToProject);

  // ==========================================
  // LEADS
  // ==========================================
  router.get('/leads', adminAuth, LeadController.getAllLeads);
  router.post('/leads', adminAuth, validate(createLeadSchema), LeadController.createLead);
  router.put('/leads/:id', adminAuth, validate(updateLeadSchema), LeadController.updateLead);
  router.delete('/leads/:id', adminAuth, LeadController.deleteLead);
  router.post('/leads/:id/convert', adminAuth, LeadController.convertLeadToClient);

  // ==========================================
  // TAREFAS
  // ==========================================
  router.get('/projects/:projectId/tasks', authenticateToken, TaskController.getProjectTasks);
  router.post('/projects/:projectId/tasks', adminAuth, validate(createTaskSchema), TaskController.createProjectTask);
  router.put('/projects/:projectId/tasks/:id', adminAuth, validate(updateTaskSchema), TaskController.updateTask);
  router.delete('/projects/:projectId/tasks/:id', adminAuth, TaskController.deleteTask);

  // ==========================================
  // CREDENCIAIS (COFRE)
  // ==========================================
  router.get('/projects/:projectId/credentials', authenticateToken, CredentialController.getProjectCredentials);
  router.post('/projects/:projectId/credentials', adminAuth, CredentialController.createCredential);
  router.put('/projects/:projectId/credentials/:id', adminAuth, CredentialController.updateCredential);
  router.delete('/projects/:projectId/credentials/:id', adminAuth, CredentialController.deleteCredential);

  // ==========================================
  // MILESTONES / ENTREGAS
  // ==========================================
  router.get('/projects/:projectId/milestones', authenticateToken, MilestoneController.getProjectMilestones);
  router.post('/projects/:projectId/milestones', adminAuth, MilestoneController.createMilestone);
  router.delete('/milestones/:id', adminAuth, MilestoneController.deleteMilestone);
  router.post('/milestones/:id/approve', authenticateToken, MilestoneController.approveMilestone);

  // ==========================================
  // MENSAGENS & MÉTRICAS
  // ==========================================
  router.get('/messages', adminAuth, MessageController.getAllMessages);
  router.get('/projects/:id/messages', authenticateToken, MessageController.getProjectMessages);
  router.post('/projects/:id/messages', authenticateToken, MessageController.createMessage);
  router.post('/metrics', authenticateToken, MessageController.registerMetric);

  // ==========================================
  // EQUIPE
  // ==========================================
  router.get('/team-members', adminAuth, TeamController.getAllTeamMembers);
  router.post('/team-members', adminAuth, validate(teamMemberSchema), TeamController.createTeamMember);
  router.put('/team-members/:id', adminAuth, validate(teamMemberSchema.partial()), TeamController.updateTeamMember);
  router.delete('/team-members/:id', adminAuth, TeamController.deleteTeamMember);

  return router;
}
