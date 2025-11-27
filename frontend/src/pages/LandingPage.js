import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen circuit-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="lojitek-logo mx-auto" data-testid="logo-container">
            <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
              <path d="M20 50 L35 35 L50 50 L65 35 L80 50" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="35" cy="35" r="4" fill="white"/>
              <circle cx="50" cy="50" r="4" fill="white"/>
              <circle cx="65" cy="35" r="4" fill="white"/>
              <rect x="20" y="60" width="60" height="20" rx="4" fill="white" fillOpacity="0.3"/>
            </svg>
          </div>
          <h1 className="text-5xl font-bold mt-4 mb-2" style={{ fontFamily: 'Exo 2, sans-serif' }} data-testid="main-title">
            LOJITEK
          </h1>
          <p className="text-xl text-gray-300" data-testid="subtitle">SOLISYON ENTÈLIJAN POU BIZNIS OU</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate('/login')}
            className="btn-secondary w-full"
            data-testid="landing-login-button"
          >
            KONEKTE
          </button>

          <button
            onClick={() => navigate('/register')}
            className="btn-primary w-full"
            data-testid="landing-register-button"
          >
            KREYE YON NOUVO KONT
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;