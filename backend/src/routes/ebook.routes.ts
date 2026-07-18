import { Router } from 'express';
import { getAllEbooks, getEbookById } from '../controllers/ebook.controller';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/', getAllEbooks);
router.get('/:id', requireAuth, getEbookById); // Protected route: Requires login to read

export { router as ebookRouter };
