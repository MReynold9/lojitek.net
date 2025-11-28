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
      <main className="max-w-7xl mx-auto px-4 py-6 relative">
        {/* Circuit pattern background - FULL PAGE */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Top circuit lines */}
          <path d="M 200 50 L 400 50 L 400 150" stroke="#00d4ff" strokeWidth="2" fill="none"/>
          <path d="M 800 80 L 1000 80 L 1000 200 L 1100 200" stroke="#00d4ff" strokeWidth="2" fill="none"/>
          <circle cx="400" cy="50" r="5" fill="#00d4ff"/>
          <circle cx="1000" cy="80" r="5" fill="#00d4ff"/>
          
          {/* Middle circuit lines */}
          <path d="M 100 400 L 300 400" stroke="#00d4ff" strokeWidth="2" fill="none"/>
          <path d="M 900 500 L 1100 500 L 1100 650" stroke="#00d4ff" strokeWidth="2" fill="none"/>
          <circle cx="300" cy="400" r="5" fill="#00d4ff"/>
          <circle cx="1100" cy="500" r="5" fill="#cyan"/>
          
          {/* Bottom circuit lines */}
          <path d="M 200 800 L 400 800 L 400 900" stroke="#00d4ff" strokeWidth="2" fill="none"/>
          <path d="M 900 850 L 1100 850" stroke="#00d4ff" strokeWidth="2" fill="none"/>
          <circle cx="400" cy="800" r="5" fill="#00d4ff"/>
          <circle cx="1100" cy="850" r="5" fill="#cyan"/>
        </svg>

        {/* Large Logo at top */}
        <div className="relative z-10 mb-8">
          <div className="text-[#00d4ff] text-6xl font-bold mb-2" style={{fontFamily: 'Arial, sans-serif', letterSpacing: '2px'}}>
            loq Lojitek
          </div>
          <p className="text-gray-400 text-lg">Solisyon entèlijan pou biznis ou</p>
        </div>

        {/* Main Layout: Text LEFT, Image RIGHT */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
