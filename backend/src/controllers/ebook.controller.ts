import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

export const getAllEbooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ebooks = await prisma.ebook.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        coverUrl: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: ebooks });
  } catch (error) {
    next(error);
  }
};

export const getEbookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const ebook = await prisma.ebook.findUnique({
      where: { id },
    });

    if (!ebook) {
      throw new AppError('Ebook not found', 404);
    }

    res.status(200).json({ success: true, data: ebook });
  } catch (error) {
    next(error);
  }
};
