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
    const iconStyle = "w-16 h-16 rounded-full flex items-center justify-center";
    
    switch(type) {
      case 'system':
        return (
          <div className={`${iconStyle} bg-white border-4 border-orange-500`}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0a2447" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
        );
      case 'equipment':
        return (
          <div className={`${iconStyle} bg-gradient-to-br from-orange-400 to-orange-600`}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
        );
      case 'lotri':
        return (
          <div className={`${iconStyle} bg-[#1a3a5c]`}>
            <div className="flex gap-1">
              <div className="w-7 h-7 rounded-full bg-yellow-400 border-2 border-white flex items-center justify-center text-xs font-bold text-[#1a3a5c]">8</div>
              <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">9</div>
            </div>
          </div>
        );
      case 'paryaj':
        return (
          <div className={`${iconStyle} bg-[#1a3a5c]`}>
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-white border-2 border-orange-500"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
              </div>
            </div>
          </div>
        );
      case 'casino':
        return (
          <div className={`${iconStyle} bg-[#1a3a5c]`}>
            <div className="grid grid-cols-2 gap-1">
              <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">A</div>
              <div className="w-5 h-5 bg-black rounded flex items-center justify-center text-white text-xs font-bold">♠</div>
              <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">♥</div>
              <div className="w-5 h-5 bg-black rounded flex items-center justify-center text-white text-xs font-bold">K</div>
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
        <div className="mb-8">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">Dekouvri sèvis nou yo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => navigate(service.path)}
                className="bg-white rounded-2xl p-6 flex items-center justify-between hover:shadow-xl transition-all transform hover:scale-[1.02] group"
                data-testid={`service-${service.id}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{service.icon}</div>
                  <span className="text-gray-800 font-semibold text-lg">{service.title}</span>
                </div>
                <span className="text-orange-500 text-3xl group-hover:translate-x-1 transition-transform">›</span>
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