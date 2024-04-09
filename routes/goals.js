import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createGoal, deleteGoal, getAllGoals, getCompletedGoalsByUser, getGoal, getGoalsByCategory, getGoalsByUserAndCategory, getUnCompletedGoalsByUser, updateGoal, userGoals } from "../controllers/goals.js";

const router = express.Router();

router.post('/', verifyToken, createGoal);
router.get('/:id', verifyToken, getGoal);
router.get('/user/:id', verifyToken, userGoals);
router.get('/user/complete/:id', verifyToken, getCompletedGoalsByUser);
router.get('/user/incomplete/:id', verifyToken, getUnCompletedGoalsByUser);
router.get('/:categoryId', verifyToken, getGoalsByCategory);
router.delete('/:id', verifyToken, deleteGoal);
router.put('/:id', verifyToken, updateGoal);

export default router;
