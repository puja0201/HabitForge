const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Get all habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create habit
router.post('/', async (req, res) => {
  try {
    const habit = new Habit(req.body);
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Complete habit
router.patch('/:id/complete', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { $inc: { streak: 1, xp: 10 }, done: true },
      { new: true }
    );
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete habit
router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;