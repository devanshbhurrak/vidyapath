import express from 'express'
import isAthenticated from '../middleware/isAuthenticated.js'
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCreatorCourses, getLectureById, getLectures, getPublishedCourse, removeLecture, searchCourse, togglePublishCourse } from '../controllers/course.controller.js'
import upload from '../utils/multer.js'

const router = express.Router()

router.route('/').post(isAthenticated, createCourse)
router.route('/search').get(isAthenticated, searchCourse)
router.route('/published-courses').get(getPublishedCourse)
router.route('/').get(isAthenticated, getCreatorCourses)
router.route('/:courseId').put(isAthenticated, upload.single('courseThumbnail'), editCourse)
router.route('/:courseId').get(isAthenticated, getCourseById)
router.route('/:courseId').patch(isAthenticated, togglePublishCourse)
router.route('/:courseId/lecture').post(isAthenticated, createLecture)
router.route('/:courseId/lecture').get(isAthenticated, getLectures)
router.route('/:courseId/lecture/:lectureId').post(isAthenticated, editLecture)
router.route('/lecture/:lectureId').delete(isAthenticated, removeLecture)
router.route('/lecture/:lectureId').get(isAthenticated, getLectureById)

export default router