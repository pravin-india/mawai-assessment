const Provider = require('../models/Provider');
const { availabilitySchema } = require('../middleware/validation');

exports.setAvailability = async (req, res) => {
  try {
    const { error } = availabilitySchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { slots } = req.body;
    const provider = await Provider.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { slots } },
      { new: true, upsert: true }
    );

    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { providerId, date } = req.query;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const provider = await Provider.findOne({
      userId: providerId,
      'slots.start': { $gte: startDate, $lt: endDate },
      'slots.isBooked': false
    });

    if (!provider) return res.json({ slots: [] });

    const availableSlots = provider.slots.filter(slot => !slot.isBooked);
    res.json({ slots: availableSlots });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};