import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProposals = async (req: Request, res: Response) => {
  try {
    const proposals = await prisma.proposal.findMany({
      include: { client: true, project: true },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(proposals);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createProposal = async (req: Request, res: Response) => {
  try {
    const { title, description, amount, clientId, projectId } = req.body;
    const proposal = await prisma.proposal.create({
      data: { title, description, amount: Number(amount), clientId, projectId, status: 'draft' }
    });
    res.status(201).json(proposal);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProposal = async (req: Request, res: Response) => {
  try {
    const proposal = await prisma.proposal.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(proposal);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProposal = async (req: Request, res: Response) => {
  try {
    await prisma.proposal.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getProposalById = async (req: Request, res: Response) => {
  try {
    const proposal = await prisma.proposal.findUnique({
      where: { id: req.params.id },
      include: { client: true, project: true }
    });
    if (!proposal) return res.status(404).json({ error: 'Proposta não encontrada.' });
    res.json(proposal);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const acceptProposal = async (req: Request, res: Response) => {
  try {
    const updated = await prisma.proposal.update({
      where: { id: req.params.id },
      data: { status: 'approved', acceptedAt: new Date() }
    });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const convertProposalToProject = async (req: Request, res: Response) => {
  try {
    const proposal = await prisma.proposal.findUnique({ where: { id: req.params.id } });
    if (!proposal) return res.status(404).json({ error: 'Proposal não encontrada.' });
    if (!proposal.clientId) return res.status(400).json({ error: 'A proposta precisa de um cliente vinculado para ser convertida em projeto.' });

    const project = await prisma.project.create({
      data: {
        name: proposal.title,
        clientId: proposal.clientId,
        phase: 'Proposta',
        financial: 'pending',
        value: proposal.amount,
        tipo: 'website',
        descricao: proposal.description,
        status: 'proposta',
        progresso: 0
      }
    });

    await prisma.proposal.update({
      where: { id: proposal.id },
      data: { status: 'approved', acceptedAt: new Date(), projectId: project.id }
    });

    res.json({ project, proposalConverted: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
