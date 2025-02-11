import express from "express"
import { registration } from "../controllers/userAuth.js"

const router = express.Router();

router.post('/register', registration)
router.post('/login', login)

export default router