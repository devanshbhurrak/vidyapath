import express from 'express'
import isAthenticated from '../middleware/isAuthenticated.js';
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, stripeWebhook } from '../controllers/coursePurchase.controller.js';

const router = express.Router();

router.route('/checkout/create-checkout-session').post(isAthenticated, createCheckoutSession)
router.route('/webhook').post(express.raw({type:'application/json'}), stripeWebhook)
router.route('/course/:courseId/details-with-status').get(isAthenticated, getCourseDetailWithPurchaseStatus)
router.route('/').get(isAthenticated, getAllPurchasedCourse)

export default router;