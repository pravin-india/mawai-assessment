const Booking = require('../models/Booking');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('clientId', 'name email')
      .populate('providerId', 'name email')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};