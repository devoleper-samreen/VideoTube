import express from "express"
import { registration, login, logout, verifyEmail } from "../controllers/userAuth.js"
import { verifyToken } from "../middelwares/verifyJWT.js"
import { refreshAccessToken } from "../controllers/refreshAccToken.js"
import { getProfile, updateProfile } from "../controllers/profile.js"

const router = express.Router();

router.post('/register', registration)
router.post('/login', login)
router.post('/logout', verifyToken, logout)
router.post('/verify-email', verifyEmail)
router.post('/refresh-access-token', refreshAccessToken)
router.get('/profile', verifyToken, getProfile)
router.patch('/profile', verifyToken, updateProfile)

export default router