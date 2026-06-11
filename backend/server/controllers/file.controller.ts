import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjectFiles = async (req: Request, res: Response) => {
  try {
    const { projectId, id } = req.params;
    const files = await prisma.projectFile.findMany({
      where: { 
        projectId: projectId || id,
        ...((req as any).user?.role !== 'admin' ? { visivelCliente: true } : {})
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar arquivos.' });
  }
};

export const uploadFiles = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const category = req.body.category || 'other';
    const uploadedFiles = req.files as Express.Multer.File[];

    if (!uploadedFiles || uploadedFiles.length === 0) return res.status(400).json({ error: 'Nenhum arquivo enviado' });

    // Se for admin, permitimos qualquer projeto. Se for cliente (via authenticateToken), verificamos dono.
    const isAdmin = (req as any).user?.role === 'admin' || (req as any).headers['x-admin-key'];
    
    if (!isAdmin) {
      const project = await prisma.project.findFirst({ where: { id: projectId, clientId: (req as any).user.id } });
      if (!project) return res.status(403).json({ error: 'Projeto não encontrado ou sem permissão' });
    }

    const records = await Promise.all(uploadedFiles.map(f =>
      prisma.projectFile.create({
        data: {
          originalName: f.originalname,
          fileName: f.filename,
          mimeType: f.mimetype,
          size: f.size,
          path: `/uploads/${projectId}/${f.filename}`,
          category,
          uploadedBy: isAdmin ? 'admin' : 'client',
          projectId
        }
      })
    ));

    res.json({ success: true, files: records });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falha no upload dos arquivos' });
  }
};

export const updateProjectFile = async (req: Request, res: Response) => {
  try {
    const { status, visivelCliente } = req.body;
    const file = await prisma.projectFile.update({
      where: { id: req.params.id },
      data: { status, visivelCliente }
    });
    res.json(file);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProjectFile = async (req: Request, res: Response) => {
  try {
    await prisma.projectFile.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
