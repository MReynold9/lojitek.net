import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '@/App';
import { ArrowLeft } from 'lucide-react';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { API } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    id_number: '',
    new_password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await axios.post(`${API}/auth/reset-password`, formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Erè nan chanjman modpas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] to-[#1a2f4a] relative overflow-hidden">
      {/* Decorative circuit patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 border-2 border-cyan-400 rounded-full" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 border-2 border-orange-400" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)' }}></div>
      </div>
      
      {/* Orange top bar */}
      <div className="h-2 bg-gradient-to-r from-orange-500 to-orange-600"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-center mb-8 relative">
            <button
              onClick={() => navigate('/login')}
              className="absolute left-0 text-white hover:text-gray-300 transition-colors p-3 hover:bg-white/10 rounded-full"
              data-testid="back-button"
            >
              <ArrowLeft size={28} />
            </button>
            <h1 className="text-4xl font-bold text-white text-center" data-testid="page-title">
              Chanje Modpas
            </h1>
          </div>

          {/* Reset Password Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fadeIn">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-2xl text-center font-medium" data-testid="error-message">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-2 border-green-300 text-green-700 px-4 py-3 rounded-2xl text-center font-medium" data-testid="success-message">
                  Modpas chanje ak siksè! W ap redirije...
                </div>
              )}

              <div>
                <label className="block text-gray-800 font-semibold mb-3 text-lg" htmlFor="email">
                  Imèl
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-6 py-4 bg-white border-3 border-blue-600 rounded-full text-gray-800 text-lg focus:outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
                  placeholder="Enter imèl..."
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  data-testid="email-input"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-3 text-lg" htmlFor="id_number">
                  Nimewo Idantite
                </label>
                <input
                  id="id_number"
                  type="text"
                  className="w-full px-6 py-4 bg-white border-3 border-blue-600 rounded-full text-gray-800 text-lg focus:outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
                  placeholder="Enter nimewo idantite..."
                  value={formData.id_number}
                  onChange={(e) => setFormData({ ...formData, id_number: e.target.value })}
                  required
                  data-testid="id-number-input"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-3 text-lg" htmlFor="new_password">
                  Nouvo Modpas
                </label>
                <input
                  id="new_password"
                  type="password"
                  className="w-full px-6 py-4 bg-white border-3 border-blue-600 rounded-full text-gray-800 text-lg focus:outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
                  placeholder="Enter nouvo modpas..."
                  value={formData.new_password}
                  onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                  required
                  minLength={6}
                  data-testid="new-password-input"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || success}
                data-testid="reset-button"
              >
                {loading ? 'Chajman...' : 'Chanje Modpas'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;