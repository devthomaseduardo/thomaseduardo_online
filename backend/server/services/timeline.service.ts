import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addTimeline = async (projectId: string, titulo: string, descricao: string, tipo: string, visivelCliente = false) => {
  try {
    await (prisma as any).timelineEvent.create({
      data: { 
        projectId, 
        titulo, 
        descricao, 
        tipo, 
        visivelCliente, 
        criadoPor: 'admin' 
      }
    });
  } catch (e) {
    console.warn('Timeline event failed:', e);
  }
};
