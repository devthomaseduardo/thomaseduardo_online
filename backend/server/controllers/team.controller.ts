import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTeamMembers = async (req: Request, res: Response) => {
  try {
    const team = await prisma.teamMember.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(team);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createTeamMember = async (req: Request, res: Response) => {
  try {
    const { name, email, role, permissions, active } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'name e email são obrigatórios.' });

    const member = await prisma.teamMember.create({
      data: {
        name,
        email,
        role: role ?? 'editor',
        permissions: permissions ? JSON.stringify(permissions) : undefined,
        active: active ?? true
      }
    });
    res.status(201).json(member);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTeamMember = async (req: Request, res: Response) => {
  try {
    const { name, email, role, permissions, active } = req.body;
    const member = await prisma.teamMember.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(role !== undefined && { role }),
        ...(permissions !== undefined && { permissions: JSON.stringify(permissions) }),
        ...(active !== undefined && { active })
      }
    });
    res.json(member);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTeamMember = async (req: Request, res: Response) => {
  try {
    await prisma.teamMember.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
