import React, { useState, useEffect } from 'react';
import Badges from './Badges';

const API = 'http://localhost:5000/api/habits';

const calculateLevel = (xp) => Math.floor(xp / 100) + 1;

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API)
      .then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setHabits(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load habits:', err);
        setError('Failed to load habits. Backend running ఉందా చెక్ చేయి!');
        setLoading(false);
      });
  }, []);

  const addHabit = () => {
    if (newHabit.trim() === '') return;
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newHabit.trim() })
    })
      .then(res => {
        if (!res.ok) throw new Error(`Add failed: ${res.status}`);
        return res.json();
      })
      .then(habit => {
        setHabits(prev => [...prev, habit]);
        setNewHabit('');
      })
      .catch(err => {
        console.error('Add habit error:', err);
        alert('Habit add చేయలేకపోయాం. Try again!');
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addHabit();
  };

  const completeHabit = (id) => {
    const habit = habits.find(h => h._id === id);
    if (!habit || habit.done) return;
    fetch(`${API}/${id}/complete`, { method: 'PATCH' })
      .then(res => {
        if (!res.ok) throw new Error(`Complete failed: ${res.status}`);
        return res.json();
      })
      .then(updated => {
        setHabits(prev => prev.map(h => h._id === id ? updated : h));
      })
      .catch(err => {
        console.error('Complete habit error:', err);
        alert('Habit complete చేయలేకపోయాం!');
      });
  };

  const deleteHabit = (id) => {
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
        setHabits(prev => prev.filter(h => h._id !== id));
      })
      .catch(err => {
        console.error('Delete habit error:', err);
        alert('Habit delete చేయలేకపోయాం!');
      });
  };

  const totalXP = habits.reduce((sum, h) => sum + (h.done ? (h.xp || 0) : 0), 0);
  const level = calculateLevel(totalXP);
  const xpProgress = totalXP % 100;

  if (loading) return (
    <div className="dashboard">
      <p style={{ color: 'white', padding: '2rem', textAlign: 'center', fontSize: '20px' }}>
        ⏳ Loading your quests...
      </p>
    </div>
  );

  if (error) return (
    <div className="dashboard">
      <p style={{ color: 'red', padding: '2rem' }}>❌ {error}</p>
    </div>
  );

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>⚔️ HabitForge</h1>
        <div className="user-info">
          <span>⭐ Level {level}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>✨ {totalXP} XP</span>
            <div className="xp-bar-container">
              <div
                className="xp-bar-fill"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <span style={{ fontSize: '11px', opacity: 0.6, color: 'white' }}>
              {xpProgress}/100 to Level {level + 1}
            </span>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <h2>⚔️ Your Quests</h2>

        <div className="add-habit">
          <input
            type="text"
            placeholder="Add new quest..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={addHabit}>+ Add Quest</button>
        </div>

        {habits.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '18px'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>⚔️</div>
            <p>No quests yet! Add your first habit above ⬆️</p>
          </div>
        ) : (
          <div className="habits-list">
            {habits.map(habit => (
              <div key={habit._id} className={`habit-card ${habit.done ? 'done' : ''}`}>
                <div className="habit-info">
                  <h3>{habit.name}</h3>
                  <span>🔥 {habit.streak ?? 0} day streak</span>
                  <span>+{habit.xp ?? 10} XP</span>
                </div>
                <div className="btn-group">
                  <button
                    className={`complete-btn ${habit.done ? 'completed' : ''}`}
                    onClick={() => completeHabit(habit._id)}
                    disabled={habit.done}
                  >
                    {habit.done ? '✅ Done!' : '⚡ Complete'}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteHabit(habit._id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Badges habits={habits} totalXP={totalXP} />
      </div>
    </div>
  );
}

export default Dashboard;