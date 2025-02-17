import express from 'express';
import { addLike, deleteLike, getLikesByVideo, getLikesCountByVideo } from '../controllers/like.js';

const router = express.Router();

router.post('/:videoId', addLike);
router.post('/unlike/:videoId', deleteLike);
router.get('/:videoId', getLikesByVideo);
router.get('/count/videoId', getLikesCountByVideo)

export default router;
