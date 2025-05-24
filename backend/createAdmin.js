const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect('mongodb://Tejas:tejasgowda%402006@localhost:27017/feedback-system?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');
  const admins = [
    { username: 'teacherAdmin', password: 'teacher123', category: 'Teacher Feedback' },
    { username: 'productAdmin', password: 'product123', category: 'Product Review' },
    { username: 'serviceAdmin', password: 'service123', category: 'Service Evaluation' },
    { username: 'eventAdmin', password: 'event123', category: 'Event Feedback' }
  ];

  for (const adminData of admins) {
    let admin = await Admin.findOne({ username: adminData.username });
    if (admin) {
      // Update the category if it's different
      if (admin.category !== adminData.category) {
        admin.category = adminData.category;
        await admin.save();
        console.log(`Admin ${adminData.username} category updated!`);
      } else {
        console.log(`Admin ${adminData.username} already exists`);
      }
      continue;
    }
    admin = new Admin(adminData);
    await admin.save();
    console.log(`Admin ${adminData.username} created!`);
  }
  process.exit();
})
.catch(err => console.error('MongoDB connection error:', err));