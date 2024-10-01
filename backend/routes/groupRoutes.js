import { Router } from 'express';
import { createGroup } from '../controllers/groupController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createGroup);

// Additional routes for group management (add expense, view expenses, etc.) can be added here

export default router;