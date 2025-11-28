import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/App';
import { LogOut, HelpCircle, Mail, Users } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { admin, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const services = [
    {
      id: 'lwe-system',
      title: 'Sèvis Lwe ou Vann systèm',
      iconType: 'system',
      path: '/services/system'
    },
    {
      id: 'lwe-equipment',
      title: 'Sèvis Lwe ou Vann ekipman',
      iconType: 'equipment',
      path: '/services/equipment'
    },
    {
      id: 'lotri',
      title: 'Aplikasyon Lotri',
      iconType: 'lotri',
      path: '/lotri'
    },
    {
      id: 'paryaj',
      title: 'Aplikasyon Paryaj spotif',
      iconType: 'paryaj',
      path: '/paryaj'
    },
    {
      id: 'casino',
      title: 'Aplikasyon Casino',
      iconType: 'casino',
      path: '/casino'
    }
  ];

  const ServiceIcon = ({ type }) => {
    const iconStyle = "w-20 h-20 rounded-full flex items-center justify-center";
    
    switch(type) {
      case 'system':
        return (
          <div className={`${iconStyle} bg-white border-4 border-gray-300`}>
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
              <rect x="8" y="8" width="48" height="32" rx="2" fill="#1a3a5c" stroke="#1a3a5c" strokeWidth="2"/>
              <rect x="12" y="12" width="40" height="24" fill="#4a90e2"/>
              <line x1="20" y1="48" x2="44" y2="48" stroke="#1a3a5c" strokeWidth="3" strokeLinecap="round"/>
              <line x1="32" y1="40" x2="32" y2="48" stroke="#1a3a5c" strokeWidth="2"/>
            </svg>
          </div>
        );
      case 'equipment':
        return (
          <div className={`${iconStyle} bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600`}>
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
              <rect x="12" y="12" width="40" height="30" rx="2" fill="white"/>
              <rect x="16" y="16" width="32" height="8" fill="#ff8c00"/>
              <rect x="16" y="28" width="32" height="2" fill="#333"/>
              <rect x="16" y="32" width="32" height="2" fill="#333"/>
              <rect x="16" y="36" width="32" height="2" fill="#333"/>
            </svg>
          </div>
        );
      case 'lotri':
        return (
          <div className={`${iconStyle} bg-[#1a3a5c] relative`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-yellow-400 font-bold text-xs mb-1">LOTRI</div>
                <div className="flex gap-1 justify-center">
                  <div className="w-5 h-5 rounded-full bg-yellow-400 border border-white flex items-center justify-center text-[10px] font-bold text-[#1a3a5c]">8</div>
                  <div className="w-5 h-5 rounded-full bg-blue-500 border border-white flex items-center justify-center text-[10px] font-bold text-white">9</div>
                  <div className="w-5 h-5 rounded-full bg-green-500 border border-white flex items-center justify-center text-[10px] font-bold text-white">3</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'paryaj':
        return (
          <div className={`${iconStyle} bg-[#1a3a5c] relative`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-orange-400 font-bold text-[9px] leading-tight mb-1">
                  <div>PARYAJ</div>
                  <div>SPORTIF</div>
                </div>
                <div className="flex gap-1 justify-center items-center">
                  <div className="w-5 h-5 rounded-full bg-white border border-orange-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-orange-600 relative">
                    <div className="absolute inset-1 rounded-full border border-white"></div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-yellow-500"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'casino':
        return (
          <div className={`${iconStyle} bg-[#1a3a5c] relative`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Roulette wheel */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 border-2 border-yellow-400 relative">
                  <div className="absolute inset-1 rounded-full border-2 border-yellow-400"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                  </div>
                  {/* Cards overlay */}
                  <div className="absolute -top-1 -right-1 flex gap-0.5">
                    <div className="w-3 h-4 bg-white rounded-sm flex items-center justify-center text-[8px] font-bold text-red-600">A</div>
                    <div className="w-3 h-4 bg-white rounded-sm flex items-center justify-center text-[8px] font-bold">♠</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a2447]">
      {/* Header with profile */}
      <header className="bg-[#0a2447] border-b border-orange-500/30 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {admin?.photo_base64 && (
              <img
                src={admin.photo_base64}
                alt="Profile"
                className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
                data-testid="admin-photo"
              />
            )}
            <div>
              <h2 className="text-white font-bold text-lg" data-testid="admin-name">Byen vini {admin?.full_name}</h2>
              <p className="text-orange-400 text-sm">👋</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4" data-testid="welcome-title">
            Byen vini sou platfòm nou an.
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            Kote inovasyon, konfyans, ak ekselans rankontre
          </p>
          <p className="text-gray-300 text-lg">pou sèvi'w pi byen.</p>
        </div>

        {/* Services Section */}
        <div className="mb-20">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">Dekouvri sèvis nou yo</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => navigate(service.path)}
                className="bg-white rounded-2xl p-5 flex items-center justify-between hover:shadow-xl transition-all transform hover:scale-[1.01] group w-full"
                data-testid={`service-${service.id}`}
              >
                <div className="flex items-center gap-5">
                  <ServiceIcon type={service.iconType} />
                  <span className="text-gray-800 font-semibold text-lg text-left">{service.title}</span>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-500 group-hover:translate-x-1 transition-transform">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0a2447] border-t border-orange-500/30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-around items-center">
          <button
            className="flex flex-col items-center gap-1 text-orange-500"
            data-testid="nav-home"
          >
            <div className="text-2xl">🏠</div>
            <span className="text-xs font-semibold">Akey</span>
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

export default HomePage;