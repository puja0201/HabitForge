import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      alert('Email and password enter చేయి!');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const res = await axios.post(
          'http://localhost:5000/api/auth/login',
          { email, password }
        );
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('name', res.data.name);
        navigate('/dashboard');
      } else {
        if (!name) {
          alert('Name enter చేయి!');
          setLoading(false);
          return;
        }
        await axios.post(
          'http://localhost:5000/api/auth/register',
          { name, email, password }
        );
        alert('Registered successfully! Now login చేయి ✅');
        setIsLogin(true);
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      console.error('Auth error:', err);
      const msg = err.response?.data?.message || err.message || 'Something went wrong!';
      alert('❌ ' + msg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>⚔️ HabitForge</h2>
        <h3>{isLogin ? 'Welcome Back!' : 'Join the Adventure!'}</h3>

        {!isLogin && (
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className="auth-btn"
          onClick={handleSubmit}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? '⏳ Please wait...' : (isLogin ? '⚔️ Login' : '🚀 Register')}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} className="switch-text">
          {isLogin ? "New here? Create Account →" : "Already have account? Login →"}
        </p>
      </div>
    </div>
  );
}

export default Login;