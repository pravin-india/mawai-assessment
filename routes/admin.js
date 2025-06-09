const express = require('express');
const router = express.Router();
const { auth, authorizeRoles } = require('../middleware/auth');
const adminController = require('../controllers/admin');

router.get('/bookings', 
  auth, 
  authorizeRoles('admin'), 
  adminController.getAllBookings
);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin operations
 */

/**
 * @swagger
 * /api/admin/bookings:
 *   get:
 *     summary: Get all bookings (Admin only)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 *       500:
 *         description: Server error
 */
router.get('/bookings', 
  auth, 
  authorizeRoles('admin'), 
  adminController.getAllBookings
);