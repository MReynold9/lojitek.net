import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '@/App';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, API } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/login`, formData);
      login(response.data.token, response.data.admin);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Erè nan koneksyon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen circuit-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="lojitek-logo mx-auto" data-testid="logo-container">
            <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
              <path d="M20 50 L35 35 L50 50 L65 35 L80 50" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="35" cy="35" r="4" fill="white"/>
              <circle cx="50" cy="50" r="4" fill="white"/>
              <circle cx="65" cy="35" r="4" fill="white"/>
              <rect x="20" y="60" width="60" height="20" rx="4" fill="white" fillOpacity="0.3"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold mt-4 mb-2" style={{ fontFamily: 'Exo 2, sans-serif' }} data-testid="main-title">
            LOJITEK
          </h1>
          <p className="text-lg text-gray-300" data-testid="subtitle">SOLISYON ENTÈLIJAN POU BIZNIS OU</p>
        </div>

        {/* Login Form */}
        <div className="glass-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-2xl" data-testid="error-message">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">Imèl</label>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="Enter imèl..."
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                data-testid="email-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="password">Modpas</label>
              <input
                id="password"
                type="password"
                className="input-field"
                placeholder="Enter modpas..."
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                data-testid="password-input"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
              data-testid="login-button"
            >
              {loading ? 'Chajman...' : 'KONEKTE'}
            </button>

            <button
              type="button"
              className="btn-secondary w-full"
              onClick={() => navigate('/register')}
              data-testid="register-navigate-button"
            >
              KREYE YON NOUVO KONT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;