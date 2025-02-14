import express from 'express';
import { publishVideo } from '../controllers/video.js';
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

export default router;