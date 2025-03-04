import express from 'express';
import { createComment, getCommentsByVideo, updateComment, deleteComment, getCommentsCountByVideo } from '../controllers/comment.js';

import { verifyToken } from "../middelwares/verifyJWT.js"

const router = express.Router();
router.use(verifyToken)

router.post('/:videoId', createComment);
router.delete('/:videoId', deleteComment);
router.patch('/videoId', updateComment)
router.get('/:videoId', getCommentsByVideo);
router.get('/count/videoId', getCommentsCountByVideo)

export default router;
