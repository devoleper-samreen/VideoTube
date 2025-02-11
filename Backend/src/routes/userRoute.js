import express from "express"
import { registration, login, logout, verifyEmail } from "../controllers/userAuth.js"
import { verifyToken } from "../middelwares/verifyJWT.js"

const router = express.Router();

router.post('/register', registration)
router.post('/login', login)
router.post('/logout', verifyToken, logout)
router.post('/verify-email', verifyEmail)

export default router