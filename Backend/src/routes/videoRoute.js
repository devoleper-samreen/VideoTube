import express from 'express';
import {
    publishVideo,
    getVideoById,
    getAllVideos,
    deleteVideo,
    updateVideo
} from '../controllers/video.js';
import { verifyToken } from '../middelwares/verifyJWT.js';
import { upload } from '../middelwares/multur.js';

const router = express.Router()
router.use(verifyToken)

router.post('/', upload.fields([
    {
        name: "video",
        maxCount: 1,
    },
    {
        name: "thumbnail",
        maxCount: 1,
    },

]), publishVideo)

router.get('/:videoId', getVideoById)
router.get('/:userId', getAllVideos)
router.delete('/:videoId', deleteVideo)
router.patch('/:videoId', upload.fields([
    {
        name: "thumbnail",
        maxCount: 1,
    },

]), updateVideo)


export default router;