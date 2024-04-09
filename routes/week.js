import express from 'express';
import { createWeek, getAllWeeks, getWeekById, updateWeek, deleteWeek, getUserWeeks } from '../controllers/week.js';
import { verifyToken } from "../middleware/auth.js"; 

const router = express.Router();

router.post('/', verifyToken, createWeek);
router.get('/', verifyToken, getAllWeeks);
router.get('/user/:id', verifyToken, getUserWeeks);
router.get('/:id', verifyToken, getWeekById);
router.put('/:id', verifyToken, updateWeek);
router.delete('/:id', verifyToken, deleteWeek);

export default router;
