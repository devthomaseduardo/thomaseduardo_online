import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../lib/auth.js';

const prisma = new PrismaClient();

export default function(upload: any) {
  const router = express.Router();

  router.post('/:projectId/files', authenticateToken, upload.array('files', 20), async (req: any, res: any) => {
    try {
      const { projectId } = req.params;
      const category = req.body.category || 'other';
      const uploadedFiles = req.files as Express.Multer.File[];

      if (!uploadedFiles || uploadedFiles.length === 0) return res.status(400).json({ error: 'Nenhum arquivo enviado' });

      const project = await prisma.project.findFirst({ where: { id: projectId, clientId: req.user.id } });
      if (!project) return res.status(403).json({ error: 'Projeto não encontrado ou sem permissão' });

      const records = await Promise.all(uploadedFiles.map(f =>
        prisma.projectFile.create({
          data: {
            originalName: f.originalname,
            fileName: f.filename,
            mimeType: f.mimetype,
            size: f.size,
            path: `/uploads/${projectId}/${f.filename}`,
            category,
            uploadedBy: 'client',
            projectId
          }
        })
      ));

      res.json({ success: true, files: records });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Falha no upload dos arquivos' });
    }
  });

  return router;
}
