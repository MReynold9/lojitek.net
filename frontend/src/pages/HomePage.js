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
      icon: '🖥️',
      path: '/services/system'
    },
    {
      id: 'lwe-equipment',
      title: 'Sèvis Lwe ou Vann ekipman',
      icon: '🖨️',
      path: '/services/equipment'
    },
    {
      id: 'lotri',
      title: 'Aplikasyon Lotri',
      icon: '🎱',
      path: '/lotri'
    },
    {
      id: 'paryaj',
      title: 'Aplikasyon Paryaj spotif',
      icon: '⚽',
      path: '/paryaj'
    },
    {
      id: 'casino',
      title: 'Aplikasyon Casino',
      icon: '🎰',
      path: '/casino'
    }
  ];

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