import express from "express"
import { registration, login, logout, verifyEmail, getMe } from "../controllers/userAuth.js"
import { verifyToken } from "../middelwares/verifyJWT.js"
import { refreshAccessToken } from "../controllers/refreshAccToken.js"
import { getProfile, updateProfile } from "../controllers/profile.js"
import { upload } from "../middelwares/multur.js"
import { changePassword } from "../controllers/password.js"
import { forgotPassword, resetPassword } from "../controllers/password.js"

const router = express.Router();

router.post('/register', registration)
router.post('/login', login)
router.post('/logout', verifyToken, logout)
router.post('/verify-email', verifyEmail)
router.post('/refresh-access-token', refreshAccessToken)
router.get('/profile', verifyToken, getProfile)
router.patch('/profile', verifyToken, upload.fields([
    {
        name: "profilePicture",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), updateProfile)

router.patch('/change-password', verifyToken, changePassword)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password/:id/:token', resetPassword)
router.get('/me', verifyToken, getMe)

export default router