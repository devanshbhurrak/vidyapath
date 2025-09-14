import express from 'express';
import isAthenticated from '../middleware/isAuthenticated.js';
import { getCourseProgress, markAsCompleted, markAsIncompleted, updateLectureProgress } from '../controllers/courseProgress.controller.js';

const router = express.Router()

router.route('/:courseId').get(isAthenticated, getCourseProgress)
router.route('/:courseId/lecture/:lectureId/view').post(isAthenticated, updateLectureProgress)
router.route('/:courseId/complete').post(isAthenticated, markAsCompleted)
router.route('/:courseId/incomplete').post(isAthenticated, markAsIncompleted)

export default router