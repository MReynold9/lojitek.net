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
        {/* Large Logo at top */}
        <div className="relative z-10 mb-8">
          <div className="text-[#00d4ff] text-6xl font-bold mb-2" style={{fontFamily: 'Arial, sans-serif', letterSpacing: '2px'}}>
            Lojitek
          </div>
          <p className="text-gray-400 text-lg">Solisyon entèlijan pou biznis ou</p>
        </div>

        {/* Main Layout: Full Width Text */}
        <div className="relative z-10 max-w-4xl">
          {/* Text Content */}
          <div className="space-y-3 text-white">
            {/* Title */}
            <h2 className="text-4xl font-bold text-gray-200 mb-4">Sistèm Lotri</h2>
            <h3 className="text-2xl font-bold text-orange-500 mb-6">Karakteristik yo:</h3>

            {/* Features List */}
            <div className="space-y-2">
              <div>
                <h4 className="text-xl font-semibold text-gray-200">Mastè Admin</h4>
                <p className="text-orange-500 text-base">Kont prensipal pou jere tout sistèm nan</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-200">Aksè Endepandan</h4>
                <p className="text-orange-500 text-base">Chak ajan ka gen aksè pa yo</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-200">Kreyasyon Gwoup</h4>
                <p className="text-orange-500 text-base">Ou ka kreye gwoup ajan oswa pwen vant</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-200">Anile Tikè</h4>
                <p className="text-orange-500 text-base">Anile tikè epi wè detay sou vant yo</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-200">Maryaj Otomatik</h4>
                <p className="text-orange-500 text-base">Sistèm otomatik pou mete 25 maryaj pou pi piti</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-200">Maryaj Gratis Opsyonèl</h4>
                <p className="text-orange-500 text-base">Ou ka chwazi fè maryaj gratis si ou vle</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-200">Piblikasyon Nimewo Ganyan</h4>
                <p className="text-orange-500 text-base">Mete nimewo ki genyen otomatik oswa manyèl</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-200">Kontwòl Komisyon</h4>
                <p className="text-orange-500 text-base">Jere komisyon ajan yo</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-200">Kreyasyon tiraj</h4>
                <p className="text-orange-500 text-base">Ajoute yon tiraj tankou: Tennessee, Texas, New York, Florida, Georgia,(elatriye)</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-200">Rapò Vant Jeneral</h4>
                <p className="text-orange-500 text-base">Rapò chak tiraj, e rapò tout vant yo</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-200">Sistèm POS Prepeye</h4>
                <p className="text-orange-500 text-base">Pwen vant ki fonksyone sou kredi</p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-200">Monitè Bank an tan reyèl</h4>
                <p className="text-orange-500 text-base">Swiv tranzaksyon chak pwen vant ou yo an tan reyèl</p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-6 pt-4 flex items-start gap-3">
              <Phone className="text-cyan-400 mt-1 flex-shrink-0" size={28} />
              <p className="text-gray-300 text-base leading-relaxed">
                Kontakte nou pou plis enfòmasyon si ou gen pwoblèm pou kòmanse sèvi ak sistèm nan
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
