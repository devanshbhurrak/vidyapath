import express from 'express';
import { getUserProfile, login, logout, register, updateProfile } from '../controllers/user.controller.js';
import isAthenticated from '../middleware/isAuthenticated.js';
import upload from '../utils/multer.js';

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/profile').get(isAthenticated, getUserProfile)
router.route('/profile/update').put(isAthenticated, upload.single("profilePhoto"), updateProfile)

export default router;