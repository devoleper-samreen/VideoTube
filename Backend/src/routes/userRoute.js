import express from "express"
import { registration, login, logout, verifyEmail, profile } from "../controllers/userAuth.js"
import { verifyToken } from "../middelwares/verifyJWT.js"
import { refreshAccessToken } from "../controllers/refreshAccToken.js"

const router = express.Router();

router.post('/register', registration)
router.post('/login', login)
router.post('/logout', verifyToken, logout)
router.post('/verify-email', verifyEmail)
router.post('/refresh-access-token', refreshAccessToken)
router.get('/profile', verifyToken, profile)

export default router