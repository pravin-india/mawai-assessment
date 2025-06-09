const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const bookingController = require('../controllers/booking');

router.post('/', auth, bookingController.createBooking);
router.get('/', auth, bookingController.getUserBookings);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Appointment booking management
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Book an appointment slot
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - providerId
 *               - start
 *               - end
 *             properties:
 *               providerId:
 *                 type: string
 *               start:
 *                 type: string
 *                 format: date-time
 *               end:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Slot not available or validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', auth, bookingController.createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get user's bookings
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', auth, bookingController.getUserBookings);