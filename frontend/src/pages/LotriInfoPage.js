import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/App';
import { ArrowLeft, HelpCircle, Mail, Phone } from 'lucide-react';

const LotriInfoPage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a2447] pb-20">
      {/* Header */}
      <header className="bg-[#0a2447] px-4 py-4 flex items-center border-b border-orange-500">
        <button
          onClick={() => navigate('/lotri')}
          className="text-white hover:text-orange-500 transition-colors"
          data-testid="back-button"
        >
          <ArrowLeft size={28} />
        </button>
        <h1 className="text-white text-2xl font-bold flex-1 text-center mr-7" data-testid="page-title">
          Paj sèvis Lojitek
        </h1>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Logo and Device Section */}
        <div className="relative mb-8 flex justify-center items-center">
          {/* Circuit pattern background */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="300" xmlns="http://www.w3.org/2000/svg">
              <path d="M 50 150 L 200 150 L 200 50" stroke="#00d4ff" strokeWidth="2" fill="none"/>
              <path d="M 600 150 L 450 150 L 450 250" stroke="#00d4ff" strokeWidth="2" fill="none"/>
              <circle cx="200" cy="150" r="4" fill="#00d4ff"/>
              <circle cx="450" cy="150" r="4" fill="#00d4ff"/>
            </svg>
          </div>

          {/* Logo Text */}
          <div className="absolute left-8 top-8 z-10">
            <div className="text-[#00d4ff] text-5xl font-bold mb-2" style={{fontFamily: 'Arial, sans-serif'}}>
              loj Lojitek
            </div>
            <p className="text-gray-400 text-sm">Solisyon entèlijan pou biznis ou</p>
          </div>

          {/* Device/Card Image */}
          <div className="relative z-10 mt-24">
            {/* Red card reader */}
            <div className="w-80 h-48 bg-gradient-to-br from-orange-600 to-red-700 rounded-3xl shadow-2xl border-4 border-black relative overflow-hidden">
              {/* Top stripe */}
              <div className="absolute top-8 left-0 right-0 h-12 bg-black"></div>
              
              {/* Contactless payment icon */}
              <div className="absolute top-12 right-8">
                <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                  <path d="M 10 20 Q 20 10 30 20" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
                  <path d="M 5 25 Q 20 5 35 25" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
                  <path d="M 0 30 Q 20 0 40 30" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
                </svg>
              </div>

              {/* Sunm label */}
              <div className="absolute bottom-8 left-8 text-white text-xl font-semibold">
                sunm
              </div>

              {/* Phone inside card */}
              <div className="absolute bottom-4 right-4 w-44 h-64 bg-gradient-to-b from-blue-900 to-blue-950 rounded-2xl border-4 border-gray-300 shadow-xl">
                {/* Phone screen */}
                <div className="absolute inset-2 bg-[#1a4a7a] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[#00d4ff] text-3xl font-bold mb-2">loj</div>
                    <div className="text-white text-2xl font-bold">Lojitek</div>
                    <p className="text-gray-300 text-xs mt-1">Solisyon entèlijan pou biznis ou</p>
                  </div>
                </div>
                {/* Home button */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-gray-400 rounded-full"></div>
              </div>
            </div>

            {/* Circuit line extending to content */}
            <svg className="absolute -bottom-20 left-1/2 transform -translate-x-1/2" width="2" height="80" xmlns="http://www.w3.org/2000/svg">
              <line x1="1" y1="0" x2="1" y2="80" stroke="#00d4ff" strokeWidth="2"/>
              <circle cx="1" cy="80" r="4" fill="#00d4ff"/>
            </svg>
          </div>
        </div>

        {/* Info Content */}
        <div className="bg-[#0a2447] rounded-3xl p-6 mt-24 border border-cyan-500/30">
          <div className="space-y-4 text-white">
            {/* Title */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-300 mb-2">Sistèm Lotri</h2>
              <h3 className="text-xl font-semibold text-orange-500">Karakteristik yo:</h3>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <div>
                <h4 className="text-lg font-semibold text-gray-300">Mastè Admin</h4>
                <p className="text-orange-500 text-sm">Kont prensipal pou jere tout sistèm nan</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300">Aksè Endepandan</h4>
                <p className="text-orange-500 text-sm">Chak ajan ka gen aksè pa yo</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300">Kreyasyon Gwoup</h4>
                <p className="text-orange-500 text-sm">Ou ka kreye gwoup ajan oswa pwen vant</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300">Anile Tikè</h4>
                <p className="text-orange-500 text-sm">Anile tikè epi wè detay sou vant yo</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300">Maryaj Otomatik</h4>
                <p className="text-orange-500 text-sm">Sistèm otomatik pou mete 25 maryaj pou pi piti</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300">Maryaj Gratis Opsyonèl</h4>
                <p className="text-orange-500 text-sm">Ou ka chwazi fè maryaj gratis si ou vle</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300">Piblikasyon Nimewo Ganyan</h4>
                <p className="text-orange-500 text-sm">Mete nimewo ki genyen otomatik oswa manyèl</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300">Kontwòl Komisyon</h4>
                <p className="text-orange-500 text-sm">Jere komisyon ajan yo</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300">Kreyasyon tiraj</h4>
                <p className="text-orange-500 text-sm">Ajoute yon tiraj tankou: Tennessee, Texas, New York, Florida, Georgia,(elatriye)</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300">Rapò Vant Jeneral</h4>
                <p className="text-orange-500 text-sm">Rapò chak tiraj, e rapò tout vant yo</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300">Sistèm POS Prepeye</h4>
                <p className="text-orange-500 text-sm">Pwen vant ki fonksyone sou kredi</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-300">Monitè Bank an tan reyèl</h4>
                <p className="text-orange-500 text-sm">Swiv tranzaksyon chak pwen vant ou yo an tan reyèl</p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-8 pt-6 border-t border-cyan-500/30 flex items-start gap-3">
              <Phone className="text-cyan-400 mt-1" size={24} />
              <p className="text-gray-300 text-sm leading-relaxed">
                <span className="font-semibold">Kontakte nou pou plis enfòmasyon si ou gen pwoblèm pou kòmanse sèvi ak sistèm nan</span>
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

export default LotriInfoPage;
