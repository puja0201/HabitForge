const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ 
  origin: ['http://localhost:3000', 'http://localhost:3001'] 
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'HabitForge API Running! 🚀' });
});

// Routes
const habitRoutes = require('./routes/habit');
const authRoutes = require('./routes/auth');

app.use('/api/habits', habitRoutes);
app.use('/api/auth', authRoutes);

console.log('✅ All routes registered');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('🟢 MongoDB Connected!');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log('❌ Error:', err));