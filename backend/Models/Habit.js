const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  streak: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },
  done: { type: Boolean, default: false },
  lastCompleted: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);