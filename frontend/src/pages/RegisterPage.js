import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '@/App';
import { ArrowLeft, Upload } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login, API } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    id_number: '',
    phone: '',
    address: '',
    photo_base64: '',
    accepted_terms: false
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Foto a twò gwo (max 5MB)');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPhotoPreview(base64String);
        setFormData({ ...formData, photo_base64: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.accepted_terms) {
      setError('Ou dwe aksepte tèm ak kondisyon yo');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/register`, formData);
      login(response.data.token, response.data.admin);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Erè nan enskripsyon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen circuit-bg py-8 px-4">
      <div className="max-w-2xl mx-auto animate-fadeIn">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-white hover:text-gray-300 transition-colors p-2"
            data-testid="back-button"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold ml-4" data-testid="page-title">Paj Enskripsyon Administratè</h1>
        </div>

        {/* Registration Form */}
        <div className="glass-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-2xl" data-testid="error-message">
                {error}
              </div>
            )}

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Foto</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-blue-400/50 flex items-center justify-center overflow-hidden bg-white/5">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" data-testid="photo-preview" />
                  ) : (
                    <Upload className="text-gray-400" size={32} />
                  )}
                </div>
                <label className="btn-secondary cursor-pointer inline-block" data-testid="photo-upload-button">
                  Chwazi la foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    data-testid="photo-input"
                  />
                </label>
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
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
                minLength={6}
                data-testid="password-input"
              />
            </div>

            {/* ID Number */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="id_number">Nimewo Idantite</label>
              <input
                id="id_number"
                type="text"
                className="input-field"
                placeholder="Enter nimewo idantite..."
                value={formData.id_number}
                onChange={(e) => setFormData({ ...formData, id_number: e.target.value })}
                required
                data-testid="id-number-input"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="full_name">Non Konplè</label>
              <input
                id="full_name"
                type="text"
                className="input-field"
                placeholder="Enter non..."
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
                data-testid="full-name-input"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="phone">Telefon</label>
              <input
                id="phone"
                type="tel"
                className="input-field"
                placeholder="Enter telefon..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                data-testid="phone-input"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="address">Adrès:</label>
              <input
                id="address"
                type="text"
                className="input-field"
                placeholder="Enter adrès..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                data-testid="address-input"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={formData.accepted_terms}
                onChange={(e) => setFormData({ ...formData, accepted_terms: e.target.checked })}
                className="mt-1 w-5 h-5 rounded border-2 border-blue-400/50 bg-white/5 checked:bg-orange-500 focus:ring-2 focus:ring-orange-500 cursor-pointer"
                data-testid="terms-checkbox"
              />
              <label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer">
                Depi w klike la, ou aksepte Tèm ak Kondisyon nou yo.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
              data-testid="register-button"
            >
              {loading ? 'Chajman...' : 'Enskri'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;