import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/App';
import { HelpCircle, Mail } from 'lucide-react';

const ConditionsPage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a2447] pb-20">
      {/* Header with Icon */}
      <header className="bg-[#0a2447] px-4 py-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Legal Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
              <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
                {/* Gavel/Hammer icon */}
                <rect x="35" y="15" width="20" height="8" rx="2" fill="#1a3a5c" transform="rotate(45 35 15)"/>
                <rect x="20" y="30" width="8" height="20" rx="2" fill="#1a3a5c" transform="rotate(45 20 30)"/>
                <circle cx="32" cy="32" r="4" fill="#ff8c00"/>
                {/* Base */}
                <rect x="10" y="48" width="44" height="6" rx="1" fill="#1a3a5c"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-white text-3xl font-bold" data-testid="page-title">
            Kondisyon
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="space-y-6 text-gray-800">
            <section>
              <h2 className="text-xl font-bold text-[#0a2447] mb-3">1. Akseptasyon Tèm yo</h2>
              <p className="text-sm leading-relaxed">
                Lè w itilize platfòm Lojitek, ou aksepte tout tèm ak kondisyon sa yo. Si ou pa dakò ak youn nan kondisyon yo, tanpri pa itilize sèvis nou yo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0a2447] mb-3">2. Itilizasyon Sèvis yo</h2>
              <p className="text-sm leading-relaxed">
                Platfòm Lojitek bay aksè nan plizyè aplikasyon tankou Lotri, Paryaj Sportif, ak Casino. Chak itilizatè responsab pou tout aktivite ki fèt sou kont yo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0a2447] mb-3">3. Enskripsyon ak Kont</h2>
              <p className="text-sm leading-relaxed">
                Ou dwe bay enfòmasyon egzat ak konplè pandan enskripsyon an. Ou responsab pou kenbe modpas ou an sekirite epi ou pa dwe pataje li ak pèsonn.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0a2447] mb-3">4. Sèvis Lwe ak Vann</h2>
              <p className="text-sm leading-relaxed">
                Lojitek ofri sèvis pou lwe oswa vann sistèm ak ekipman. Tout tranzaksyon dwe fèt selon kondisyon yo ak pri ki endike yo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0a2447] mb-3">5. Responsablite Itilizatè</h2>
              <p className="text-sm leading-relaxed">
                Itilizatè yo dwe respekte lwa lokal yo epi pa itilize platfòm nan pou aktivite ilegal. Lojitek rezève dwa pou fèmen kont ki vyole règleman yo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0a2447] mb-3">6. Pwoteksyon Done Pèsonèl</h2>
              <p className="text-sm leading-relaxed">
                Nou pwoteje enfòmasyon pèsonèl ou yo ak anpil atansyon. Done ou yo pa p ap pataje ak twazyèm pati san otorizasyon ou.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0a2447] mb-3">7. Modifikasyon Tèm yo</h2>
              <p className="text-sm leading-relaxed">
                Lojitek ka modifye tèm ak kondisyon sa yo nenpòt ki lè. Chanjman yo ap antre an vigè imedyatman apre yo pibliye sou platfòm nan.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0a2447] mb-3">8. Kontak</h2>
              <p className="text-sm leading-relaxed">
                Si ou gen kesyon sou tèm ak kondisyon sa yo, tanpri kontakte nou atravè seksyon "Envite" nan aplikasyon an.
              </p>
            </section>
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
            className="flex flex-col items-center gap-1 text-orange-500"
            data-testid="nav-conditions"
          >
            <div className="text-2xl">📋</div>
            <span className="text-xs font-semibold">Kondisyon</span>
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

export default ConditionsPage;
