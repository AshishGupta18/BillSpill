import express from 'express';
import { addExpense, getExpenses } from '../controllers/expenseController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addExpense);
router.get('/:groupId', authMiddleware, getExpenses);

export default router;