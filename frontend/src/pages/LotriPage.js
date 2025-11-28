import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/App';
import { ArrowLeft, HelpCircle, Mail } from 'lucide-react';

const LotriPage = () => {
  const navigate = useNavigate();
  const { admin, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2447] via-[#0c2d52] to-[#0a2447] relative overflow-hidden pb-20">
      {/* Decorative Circuit Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: '#00d4ff', stopOpacity: 0.3}} />
              <stop offset="100%" style={{stopColor: '#00d4ff', stopOpacity: 0}} />
            </linearGradient>
          </defs>
          <path d="M 100 200 L 300 200 L 300 400 L 500 400" stroke="url(#lineGradient)" strokeWidth="2" fill="none"/>
          <path d="M 900 100 L 700 100 L 700 300" stroke="url(#lineGradient)" strokeWidth="2" fill="none"/>
          <circle cx="300" cy="200" r="4" fill="#00d4ff" opacity="0.6"/>
          <circle cx="700" cy="100" r="4" fill="#00d4ff" opacity="0.6"/>
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-4 flex items-center">
        <button
          onClick={() => navigate('/home')}
          className="text-white hover:text-orange-500 transition-colors"
          data-testid="back-button"
        >
          <ArrowLeft size={28} />
        </button>
        <h1 className="text-white text-2xl font-bold flex-1 text-center mr-7" data-testid="page-title">
          Paj Bolèt
        </h1>
      </header>

      {/* Orange divider line */}
      <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 mb-6"></div>

      {/* Info Button */}
      <div className="relative z-10 px-4 mb-6">
        <button 
          onClick={() => navigate('/lotri/info')}
          className="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-[#1a3a5c] border-2 border-cyan-400/50 rounded-full py-3 px-6 text-white font-semibold text-lg hover:bg-[#244a6c] transition-all"
          data-testid="info-service-button"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#1a3a5c] text-xl">i</span>
          </div>
          <span>ENFO SÈVIS</span>
        </button>
      </div>

      {/* Main Lottery Logo */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="relative">
          {/* Large LOTRI Text */}
          <div className="text-center mb-8">
            <h2 className="text-[#f5f5dc] text-8xl font-black tracking-wider drop-shadow-2xl" style={{fontFamily: 'Arial Black, sans-serif'}}>
              LOTRI
            </h2>
          </div>

          {/* Lottery Numbers and Elements */}
          <div className="relative h-64 mb-8">
            {/* Gold coins - left */}
            <div className="absolute left-8 top-12">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <ellipse cx="40" cy="40" rx="35" ry="35" fill="#FFD700" stroke="#DAA520" strokeWidth="3"/>
                <ellipse cx="40" cy="40" rx="28" ry="28" fill="#FFC700"/>
                <text x="40" y="50" fontFamily="Arial" fontSize="28" fontWeight="bold" fill="#8B7500" textAnchor="middle">$</text>
              </svg>
            </div>

            {/* Number 1 - red chip top left */}
            <div className="absolute left-32 top-4">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <ellipse cx="70" cy="70" rx="65" ry="65" fill="#e74c3c" stroke="#c0392b" strokeWidth="4"/>
                <ellipse cx="70" cy="70" rx="55" ry="55" fill="#f5f5dc"/>
                <text x="70" y="90" fontFamily="Arial Black" fontSize="60" fontWeight="bold" fill="#1a3a5c" textAnchor="middle">1</text>
              </svg>
            </div>

            {/* Star - top center */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <path d="M30 5 L36 22 L54 22 L40 33 L46 50 L30 39 L14 50 L20 33 L6 22 L24 22 Z" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
              </svg>
            </div>

            {/* Number 5 - teal chip top right */}
            <div className="absolute right-32 top-4">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <ellipse cx="70" cy="70" rx="65" ry="65" fill="#4db8a8" stroke="#3a9688" strokeWidth="4"/>
                <ellipse cx="70" cy="70" rx="55" ry="55" fill="#f5f5dc"/>
                <text x="70" y="90" fontFamily="Arial Black" fontSize="60" fontWeight="bold" fill="#1a3a5c" textAnchor="middle">5</text>
              </svg>
            </div>

            {/* Gold coin - top right */}
            <div className="absolute right-8 top-20">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <ellipse cx="30" cy="30" rx="26" ry="26" fill="#FFD700" stroke="#DAA520" strokeWidth="2"/>
                <ellipse cx="30" cy="30" rx="20" ry="20" fill="#FFC700"/>
                <text x="30" y="38" fontFamily="Arial" fontSize="20" fontWeight="bold" fill="#8B7500" textAnchor="middle">$</text>
              </svg>
            </div>

            {/* Star - left */}
            <div className="absolute left-4 bottom-20">
              <svg width="50" height="50" viewBox="0 0 50 50">
                <path d="M25 4 L30 18 L45 18 L33 27 L38 41 L25 32 L12 41 L17 27 L5 18 L20 18 Z" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
              </svg>
            </div>

            {/* Number 6 - green chip bottom left */}
            <div className="absolute left-20 bottom-0">
              <svg width="110" height="110" viewBox="0 0 110 110">
                <ellipse cx="55" cy="55" rx="50" ry="50" fill="#27ae60" stroke="#229954" strokeWidth="3"/>
                <ellipse cx="55" cy="55" rx="42" ry="42" fill="#f5f5dc"/>
                <text x="55" y="70" fontFamily="Arial Black" fontSize="48" fontWeight="bold" fill="#1a3a5c" textAnchor="middle">6</text>
              </svg>
            </div>

            {/* Number 9 - yellow chip bottom center */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-8">
              <svg width="180" height="180" viewBox="0 0 180 180">
                <ellipse cx="90" cy="90" rx="85" ry="85" fill="#f39c12" stroke="#e67e22" strokeWidth="4"/>
                <ellipse cx="90" cy="90" rx="72" ry="72" fill="#f5f5dc"/>
                <text x="90" y="115" fontFamily="Arial Black" fontSize="72" fontWeight="bold" fill="#1a3a5c" textAnchor="middle">9</text>
              </svg>
            </div>

            {/* Small yellow dot */}
            <div className="absolute left-1/3 bottom-4">
              <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
            </div>

            {/* Gold coin - bottom right */}
            <div className="absolute right-16 bottom-8">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <ellipse cx="50" cy="50" rx="45" ry="45" fill="#FFD700" stroke="#DAA520" strokeWidth="3"/>
                <ellipse cx="50" cy="50" rx="36" ry="36" fill="#FFC700"/>
                <text x="50" y="62" fontFamily="Arial" fontSize="32" fontWeight="bold" fill="#8B7500" textAnchor="middle">$</text>
              </svg>
            </div>

            {/* Tennis ball - bottom right corner */}
            <div className="absolute right-4 bottom-0">
              <svg width="70" height="70" viewBox="0 0 70 70">
                <circle cx="35" cy="35" r="32" fill="#FFE135" stroke="#DAA520" strokeWidth="2"/>
                <path d="M 10 35 Q 25 20 35 10" stroke="#DAA520" strokeWidth="2" fill="none"/>
                <path d="M 60 35 Q 45 50 35 60" stroke="#DAA520" strokeWidth="2" fill="none"/>
              </svg>
            </div>

            {/* Star - bottom right */}
            <div className="absolute right-28 bottom-36">
              <svg width="45" height="45" viewBox="0 0 45 45">
                <path d="M22.5 3 L27 16 L41 16 L30 24 L34 37 L22.5 29 L11 37 L15 24 L4 16 L18 16 Z" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* BOLÈT Button */}
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/lotri/bolet')}
              className="w-full max-w-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white text-3xl font-bold py-6 px-12 rounded-full shadow-2xl transform hover:scale-105 transition-all"
              data-testid="bolet-button"
            >
              BOLÈT
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0a2447] border-t border-orange-500/30 px-4 py-3 z-20">
        <div className="max-w-7xl mx-auto flex justify-around items-center">
          <button
            onClick={() => navigate('/home')}
            className="flex flex-col items-center gap-1 text-white hover:text-orange-500 transition-colors"
            data-testid="nav-home"
          >
            <div className="text-2xl">🏠</div>
            <span className="text-xs">Akey</span>
          </button>
          
          <button
            onClick={() => navigate('/conditions')}
            className="flex flex-col items-center gap-1 text-white hover:text-orange-500 transition-colors"
            data-testid="nav-conditions"
          >
            <div className="text-2xl">📋</div>
            <span className="text-xs">Kondisyon</span>
          </button>
          
          <button
            onClick={() => navigate('/follow')}
            className="flex flex-col items-center gap-1 text-white hover:text-orange-500 transition-colors"
            data-testid="nav-follow"
          >
            <div className="text-2xl">🏃</div>
            <span className="text-xs">Swiv nou</span>
          </button>
          
          <button
            onClick={() => navigate('/invite')}
            className="flex flex-col items-center gap-1 text-white hover:text-orange-500 transition-colors"
            data-testid="nav-invite"
          >
            <Mail size={24} />
            <span className="text-xs">Envite</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 text-white hover:text-orange-500 transition-colors"
            data-testid="nav-logout"
          >
            <HelpCircle size={24} />
            <span className="text-xs">Ed</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default LotriPage;