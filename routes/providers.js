const express = require('express');
const router = express.Router();
const { auth, authorizeRoles } = require('../middleware/auth');
const providerController = require('../controllers/provider');

router.post('/availability', 
  auth, 
  authorizeRoles('provider'), 
  providerController.setAvailability
);

router.get('/available', providerController.getAvailableSlots);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: Provider availability management
 */

/**
 * @swagger
 * /api/providers/availability:
 *   post:
 *     summary: Set provider availability slots (Provider only)
 *     tags: [Providers]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - slots
 *             properties:
 *               slots:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     start:
 *                        type: string
 *                        format: date-time
 *                        example: "2025-06-08T10:14:03.627Z"
 *                     end:
 *                        type: string
 *                        format: date-time
 *                        example: "2025-06-09T10:14:03.627Z"
 *     responses:
 *       200:
 *         description: Availability updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/availability', 
  auth, 
  authorizeRoles('provider'), 
  providerController.setAvailability
);

/**
 * @swagger
 * /api/providers/available:
 *   get:
 *     summary: Get available slots for a provider
 *     tags: [Providers]
 *     parameters:
 *       - in: query
 *         name: providerId
 *         schema:
 *           type: string
 *         required: true
 *         description: Provider ID
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Date to check availability (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of available slots
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 slots:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Slot'
 *       400:
 *         description: Missing parameters
 *       500:
 *         description: Server error
 */
router.get('/available', providerController.getAvailableSlots);