const mongoose = require('mongoose');

const eventFeedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  event: String,         // from event-name field
  rating: String,        // from rating select (Excellent, Good, etc.)
  comments: String,      // from comments textarea
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.EventFeedback || mongoose.model('EventFeedback', eventFeedbackSchema);