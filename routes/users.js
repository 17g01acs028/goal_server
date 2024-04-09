import express from "express";
import {
  getUser,
  getUsers,
  updateUser,
  addUser,
  changeUserPassword,
  deleteUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/", verifyToken, getUsers);
router.put("/:id", verifyToken, updateUser);
router.post("/", verifyToken, addUser);
router.delete("/:id", verifyToken, deleteUser);
router.put("/change_password/:id", verifyToken, changeUserPassword);

/* UPDATE */
//router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
