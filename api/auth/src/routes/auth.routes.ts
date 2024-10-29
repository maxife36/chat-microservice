import { Router } from 'express';
import authController from '../controllers/auth.controllers';
import loggedAuthenticate from '../middlewares/loggedAuthenticate';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.patch('/update-profile', loggedAuthenticate,  authController.updateProfile);

export default router;
