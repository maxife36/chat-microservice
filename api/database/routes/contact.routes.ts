import { Router } from "express";
import {
    getAllContacts,
    getContactRegister,
    getUserContacts,
    createContact,
    updateContact,
    deleteContact
} from "../controllers/contact.controllers";

const router = Router();

router.get("/", getAllContacts);
router.get("/user/:userId", getUserContacts);
router.get("/:id", getContactRegister);
router.post("/", createContact);
router.patch("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
