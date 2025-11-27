import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/App';
import { LogOut, Dices, Trophy, GamepadIcon } from 'lucide-react';
import axios from 'axios';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { admin, logout, API } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, [API]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const apps = [
    {
      id: 'lotri',
      title: 'Lotri',
      description: 'Sistèm lotri ak tiraj otomatik',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-600',
      path: '/lotri'
    },
    {
      id: 'paryaj',
      title: 'Paryaj Sportif',
      description: 'Platfòm paryaj pou espò',
      icon: GamepadIcon,
      color: 'from-green-500 to-teal-600',
      path: '/paryaj'
    },
    {
      id: 'casino',
      title: 'Casino',
      description: 'Jwèt kazino ak mezi chans',
      icon: Dices,
      color: 'from-purple-500 to-pink-600',
      path: '/casino'
    }
  ];

  return (
    <div className="min-h-screen circuit-bg">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="lojitek-logo !w-12 !h-12 !mb-0" data-testid="dashboard-logo">
                <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
                  <path d="M20 50 L35 35 L50 50 L65 35 L80 50" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="35" cy="35" r="4" fill="white"/>
                  <circle cx="50" cy="50" r="4" fill="white"/>
                  <circle cx="65" cy="35" r="4" fill="white"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Exo 2, sans-serif' }}>LOJITEK</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-400">Administratè</p>
                <p className="font-semibold" data-testid="admin-name">{admin?.full_name}</p>
              </div>
              {admin?.photo_base64 && (
                <img
                  src={admin.photo_base64}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
                  data-testid="admin-photo"
                />
              )}
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title="Dekonekte"
                data-testid="logout-button"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12 animate-fadeIn">
          <h2 className="text-4xl font-bold mb-3" data-testid="welcome-title">Byenvini, {admin?.full_name}!</h2>
          <p className="text-xl text-gray-300">Chwazi yon aplikasyon pou kòmanse</p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app, index) => {
            const Icon = app.icon;
            return (
              <div
                key={app.id}
                className="glass-card cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(app.path)}
                data-testid={`app-card-${app.id}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{app.title}</h3>
                <p className="text-gray-400 mb-4">{app.description}</p>
                <div className="flex items-center text-orange-500 font-semibold group-hover:gap-3 gap-2 transition-all">
                  <span>Louvri</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        {stats && (
          <div className="mt-12 glass-card animate-fadeIn">
            <h3 className="text-2xl font-bold mb-4">Estatistik</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Administratè</p>
                <p className="text-3xl font-bold" data-testid="total-admins">{stats.total_admins}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Estatistik</p>
                <p className="text-lg">Aktif</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;