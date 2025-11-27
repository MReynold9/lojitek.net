import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/App';
import { ArrowLeft, Trophy, Sparkles } from 'lucide-react';

const LotriPage = () => {
  const navigate = useNavigate();
  const { admin } = useContext(AuthContext);

  return (
    <div className="min-h-screen circuit-bg">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              data-testid="back-to-dashboard"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                <Trophy size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold" data-testid="page-title">Sistèm Lotri</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-card max-w-3xl mx-auto text-center animate-fadeIn">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center mx-auto mb-6">
            <Sparkles size={48} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4" data-testid="welcome-message">Byenvini nan Sistèm Lotri!</h2>
          <p className="text-xl text-gray-300 mb-8">
            Administratè: <span className="text-orange-500 font-semibold">{admin?.full_name}</span>
          </p>
          
          <div className="space-y-4 text-left max-w-xl mx-auto">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h3 className="font-semibold text-lg mb-2">Fonksyon yo:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Kreye nouvo tiraj lotri</li>
                <li>• Jere tikè ak nimewo gayan</li>
                <li>• Sistèm tiraj otomatik</li>
                <li>• Rapò rezilta</li>
              </ul>
            </div>
            
            <p className="text-center text-gray-400 italic mt-6">
              Aplikasyon sa pral disponib byento...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LotriPage;