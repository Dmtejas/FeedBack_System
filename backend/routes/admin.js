const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const Feedback = require('../models/feedback');
const auth = require('../middleware/auth');
const TeacherFeedback = require('../models/teacherFeedback');
const ProductReview = require('../models/productReview');
const ServiceEvaluation = require('../models/serviceEvaluation');
const EventFeedback = require('../models/eventFeedback');

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: admin._id, category: admin.category }, 'SECRET_KEY', { expiresIn: '1d' });
  res.json({ token });
});

// Get feedback stats for dashboard (protected route)
router.get('/dashboard', auth, async (req, res) => {
  const feedbacks = await Feedback.find();
  // Example: group by category and average rating
  const stats = {};
  feedbacks.forEach(fb => {
    if (!stats[fb.category]) stats[fb.category] = { count: 0, totalRating: 0 };
    stats[fb.category].count++;
    stats[fb.category].totalRating += fb.rating || 0;
  });
  // Prepare data for charts
  const chartData = Object.entries(stats).map(([category, data]) => ({
    category,
    count: data.count,
    avgRating: data.count ? (data.totalRating / data.count).toFixed(2) : 0
  }));
  res.json(chartData);
});

// Get feedback stats for dashboard
router.get('/dashboard-stats', async (req, res) => {
  try {
    const [teacherCount, productCount, serviceCount, eventCount] = await Promise.all([
      TeacherFeedback.countDocuments(),
      ProductReview.countDocuments(),
      ServiceEvaluation.countDocuments(),
      EventFeedback.countDocuments()
    ]);

    // Example: average rating for product reviews (if applicable)
    const productAvg = await ProductReview.aggregate([
      { $group: { _id: null, avg: { $avg: { $toDouble: "$rating" } } } }
    ]);
    const productAvgRating = productAvg[0]?.avg || 0;

    res.json({
      teacherCount,
      productCount,
      serviceCount,
      eventCount,
      productAvgRating
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Get detailed stats for a specific category (protected)
router.get('/dashboard-category', require('../middleware/auth'), async (req, res) => {
  const category = req.admin.category;

  let Model;
  if (category === 'Teacher Feedback') Model = TeacherFeedback;
  else if (category === 'Product Review') Model = ProductReview;
  else if (category === 'Service Evaluation') Model = ServiceEvaluation;
  else if (category === 'Event Feedback') Model = EventFeedback;
  else return res.status(400).json({ error: 'Invalid category' });

  try {
    const feedbacks = await Model.find().sort({ createdAt: -1 }).limit(20); // last 20 feedbacks

    // Stats
    const count = feedbacks.length;
    let avg = {};
    let dist = {};

    if (category === 'Teacher Feedback') {
      // For each question, calculate distribution and average
      const questions = ['teachingQuality', 'communication', 'engagement'];
      questions.forEach(q => {
        dist[q] = { excellent: 0, good: 0, average: 0, poor: 0 };
        let sum = 0, n = 0;
        feedbacks.forEach(fb => {
          if (fb[q]) {
            dist[q][fb[q]] = (dist[q][fb[q]] || 0) + 1;
            // For average: excellent=4, good=3, average=2, poor=1
            if (fb[q] === 'excellent') sum += 4;
            else if (fb[q] === 'good') sum += 3;
            else if (fb[q] === 'average') sum += 2;
            else if (fb[q] === 'poor') sum += 1;
            n++;
          }
        });
        avg[q] = n ? (sum / n) : 0;
      });
    } else if (category === 'Product Review') {
      // rating and recommend
      dist.rating = { excellent: 0, good: 0, average: 0, poor: 0 };
      dist.recommend = { yes: 0, no: 0 };
      let sum = 0, n = 0;
      feedbacks.forEach(fb => {
        if (fb.rating) {
          dist.rating[fb.rating] = (dist.rating[fb.rating] || 0) + 1;
          if (fb.rating === 'excellent') sum += 4;
          else if (fb.rating === 'good') sum += 3;
          else if (fb.rating === 'average') sum += 2;
          else if (fb.rating === 'poor') sum += 1;
          n++;
        }
        if (fb.recommend) dist.recommend[fb.recommend] = (dist.recommend[fb.recommend] || 0) + 1;
      });
      avg.rating = n ? (sum / n) : 0;
    } else if (category === 'Service Evaluation') {
      // satisfaction
      dist.satisfaction = { 'very-satisfied': 0, satisfied: 0, neutral: 0, dissatisfied: 0, 'very-dissatisfied': 0 };
      let sum = 0, n = 0;
      feedbacks.forEach(fb => {
        if (fb.satisfaction) {
          dist.satisfaction[fb.satisfaction] = (dist.satisfaction[fb.satisfaction] || 0) + 1;
          // For average: very-satisfied=5, satisfied=4, neutral=3, dissatisfied=2, very-dissatisfied=1
          if (fb.satisfaction === 'very-satisfied') sum += 5;
          else if (fb.satisfaction === 'satisfied') sum += 4;
          else if (fb.satisfaction === 'neutral') sum += 3;
          else if (fb.satisfaction === 'dissatisfied') sum += 2;
          else if (fb.satisfaction === 'very-dissatisfied') sum += 1;
          n++;
        }
      });
      avg.satisfaction = n ? (sum / n) : 0;
    } else if (category === 'Event Feedback') {
      // rating
      dist.rating = { excellent: 0, good: 0, average: 0, poor: 0 };
      let sum = 0, n = 0;
      feedbacks.forEach(fb => {
        if (fb.rating) {
          dist.rating[fb.rating] = (dist.rating[fb.rating] || 0) + 1;
          if (fb.rating === 'excellent') sum += 4;
          else if (fb.rating === 'good') sum += 3;
          else if (fb.rating === 'average') sum += 2;
          else if (fb.rating === 'poor') sum += 1;
          n++;
        }
      });
      avg.rating = n ? (sum / n) : 0;
    }

    // After you fetch feedbacks:
    let sentimentSum = 0, sentimentCount = 0;
    if (category === 'Teacher Feedback') {
      feedbacks.forEach(fb => {
        if (typeof fb.suggestionSentiment === 'number') {
          sentimentSum += fb.suggestionSentiment;
          sentimentCount++;
        }
      });
    }
    if (category === 'Product Review') {
      feedbacks.forEach(fb => {
        if (typeof fb.commentSentiment === 'number') {
          sentimentSum += fb.commentSentiment;
          sentimentCount++;
        }
      });
    }
    if (category === 'Service Evaluation') {
      feedbacks.forEach(fb => {
        if (typeof fb.improvementSentiment === 'number') {
          sentimentSum += fb.improvementSentiment;
          sentimentCount++;
        }
      });
    }
    if (category === 'Event Feedback') {
      feedbacks.forEach(fb => {
        if (typeof fb.commentSentiment === 'number') {
          sentimentSum += fb.commentSentiment;
          sentimentCount++;
        }
      });
    }
    const avgSentiment = sentimentCount ? (sentimentSum / sentimentCount) : 0;

    // Get last 10 feedbacks (most recent first)
    const trendFeedbacks = await Model.find({}).sort({ createdAt: -1 }).limit(10);

    // Prepare sentiment trend data (reverse for oldest to newest)
    const sentimentTrend = trendFeedbacks
      .map(fb =>
        fb.suggestionSentiment ?? fb.commentSentiment ?? fb.improvementSentiment ?? 0
      )
      .reverse();

    const sentimentTrendLabels = trendFeedbacks
      .map(fb =>
        new Date(fb.createdAt).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })
      )
      .reverse();

    res.json({
      count,
      avg,
      dist,
      avgSentiment,
      feedbacks, // last 20 feedbacks for table
      sentimentTrend,
      sentimentTrendLabels
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch category stats' });
  }
});

// Sample admin creation route (for initial setup)
// This should be removed or secured in production
router.post('/create-admin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = new Admin({ username, password, category: 'admin' });
    await admin.save();
    res.status(201).json({ message: 'Admin created' });
  } catch (error) {
    res.status(400).json({ error: 'Error creating admin' });
  }
});

module.exports = router;