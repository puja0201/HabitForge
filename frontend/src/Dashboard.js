import React, { useState } from 'react';
import Badges from './Badges';

function Dashboard() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Drink Water 💧', xp: 10, streak: 3, done: false },
      { id: 2, name: 'Read 30 mins 📚', xp: 20, streak: 7, done: false },
      { id: 3, name: 'Exercise 🏃', xp: 30, streak: 1, done: false },
    ];
  });

  const [newHabit, setNewHabit] = useState('');

  const saveHabits = (updated) => {
    localStorage.setItem('habits', JSON.stringify(updated));
    setHabits(updated);
  };

  const addHabit = () => {
    if (newHabit.trim() === '') return;
    const habit = {
      id: habits.length + 1,
      name: newHabit,
      xp: 10,
      streak: 0,
      done: false
    };
    saveHabits([...habits, habit]);
    setNewHabit('');
  };

  const completeHabit = (id) => {
    const updated = habits.map(h =>
      h.id === id ? { ...h, done: true, streak: h.streak + 1 } : h
    );
    saveHabits(updated);
  };

  const deleteHabit = (id) => {
    const updated = habits.filter(h => h.id !== id);
    saveHabits(updated);
  };

  const totalXP = habits.filter(h => h.done).reduce((sum, h) => sum + h.xp, 0);
  const level = habits.filter(h => h.done).length + 1;

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>⚔️ HabitForge</h1>
        <div className="user-info">
          <span>⭐ Level {level}</span>
          <span>✨ {totalXP} XP</span>
        </div>
      </nav>

      <div className="dashboard-content">
        <h2>Today's Quests 🗡️</h2>

        <div className="add-habit">
          <input
            type="text"
            placeholder="Add new habit..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <button onClick={addHabit}>+ Add</button>
        </div>

        <div className="habits-list">
          {habits.map(habit => (
            <div key={habit.id} className={`habit-card ${habit.done ? 'done' : ''}`}>
              <div className="habit-info">
                <h3>{habit.name}</h3>
                <span>🔥 {habit.streak} day streak</span>
                <span>+{habit.xp} XP</span>
              </div>
              <div className="btn-group">
                <button
                  className={`complete-btn ${habit.done ? 'completed' : ''}`}
                  onClick={() => completeHabit(habit.id)}
                  disabled={habit.done}
                >
                  {habit.done ? '✅ Done!' : 'Complete'}
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteHabit(habit.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <Badges habits={habits} totalXP={totalXP} />

      </div>
    </div>
  );
}

export default Dashboard;