const express = require('express');
const router = express.Router();
const Sentiment = require('sentiment');

const TeacherFeedback = require('../models/teacherFeedback');
const ProductReview = require('../models/productReview');
const ServiceEvaluation = require('../models/serviceEvaluation');
const EventFeedback = require('../models/eventFeedback');

const sentiment = new Sentiment();

// Helper to get the correct model
function getModelByCategory(category) {
  switch (category) {
    case 'Teacher Feedback': return TeacherFeedback;
    case 'Product Review': return ProductReview;
    case 'Service Evaluation': return ServiceEvaluation;
    case 'Event Feedback': return EventFeedback;
    default: return null;
  }
}

// Submit feedback
router.post('/', async (req, res) => {
  const { category, ...rawData } = req.body;
  const Model = getModelByCategory(category);
  if (!Model) return res.status(400).json({ error: 'Invalid category' });

  // Remap fields based on category
  let data = { ...rawData };

  if (category === 'Teacher Feedback') {
    data.teachingQuality = rawData['teaching-quality'];
    delete data['teaching-quality'];
    if (data.suggestions) {
      data.suggestionSentiment = sentiment.analyze(data.suggestions).score;
    }
  }
  if (category === 'Product Review') {
    data.product = rawData['product-name'];
    delete data['product-name'];
    if (data.comments) {
      data.commentSentiment = sentiment.analyze(data.comments).score;
    }
  }
  if (category === 'Service Evaluation') {
    data.service = rawData['service-name'];
    delete data['service-name'];
    if (data.improvements) {
      data.improvementSentiment = sentiment.analyze(data.improvements).score;
    }
  }
  if (category === 'Event Feedback') {
    data.event = rawData['event-name'];
    delete data['event-name'];
    if (data.comments) {
      data.commentSentiment = sentiment.analyze(data.comments).score;
    }
  }

  try {
    const feedback = new Model(data);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get feedbacks by category
router.get('/', async (req, res) => {
  const { category } = req.query;
  const Model = getModelByCategory(category);
  if (!Model) return res.status(400).json({ error: 'Invalid category' });

  const feedbacks = await Model.find();
  res.json(feedbacks);
});

module.exports = router;