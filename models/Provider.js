const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  isBooked: { type: Boolean, default: false }
});

const providerSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true
  },
  slots: [slotSchema]
});

providerSchema.index({ 'slots.start': 1, 'slots.end': 1 });

module.exports = mongoose.model('Provider', providerSchema);