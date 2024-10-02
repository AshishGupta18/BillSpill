import express from 'express';
import { createGroup, getGroups } from '../controllers/groupContoller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createGroup);
router.get('/', authMiddleware, getGroups);

export default router;