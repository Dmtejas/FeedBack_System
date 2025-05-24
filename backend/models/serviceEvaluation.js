const mongoose = require('mongoose');

const serviceEvaluationSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,       // from service-name field (we'll remap in backend)
  satisfaction: String,  // directly mapped from form
  improvements: String,  // from improvements textarea
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.ServiceEvaluation || mongoose.model('ServiceEvaluation', serviceEvaluationSchema);