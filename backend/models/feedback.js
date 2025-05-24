const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., 'teacher', 'product', etc.
  name: String,
  email: String,
  rating: Number,
  comments: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);