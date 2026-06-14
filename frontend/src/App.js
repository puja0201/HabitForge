import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';

function Home() {
  return (
    <div className="app">
      <nav className="navbar">
        <h1>⚔️ HabitForge</h1>
        <button className="login-btn" onClick={() => window.location.href='/login'}>
          Login
        </button>
      </nav>
      <div className="hero">
        <h2>Build Habits.</h2>
        <h2>Earn XP.</h2>
        <h2>Level Up Your Life! 🚀</h2>
        <p>Turn your daily tasks into an epic RPG adventure!</p>
        <button className="start-btn" onClick={() => window.location.href='/dashboard'}>
          Start Your Journey
        </button>
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