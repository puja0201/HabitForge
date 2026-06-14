import React from 'react';

function Badges({ habits, totalXP }) {
  const badges = [
    {
      id: 1,
      name: '🌟 First Quest',
      desc: 'Complete your first habit',
      unlocked: habits.some(h => h.done)
    },
    {
      id: 2,
      name: '🔥 Streak Master',
      desc: 'Get a 7 day streak on any habit',
      unlocked: habits.some(h => h.streak >= 7)
    },
    {
      id: 3,
      name: '⚡ XP Hunter',
      desc: 'Earn 50 XP total',
      unlocked: totalXP >= 50
    },
    {
      id: 4,
      name: '👑 Consistency King',
      desc: 'Complete all habits in a day',
      unlocked: habits.length > 0 && habits.every(h => h.done)
    },
    {
      id: 5,
      name: '🚀 Habit Builder',
      desc: 'Add 5 or more habits',
      unlocked: habits.length >= 5
    },
  ];

  return (
    <div className="badges-section">
      <h2>🏆 Your Badges</h2>
      <div className="badges-grid">
        {badges.map(badge => (
          <div key={badge.id} className={`badge-card ${badge.unlocked ? 'unlocked' : 'locked'}`}>
            <h3>{badge.name}</h3>
            <p>{badge.desc}</p>
            <span>{badge.unlocked ? '✅ Unlocked!' : '🔒 Locked'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Badges;