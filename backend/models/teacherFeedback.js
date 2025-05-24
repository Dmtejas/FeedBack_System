const mongoose = require('mongoose');

const teacherFeedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  class: String,                // added these fields
  subject: String,
  teachingQuality: String,      // will remap 'teaching-quality' in backend
  communication: String,
  engagement: String,
  suggestions: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.TeacherFeedback || mongoose.model('TeacherFeedback', teacherFeedbackSchema);