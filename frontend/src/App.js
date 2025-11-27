import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import '@/App.css';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import LotriPage from '@/pages/LotriPage';
import ParyajPage from '@/pages/ParyajPage';
import CasinoPage from '@/pages/CasinoPage';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Context for auth
export const AuthContext = React.createContext();

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${API}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setAdmin(response.data);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = (token, adminData) => {
    localStorage.setItem('token', token);
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAdmin(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a1628]">
        <div className="text-white text-xl">Chajman...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, API }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={admin ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
            <Route path="/login" element={admin ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
            <Route path="/register" element={admin ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lotri"
              element={
                <ProtectedRoute>
                  <LotriPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/paryaj"
              element={
                <ProtectedRoute>
                  <ParyajPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/casino"
              element={
                <ProtectedRoute>
                  <CasinoPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;