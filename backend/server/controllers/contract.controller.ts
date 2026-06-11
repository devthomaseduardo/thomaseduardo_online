import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { addTimeline } from '../services/timeline.service.js';

const prisma = new PrismaClient();

export const getProjectContracts = async (req: Request, res: Response) => {
  try {
    const { projectId, id } = req.params;
    const contracts = await (prisma as any).contract.findMany({
      where: { 
        projectId: projectId || id,
        ...((req as any).user?.role !== 'admin' ? { visivelCliente: true } : {})
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar contratos.' });
  }
};

export const getAllContracts = async (req: Request, res: Response) => {
  try {
    const contracts = await (prisma as any).contract.findMany({
      include: { project: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar contratos.' });
  }
};

export const createContract = async (req: Request, res: Response) => {
  try {
    const { projectId, id } = req.params;
    const { titulo, status, versao, fileUrl, visivelCliente } = req.body;
    if (!titulo) return res.status(400).json({ error: 'titulo é obrigatório.' });

    const contract = await (prisma as any).contract.create({
      data: {
        projectId: projectId || id,
        titulo,
        status: status ?? 'rascunho',
        versao: versao ?? '1.0',
        fileUrl,
        visivelCliente: visivelCliente ?? false,
        ...(status === 'enviado' ? { enviadoEm: new Date() } : {}),
        ...(status === 'assinado' ? { assinadoEm: new Date() } : {})
      }
    });

    if (status === 'enviado') {
      await addTimeline(projectId || id, 'Contrato Enviado', `Contrato "${titulo}" enviado para o cliente.`, 'contrato', true);
    }

    res.status(201).json(contract);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateContract = async (req: Request, res: Response) => {
  try {
    const { projectId, id } = req.params;
    const { status, fileUrl, visivelCliente, titulo } = req.body;
    const contract = await (prisma as any).contract.update({
      where: { id },
      data: {
        ...(titulo !== undefined && { titulo }),
        ...(status !== undefined && { status }),
        ...(fileUrl !== undefined && { fileUrl }),
        ...(visivelCliente !== undefined && { visivelCliente }),
        ...(status === 'assinado' ? { assinadoEm: new Date() } : {})
      }
    });

    if (status === 'assinado' && projectId) {
      await addTimeline(projectId, 'Contrato Assinado', 'O contrato foi assinado pelo cliente.', 'contrato', true);
    }

    res.json(contract);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteContract = async (req: Request, res: Response) => {
  try {
    await (prisma as any).contract.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Contrato removido.' });
  } catch (err: any) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Contrato não encontrado.' });
    res.status(500).json({ error: 'Erro ao excluir contrato.' });
  }
};
