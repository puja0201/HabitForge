const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ 
  origin: ['http://localhost:3000', 'http://localhost:3001'] 
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'HabitForge API Running! 🚀' });
});

// Routes
app.use('/api/habits', require('./routes/habit'));
app.use('/api/auth', require('./routes/auth'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('🟢 MongoDB Connected!');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log('❌ Error:', err));