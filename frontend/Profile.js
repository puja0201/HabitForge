import React from 'react';

function Profile() {
  const habits = JSON.parse(localStorage.getItem('habits') || '[]');
  const totalXP = habits.filter(h => h.done).reduce((sum, h) => sum + h.xp, 0);
  const level = Math.floor(totalXP / 50) + 1;
  const completedHabits = habits.filter(h => h.done).length;
  const bestStreak = habits.reduce((max, h) => h.streak > max ? h.streak : max, 0);
  const xpForNextLevel = level * 50;
  const xpProgress = ((totalXP % 50) / 50) * 100;

  const badges = [];
  if (totalXP >= 50) badges.push({ icon: '🥉', name: 'Bronze Hero' });
  if (totalXP >= 100) badges.push({ icon: '🥈', name: 'Silver Warrior' });
  if (totalXP >= 200) badges.push({ icon: '🥇', name: 'Gold Champion' });
  if (bestStreak >= 7) badges.push({ icon: '🔥', name: 'Week Streak' });
  if (completedHabits >= 5) badges.push({ icon: '⚡', name: 'Habit Master' });

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>⚔️ HabitForge</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="login-btn" onClick={() => window.location.href='/dashboard'}>
            ← Dashboard
          </button>
        </div>
      </nav>

      <div className="main-content">
        {/* Avatar & Name */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', margin: '0 auto 15px'
          }}>
            🧙
          </div>
          <h2 style={{ color: '#a78bfa', fontSize: '1.8rem' }}>Hero Puja</h2>
          <p style={{ color: '#888' }}>HabitForge Adventurer</p>
        </div>

        {/* Level & XP Card */}
        <div className="level-card" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#a78bfa', fontSize: '1.2rem' }}>⭐ Level {level}</span>
            <span style={{ color: '#fbbf24' }}>{totalXP} / {xpForNextLevel} XP</span>
          </div>
          <div style={{ background: '#333', borderRadius: '10px', height: '12px' }}>
            <div style={{
              width: `${xpProgress}%`, height: '100%',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              borderRadius: '10px', transition: 'width 0.5s ease'
            }} />
          </div>
          <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '8px' }}>
            {xpForNextLevel - totalXP} XP needed for Level {level + 1}
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          <div className="level-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>✅</div>
            <div style={{ color: '#a78bfa', fontSize: '1.5rem', fontWeight: 'bold' }}>{completedHabits}</div>
            <div style={{ color: '#888', fontSize: '0.8rem' }}>Completed</div>
          </div>
          <div className="level-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>🔥</div>
            <div style={{ color: '#fbbf24', fontSize: '1.5rem', fontWeight: 'bold' }}>{bestStreak}</div>
            <div style={{ color: '#888', fontSize: '0.8rem' }}>Best Streak</div>
          </div>
          <div className="level-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>📋</div>
            <div style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 'bold' }}>{habits.length}</div>
            <div style={{ color: '#888', fontSize: '0.8rem' }}>Total Habits</div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="level-card">
          <h3 style={{ color: '#a78bfa', marginBottom: '15px' }}>🏆 My Badges</h3>
          {badges.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center' }}>
              Complete habits to earn badges! 💪
            </p>
          ) : (
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {badges.map((badge, i) => (
                <div key={i} style={{
                  background: '#2a2a2a', borderRadius: '12px',
                  padding: '15px', textAlign: 'center', minWidth: '80px'
                }}>
                  <div style={{ fontSize: '2rem' }}>{badge.icon}</div>
                  <div style={{ color: '#fbbf24', fontSize: '0.75rem', marginTop: '5px' }}>{badge.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;