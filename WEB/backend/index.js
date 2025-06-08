const express = require('express');
const cors = require('cors');
const app = express();

const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');
const studentRoutes = require('./routes/student');
const scoreRoutes = require('./routes/score');
const subjectRoutes = require('./routes/subject');
const semesterRoutes = require('./routes/semester');
const feedbackRoutes = require('./routes/feedback');
const viewRoutes = require('./routes/viewCounter');



app.use(cors());
app.use(express.json());

// API routes
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/scores', require('./routes/score'));
app.use('/api/subjects', subjectRoutes);
app.use('/api/semesters', semesterRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/views', viewRoutes);


const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ Backend server is running on http://localhost:${PORT}`);
});
