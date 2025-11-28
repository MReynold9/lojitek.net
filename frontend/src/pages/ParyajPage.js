import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/App';
import { HelpCircle, Mail } from 'lucide-react';

const ParyajPage = () => {
  const navigate = useNavigate();
  const { admin, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a2447] pb-20">
      {/* Header with Large Sports Logo */}
      <header className="bg-[#0a2447] px-4 py-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Large Paryaj Sportif Logo */}
          <div className="flex justify-center mb-6">
            <svg width="280" height="280" viewBox="0 0 280 280" fill="none" className="drop-shadow-2xl">
              {/* Background circle */}
              <circle cx="140" cy="140" r="135" fill="#1a3a5c"/>
              
              {/* Baseball bat - top left */}
              <g transform="translate(50, 50)">
                <rect x="5" y="0" width="8" height="50" rx="4" fill="#d4a574" transform="rotate(-45 5 0)"/>
                <circle cx="0" cy="0" r="6" fill="#d4a574"/>
              </g>
              
              {/* Soccer ball - top center */}
              <g transform="translate(140, 45)">
                <circle cx="0" cy="0" r="28" fill="white" stroke="#333" strokeWidth="3"/>
                <path d="M 0,-15 L -12,5 L 12,5 Z" fill="#333"/>
                <path d="M -12,5 L -18,20 L 0,15 Z" fill="#333"/>
                <path d="M 12,5 L 18,20 L 0,15 Z" fill="#333"/>
              </g>
              
              {/* Basketball - top right */}
              <g transform="translate(230, 50)">
                <circle cx="0" cy="0" r="26" fill="#ff8c00" stroke="#333" strokeWidth="2"/>
                <path d="M 0,-26 Q -10,0 0,26" stroke="#333" strokeWidth="2" fill="none"/>
                <path d="M 0,-26 Q 10,0 0,26" stroke="#333" strokeWidth="2" fill="none"/>
                <path d="M -26,0 L 26,0" stroke="#333" strokeWidth="2"/>
              </g>
              
              {/* Tennis racket - right */}
              <g transform="translate(235, 140)">
                <ellipse cx="0" cy="0" rx="18" ry="22" fill="none" stroke="#ffcc00" strokeWidth="4"/>
                <line x1="-12" y1="-15" x2="12" y2="15" stroke="#ffcc00" strokeWidth="2"/>
                <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffcc00" strokeWidth="2"/>
                <line x1="-12" y1="15" x2="12" y2="-15" stroke="#ffcc00" strokeWidth="2"/>
                <rect x="-2" y="22" width="4" height="18" rx="2" fill="#8b4513"/>
              </g>
              
              {/* PARYAJ SPORTIF Text */}
              <text x="140" y="150" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#f5f5dc" textAnchor="middle">PARYAJ</text>
              <text x="140" y="180" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="bold" fill="#f5f5dc" textAnchor="middle">SPORTIF</text>
              
              {/* Baseball - bottom left */}
              <g transform="translate(55, 225)">
                <circle cx="0" cy="0" r="18" fill="white" stroke="#cc0000" strokeWidth="2"/>
                <path d="M -10,-10 Q -5,-5 -10,10" stroke="#cc0000" strokeWidth="2" fill="none"/>
                <path d="M 10,-10 Q 5,-5 10,10" stroke="#cc0000" strokeWidth="2" fill="none"/>
              </g>
              
              {/* Cricket bat - bottom center */}
              <g transform="translate(110, 230)">
                <rect x="-8" y="0" width="16" height="40" rx="2" fill="#d4a574"/>
                <rect x="-6" y="40" width="12" height="15" rx="6" fill="#8b4513"/>
              </g>
              
              {/* American Football - bottom right */}
              <g transform="translate(220, 225)">
                <ellipse cx="0" cy="0" rx="22" ry="14" fill="#8b4513" stroke="#333" strokeWidth="2"/>
                <line x1="-22" y1="0" x2="22" y2="0" stroke="white" strokeWidth="2"/>
                <line x1="-8" y1="-10" x2="-8" y2="10" stroke="white" strokeWidth="2"/>
                <line x1="0" y1="-10" x2="0" y2="10" stroke="white" strokeWidth="2"/>
                <line x1="8" y1="-10" x2="8" y2="10" stroke="white" strokeWidth="2"/>
              </g>
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="space-y-6 text-gray-800">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#0a2447] mb-2" data-testid="welcome-title">
                Byenvini nan Paryaj Sportif!
              </h2>
              <p className="text-gray-600">
                Administratè: <span className="text-orange-500 font-semibold">{admin?.full_name}</span>
              </p>
            </div>

            <section>
              <h3 className="text-xl font-bold text-[#0a2447] mb-3">Fonksyon Prensipal</h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">⚽</span>
                  <span>Jere match ak kote pou plizyè espò (Foutbòl, Basketball, Tennis, elatriye)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">📊</span>
                  <span>Sistèm paryaj an tan reyèl ak kote ki ajiste otomatikman</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">📈</span>
                  <span>Rapò detaye ak estatistik pou chak match ak kliyan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">👥</span>
                  <span>Jesyon kliyan ak tikè paryaj</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">💰</span>
                  <span>Sistèm peman ak retrè sekirize</span>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-[#0a2447] mb-3">Espò Disponib</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">⚽</div>
                  <div className="text-sm font-semibold">Foutbòl</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">🏀</div>
                  <div className="text-sm font-semibold">Basketball</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">🎾</div>
                  <div className="text-sm font-semibold">Tennis</div>
                </div>
                <div className="bg-red-50 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">⚾</div>
                  <div className="text-sm font-semibold">Baseball</div>
                </div>
              </div>
            </section>

            <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-4 text-center">
              <p className="text-orange-700 font-medium">
                Aplikasyon sa pral disponib byento...
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0a2447] border-t border-orange-500/30 px-4 py-3">
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

export default ParyajPage;