import React, { useState, useContext } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './AuthPages.css';

const AuthPages = ({ initialMode = 'signin', onLoginSuccess }) => {
  const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
  const { login, register } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const toggleMode = () => {
    setMode(prev => prev === 'signin' ? 'signup' : 'signin');
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    let result;
    if (mode === 'signin') {
      result = login(formData.email, formData.password);
    } else {
      result = register(formData.name, formData.email, formData.password);
    }

    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="glass-panel auth-card animate-scale-in">
        
        <div className="auth-header">
          <h2>{mode === 'signin' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>
            {mode === 'signin' ? 'Sign in to access your premium itinerary.' : 'Join AeroSpace for exclusive luxury travel perks.'}
          </p>
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          
          {mode === 'signup' && (
            <div className="auth-input-group">
              <label>Full Name</label>
              <div className="auth-input-wrapper">
                <User size={18} className="auth-input-icon" />
                <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder="John Doe" required />
              </div>
            </div>
          )}

          <div className="auth-input-group">
            <label>Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="john@example.com" required />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="••••••••" required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary auth-btn">
            {mode === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight size={20} />
          </button>
        </form>

        <div className="auth-footer">
          {mode === 'signin' ? (
            <p>Don't have an account? <span onClick={toggleMode} className="auth-toggle-link">Sign Up</span></p>
          ) : (
            <p>Already have an account? <span onClick={toggleMode} className="auth-toggle-link">Sign In</span></p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthPages;
