import { Router } from "express";
import {
    getAllUsers,
    getUser,
    getUserFilter,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/user.controllers";

const router = Router();

router.get("/", getAllUsers);
router.get("/filter", getUserFilter);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
