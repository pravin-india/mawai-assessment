const Booking = require('../models/Booking');
const Provider = require('../models/Provider');
const { bookingSchema } = require('../middleware/validation');

exports.createBooking = async (req, res) => {
  try {
    const { error } = bookingSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { providerId, start, end } = req.body;
    
    // Check slot availability
    const provider = await Provider.findOne({
      userId: providerId,
      'slots.start': start,
      'slots.end': end,
      'slots.isBooked': false
    });

    if (!provider) {
      return res.status(400).json({ error: 'Slot not available' });
    }

    // Create booking
    const booking = new Booking({
      clientId: req.user._id,
      providerId,
      slot: { start, end }
    });

    await booking.save();

    // Update slot status
    await Provider.updateOne(
      { userId: providerId, 'slots.start': start, 'slots.end': end },
      { $set: { 'slots.$.isBooked': true } }
    );

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const query = req.user.role === 'client' 
      ? { clientId: req.user._id } 
      : { providerId: req.user._id };
    
    const bookings = await Booking.find(query)
      .populate('clientId', 'name email')
      .populate('providerId', 'name email');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};