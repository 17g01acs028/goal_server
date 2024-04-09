import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.js";
import express from "express";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


router.post('/', verifyToken, createCategory);
router.get('/', verifyToken, getAllCategories);
router.get('/:id', verifyToken, getCategory);
router.delete('/:id', verifyToken, deleteCategory);
router.put('/:id', verifyToken, updateCategory);

export default router;
