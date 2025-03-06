import express from "express";
import { verifyToken } from "../middelwares/verifyJWT.js"
import { getStats, deleteVideo, updateVideo } from "../controllers/dashboard.js"


const router = express.Router();
router.use(verifyToken)

router.get("/get-stats", getStats);
router.delete("/:videoId", deleteVideo);
router.patch("/:videoId", updateVideo)


export default router;