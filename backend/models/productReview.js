const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema({
  name: String,
  email: String,
  product: String,       // matches the field renamed in the backend
  rating: String,        // as your form uses select options (make it String)
  recommend: String,     // add this field for "Would you recommend"
  comments: String,      // add this field for comments textarea
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.ProductReview || mongoose.model('ProductReview', productReviewSchema);