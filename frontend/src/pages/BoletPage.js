import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '@/App';
import { ArrowLeft, ArrowRight, Bell, Plus, Home, FileText, HelpCircle, Copy, Menu } from 'lucide-react';

const BoletPage = () => {
  const navigate = useNavigate();
  const { admin, API } = useContext(AuthContext);
  
  const [activeTab, setActiveTab] = useState('bolet');
  const [numeroInput, setNumeroInput] = useState('');
  const [montanInput, setMontanInput] = useState('');
  const [maryajNum1, setMaryajNum1] = useState('');
  const [maryajNum2, setMaryajNum2] = useState('');
  const [maryajMontan, setMaryajMontan] = useState('');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const totalBoul = tickets.length;
  const totalMiz = tickets.reduce((sum, ticket) => sum + ticket.montan, 0);

  // Load tickets on mount
  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/tickets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(response.data);
    } catch (error) {
      console.error('Error loading tickets:', error);
    }
  };

  const handleAddTicket = () => {
    if (numeroInput && montanInput) {
      setTickets([...tickets, {
        jwet: 'Bolet',
        boul: parseInt(numeroInput),
        ops: '',
        montan: parseInt(montanInput)
      }]);
      setNumeroInput('');
      setMontanInput('');
    }
  };

  const handleDeleteTicket = (index) => {
    setTickets(tickets.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#0a2447] text-white px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate('/lotri')} className="p-2" data-testid="back-button">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold tracking-wider" style={{fontFamily: 'Arial, sans-serif'}}>LOTO SUN</h1>
        <div className="flex items-center gap-2">
          <button className="p-2">
            <Bell size={24} />
          </button>
          <button className="p-2">
            <ArrowRight size={24} />
          </button>
        </div>
      </header>

      {/* Orange divider */}
      <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>

      {/* Tabs - Scrollable */}
      <div className="bg-white px-2 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('bolet')}
          className={`px-8 py-3 rounded-full font-bold text-lg flex-shrink-0 ${
            activeTab === 'bolet' ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-600'
          }`}
          data-testid="tab-bolet"
        >
          Bolet
        </button>
        <button
          onClick={() => setActiveTab('maryaj')}
          className={`px-8 py-3 rounded-full font-bold text-lg flex-shrink-0 ${
            activeTab === 'maryaj' ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-600'
          }`}
          data-testid="tab-maryaj"
        >
          Maryaj
        </button>
        <button
          onClick={() => setActiveTab('loto1')}
          className={`px-8 py-3 rounded-full font-bold text-lg flex-shrink-0 ${
            activeTab === 'loto1' ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-600'
          }`}
          data-testid="tab-loto1"
        >
          Loto1
        </button>
        <button
          onClick={() => setActiveTab('loto3')}
          className={`px-8 py-3 rounded-full font-bold text-lg flex-shrink-0 ${
            activeTab === 'loto3' ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-600'
          }`}
          data-testid="tab-loto3"
        >
          Loto3
        </button>
        <button
          onClick={() => setActiveTab('loto4')}
          className={`px-8 py-3 rounded-full font-bold text-lg flex-shrink-0 ${
            activeTab === 'loto4' ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-600'
          }`}
          data-testid="tab-loto4"
        >
          Loto4
        </button>
        <button
          onClick={() => setActiveTab('loto5')}
          className={`px-8 py-3 rounded-full font-bold text-lg flex-shrink-0 ${
            activeTab === 'loto5' ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-600'
          }`}
          data-testid="tab-loto5"
        >
          Loto5
        </button>
        <button
          onClick={() => setActiveTab('loto6')}
          className={`px-8 py-3 rounded-full font-bold text-lg flex-shrink-0 ${
            activeTab === 'loto6' ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-600'
          }`}
          data-testid="tab-loto6"
        >
          Loto6
        </button>
        <button
          onClick={() => setActiveTab('loto7')}
          className={`px-8 py-3 rounded-full font-bold text-lg flex-shrink-0 ${
            activeTab === 'loto7' ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-600'
          }`}
          data-testid="tab-loto7"
        >
          Loto7
        </button>
      </div>

      {/* Blue divider */}
      <div className="h-1 bg-blue-600"></div>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Dynamic Header based on active tab */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-bold capitalize">{activeTab === 'bolet' ? 'Bolet' : activeTab === 'maryaj' ? 'Maryaj' : activeTab}</h2>
          <div className="text-right">
            <div className="text-sm">VD464, Balans: <span className="font-bold">300 Pwen</span></div>
          </div>
        </div>

        {/* Purple divider */}
        <div className="h-1 bg-gradient-to-r from-blue-800 to-purple-800 mb-4"></div>

        {/* Input Section - Changes based on active tab */}
        {activeTab === 'bolet' && (
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-md">
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="00"
                value={numeroInput}
                onChange={(e) => setNumeroInput(e.target.value)}
                className="px-4 py-3 border-2 border-[#0a2447] rounded-full text-center text-xl font-semibold focus:outline-none focus:border-blue-600"
                data-testid="numero-input"
                maxLength={2}
              />
              <input
                type="text"
                placeholder="Montan"
                value={montanInput}
                onChange={(e) => setMontanInput(e.target.value)}
                className="px-4 py-3 border-2 border-[#0a2447] rounded-full text-center text-xl focus:outline-none focus:border-blue-600"
                data-testid="montan-input"
              />
              <button
                onClick={handleAddTicket}
                className="bg-[#0a2447] text-white rounded-full flex items-center justify-center text-3xl font-bold hover:bg-[#0c3058] transition-colors"
                data-testid="add-button"
              >
                <Plus size={32} />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'maryaj' && (
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-md">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="00"
                className="w-24 px-4 py-3 border-4 border-red-600 rounded-full text-center text-xl font-semibold focus:outline-none focus:border-red-700"
                data-testid="maryaj-num1-input"
                maxLength={2}
              />
              <div className="flex items-center justify-center">
                <span className="text-red-600 text-4xl font-bold">×</span>
              </div>
              <input
                type="text"
                placeholder="00"
                className="w-24 px-4 py-3 border-4 border-red-600 rounded-full text-center text-xl font-semibold focus:outline-none focus:border-red-700"
                data-testid="maryaj-num2-input"
                maxLength={2}
              />
              <input
                type="text"
                placeholder="Montan"
                className="flex-1 px-4 py-3 border-4 border-red-600 rounded-full text-center text-xl focus:outline-none focus:border-red-700"
                data-testid="maryaj-montan-input"
              />
              <button
                className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold hover:bg-red-700 transition-colors flex-shrink-0"
                data-testid="maryaj-add-button"
              >
                <Plus size={32} />
              </button>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {(activeTab === 'loto1' || activeTab === 'loto3' || activeTab === 'loto4' || activeTab === 'loto5' || activeTab === 'loto6' || activeTab === 'loto7') && (
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-md">
            <div className="text-center text-gray-500 py-4">
              Interface pou {activeTab} pral disponib byento...
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button className="bg-[#0a2447] text-white px-4 py-3 rounded-full font-bold text-sm hover:bg-[#0c3058] border-2 border-blue-400">
            OTO LOTO4
          </button>
          <button className="bg-[#0a2447] text-white px-4 py-3 rounded-full font-bold text-sm hover:bg-[#0c3058] border-2 border-blue-400">
            OUTI
          </button>
          <button className="bg-[#0a2447] text-white px-4 py-3 rounded-full font-bold text-sm hover:bg-[#0c3058]">
            MARYAJ OTO
          </button>
        </div>

        {/* Orange divider */}
        <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-600 mb-4"></div>

        {/* Table Header */}
        <div className="bg-white border-b-2 border-gray-300">
          <div className="grid grid-cols-5 px-4 py-3 font-bold text-sm">
            <div>Jwet</div>
            <div>Boul</div>
            <div>Ops</div>
            <div>Montan</div>
            <div className="text-center">Anile</div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="bg-white">
          {tickets.map((ticket, index) => (
            <div key={index} className="grid grid-cols-5 px-4 py-3 border-b border-dotted border-gray-400 items-center">
              <div className="font-semibold">{ticket.jwet}</div>
              <div className="font-bold text-lg">{ticket.boul}</div>
              <div>{ticket.ops}</div>
              <div className="font-semibold">{ticket.montan}</div>
              <div className="text-center">
                <button
                  onClick={() => handleDeleteTicket(index)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  data-testid={`delete-${index}`}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="bg-white border-t-2 border-gray-800">
          <div className="grid grid-cols-2 px-4 py-4">
            <div className="text-xl font-bold">Total Boul {totalBoul}</div>
            <div className="text-xl font-bold text-right">Total Miz {totalMiz}</div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0a2447] border-t-2 border-orange-500 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-around items-center">
          <button
            onClick={() => navigate('/home')}
            className="flex flex-col items-center gap-1 text-orange-500"
            data-testid="nav-home"
          >
            <Home size={24} />
            <span className="text-xs font-semibold">Akey</span>
          </button>
          
          <button
            className="flex flex-col items-center gap-1 text-white hover:text-orange-500 transition-colors"
            data-testid="nav-results"
          >
            <FileText size={24} />
            <span className="text-xs">Rezilta</span>
          </button>
          
          <button
            className="flex flex-col items-center gap-1 text-white hover:text-orange-500 transition-colors"
            data-testid="nav-help"
          >
            <HelpCircle size={24} />
            <span className="text-xs">Ed</span>
          </button>
          
          <button
            className="flex flex-col items-center gap-1 text-white hover:text-orange-500 transition-colors"
            data-testid="nav-copy"
          >
            <Copy size={24} />
            <span className="text-xs">Kopi</span>
          </button>
          
          <button
            className="flex flex-col items-center gap-1 text-white hover:text-orange-500 transition-colors"
            data-testid="nav-menu"
          >
            <Menu size={24} />
            <span className="text-xs">Meni</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default BoletPage;
