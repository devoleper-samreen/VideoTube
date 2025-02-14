import express from 'express';
import { publishVideo } from '../controllers/video.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router()
router.use(verifyToken)

router.post('/', publishVideo)

export default router;