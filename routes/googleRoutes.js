import { Router } from 'express';
import { googleLogin, googleCallback, createEvent } from '../controllers/googleController.js';

const router = Router();

router.get('/login', googleLogin);
router.get('/callback', googleCallback);
router.post('/event', createEvent);

export default router;
