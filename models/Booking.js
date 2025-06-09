const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  clientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true
  },
  providerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true 
  },
  slot: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  status: { 
    type: String, 
    enum: ['confirmed', 'cancelled'], 
    default: 'confirmed' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);