import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '@/App';
import { ArrowLeft, Upload, Building2 } from 'lucide-react';

const CompanySetupPage = () => {
  const navigate = useNavigate();
  const { API, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    logo_base64: '',
    company_name: '',
    slogan: '',
    company_address: '',
    company_phone: ''
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Logo a twò gwo (max 5MB)');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setLogoPreview(base64String);
        setFormData({ ...formData, logo_base64: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API}/company/create`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Store a flag to prevent auto-redirect to company setup
      sessionStorage.setItem('company_created', 'true');
      // Clear token and redirect to login
      localStorage.removeItem('token');
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 100);
    } catch (err) {
      setError(err.response?.data?.detail || 'Erè nan kreyasyon antrepriz');
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
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-center mb-8 relative">
            <button
              onClick={() => navigate('/dashboard')}
              className="absolute left-0 text-white hover:text-gray-300 transition-colors p-3 hover:bg-white/10 rounded-full"
              data-testid="back-button"
            >
              <ArrowLeft size={28} />
            </button>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-3">
                <Building2 size={32} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white" data-testid="page-title">
                Paj Kreye Antrepriz ou....
              </h1>
            </div>
          </div>

          {/* Company Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fadeIn">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-2xl text-center font-medium" data-testid="error-message">
                  {error}
                </div>
              )}

              {/* Logo Upload */}
              <div>
                <label className="block text-gray-800 font-semibold mb-3 text-lg">Logo</label>
                <div className="bg-gray-100 rounded-3xl p-8 border-2 border-dashed border-blue-300">
                  <div className="flex flex-col items-center">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo Preview" className="w-32 h-32 object-contain mb-4 rounded-xl" data-testid="logo-preview" />
                    ) : (
                      <div className="w-32 h-32 bg-white rounded-xl border-2 border-blue-400 flex items-center justify-center mb-4">
                        <Upload className="text-gray-400" size={48} />
                      </div>
                    )}
                    <label className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-full transition-all" data-testid="logo-upload-button">
                      Choisissez la photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                        data-testid="logo-input"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-gray-800 font-semibold mb-3 text-lg" htmlFor="company_name">
                  Non Antrepriz
                </label>
                <input
                  id="company_name"
                  type="text"
                  className="w-full px-6 py-4 bg-white border-3 border-blue-600 rounded-full text-gray-800 text-lg focus:outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
                  placeholder=""
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  required
                  data-testid="company-name-input"
                />
              </div>

              {/* Slogan */}
              <div>
                <label className="block text-gray-800 font-semibold mb-3 text-lg" htmlFor="slogan">
                  Slogan
                </label>
                <input
                  id="slogan"
                  type="text"
                  className="w-full px-6 py-4 bg-white border-3 border-blue-600 rounded-full text-gray-800 text-lg focus:outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
                  placeholder=""
                  value={formData.slogan}
                  onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                  required
                  data-testid="slogan-input"
                />
              </div>

              {/* Company Address */}
              <div>
                <label className="block text-gray-800 font-semibold mb-3 text-lg" htmlFor="company_address">
                  Adrès
                </label>
                <input
                  id="company_address"
                  type="text"
                  className="w-full px-6 py-4 bg-white border-3 border-blue-600 rounded-full text-gray-800 text-lg focus:outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
                  placeholder=""
                  value={formData.company_address}
                  onChange={(e) => setFormData({ ...formData, company_address: e.target.value })}
                  required
                  data-testid="company-address-input"
                />
              </div>

              {/* Company Phone */}
              <div>
                <label className="block text-gray-800 font-semibold mb-3 text-lg" htmlFor="company_phone">
                  Telefon
                </label>
                <input
                  id="company_phone"
                  type="tel"
                  className="w-full px-6 py-4 bg-white border-3 border-blue-600 rounded-full text-gray-800 text-lg focus:outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
                  placeholder=""
                  value={formData.company_phone}
                  onChange={(e) => setFormData({ ...formData, company_phone: e.target.value })}
                  required
                  data-testid="company-phone-input"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
                data-testid="submit-button"
              >
                {loading ? 'Chajman...' : 'Kontinye'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySetupPage;