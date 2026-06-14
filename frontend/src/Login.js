import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await axios.post(
          'http://localhost:5000/api/auth/login',
          { email, password }
        );
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      } else {
        await axios.post(
          'http://localhost:5000/api/auth/register',
          { name, email, password }
        );
        setIsLogin(true);
        alert('Registered! Now login.');
      }
    } catch (err) {
      alert('Something went wrong!');
    }
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
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleSubmit}>
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} className="switch-text">
          {isLogin ? "New here? Create Account" : "Already have account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Login;