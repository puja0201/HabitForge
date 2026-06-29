import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <nav className="navbar">
        <h1>⚔️ HabitForge</h1>
        <button className="login-btn" onClick={() => navigate('/login')}>
          Login
        </button>
      </nav>

      <div className="hero">
        <div className="floating-icons">
          <span className="float-icon" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>⚔️</span>
          <span className="float-icon" style={{ top: '20%', right: '8%', animationDelay: '1s' }}>🏆</span>
          <span className="float-icon" style={{ bottom: '25%', left: '10%', animationDelay: '2s' }}>🔥</span>
          <span className="float-icon" style={{ bottom: '15%', right: '5%', animationDelay: '0.5s' }}>✨</span>
          <span className="float-icon" style={{ top: '50%', left: '3%', animationDelay: '1.5s' }}>⭐</span>
          <span className="float-icon" style={{ top: '40%', right: '3%', animationDelay: '2.5s' }}>🎯</span>
        </div>

        <div className="hero-badge">🚀 Level Up Your Life</div>

        <h2 className="hero-title">
          <span className="hero-line">Build Habits.</span>
          <span className="hero-line">Earn XP.</span>
          <span className="hero-line hero-highlight">Level Up Your Life! 🚀</span>
        </h2>

        <p className="hero-sub">Turn your daily tasks into an epic RPG adventure!</p>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-icon">⚔️</span>
            <span className="stat-label">Daily Quests</span>
          </div>
          <div className="hero-stat">
            <span className="stat-icon">✨</span>
            <span className="stat-label">Earn XP</span>
          </div>
          <div className="hero-stat">
            <span className="stat-icon">🏆</span>
            <span className="stat-label">Unlock Badges</span>
          </div>
          <div className="hero-stat">
            <span className="stat-icon">🔥</span>
            <span className="stat-label">Build Streaks</span>
          </div>
        </div>

        <div className="hero-buttons">
          <button className="start-btn" onClick={() => navigate('/login')}>
            ⚔️ Start Your Journey
          </button>
          <button className="secondary-btn" onClick={() => navigate('/login')}>
            Login →
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;