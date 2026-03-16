import React, { useState, useContext } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '2rem 0' }}>
      <div className="glass-panel animate-scale-in" style={{ width: '100%', maxWidth: '450px', padding: '3rem 2.5rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{mode === 'signin' ? 'Welcome Back' : 'Create Account'}</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {mode === 'signin' ? 'Sign in to access your premium itinerary.' : 'Join AeroSpace for exclusive luxury travel perks.'}
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {mode === 'signup' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-primary)' }} />
                <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder="John Doe" required style={{ width: '100%', paddingLeft: '2.75rem' }} />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-primary)' }} />
              <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="john@example.com" required style={{ width: '100%', paddingLeft: '2.75rem' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-primary)' }} />
              <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="••••••••" required style={{ width: '100%', paddingLeft: '2.75rem' }} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '3.5rem', marginTop: '1rem', fontSize: '1.1rem' }}>
            {mode === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight size={20} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--color-text-secondary)' }}>
          {mode === 'signin' ? (
            <p>Don't have an account? <span onClick={toggleMode} style={{ color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600 }}>Sign Up</span></p>
          ) : (
            <p>Already have an account? <span onClick={toggleMode} style={{ color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600 }}>Sign In</span></p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AuthPages;
