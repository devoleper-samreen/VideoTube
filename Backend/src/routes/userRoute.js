import express from "express"
import { registration, login, logout, verifyEmail } from "../controllers/userAuth.js"
import { verifyToken } from "../middelwares/verifyJWT.js"
import { refreshAccessToken } from "../controllers/refreshAccToken.js"
import { getProfile, updateProfile } from "../controllers/profile.js"
import { upload } from "../middelwares/multur.js"
import { changePassword } from "../controllers/password.js"
import { forgotPassword } from "../controllers/password.js"

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

export default router