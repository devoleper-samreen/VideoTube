import express from "express"
import { searchVideos } from "../controllers/search.js"

const router = express.Router()

router.get('/', searchVideos);

export default router;