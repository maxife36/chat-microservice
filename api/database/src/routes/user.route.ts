import { Router } from "express";
import {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user.controllers";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
