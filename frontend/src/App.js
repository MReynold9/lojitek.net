import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import '@/App.css';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
import CompanySetupPage from '@/pages/CompanySetupPage';
import HomePage from '@/pages/HomePage';
import ConditionsPage from '@/pages/ConditionsPage';
import DashboardPage from '@/pages/DashboardPage';
import LotriPage from '@/pages/LotriPage';
import LotriInfoPage from '@/pages/LotriInfoPage';
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

// Company Setup Route - requires auth but redirects to home if company exists
const CompanySetupRoute = ({ children, admin }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  if (admin?.has_company) {
    return <Navigate to="/home" replace />;
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
          // Check if admin has company
          try {
            await axios.get(`${API}/company/my-company`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setAdmin({ ...response.data, has_company: true });
          } catch {
            setAdmin({ ...response.data, has_company: false });
          }
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (token, adminData) => {
    localStorage.setItem('token', token);
    // Check if admin has company
    try {
      await axios.get(`${API}/company/my-company`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdmin({ ...adminData, has_company: true });
    } catch {
      setAdmin({ ...adminData, has_company: false });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAdmin(null);
  };

  const updateAdminCompanyStatus = () => {
    if (admin) {
      setAdmin({ ...admin, has_company: true });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a1628]">
        <div className="text-white text-xl">Chajman...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, updateAdminCompanyStatus, API }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={admin ? (admin.has_company ? <Navigate to="/home" replace /> : <Navigate to="/company-setup" replace />) : <LandingPage />} />
            <Route path="/login" element={admin ? (admin.has_company ? <Navigate to="/home" replace /> : <Navigate to="/company-setup" replace />) : <LoginPage />} />
            <Route path="/register" element={admin ? (admin.has_company ? <Navigate to="/home" replace /> : <Navigate to="/company-setup" replace />) : <RegisterPage />} />
            <Route path="/reset-password" element={admin ? (admin.has_company ? <Navigate to="/home" replace /> : <Navigate to="/company-setup" replace />) : <ResetPasswordPage />} />
            <Route
              path="/company-setup"
              element={
                <CompanySetupRoute admin={admin}>
                  <CompanySetupPage />
                </CompanySetupRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  {admin?.has_company ? <HomePage /> : <Navigate to="/company-setup" replace />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/conditions"
              element={
                <ProtectedRoute>
                  {admin?.has_company ? <ConditionsPage /> : <Navigate to="/company-setup" replace />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {admin?.has_company ? <DashboardPage /> : <Navigate to="/company-setup" replace />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/lotri"
              element={
                <ProtectedRoute>
                  {admin?.has_company ? <LotriPage /> : <Navigate to="/company-setup" replace />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/paryaj"
              element={
                <ProtectedRoute>
                  {admin?.has_company ? <ParyajPage /> : <Navigate to="/company-setup" replace />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/casino"
              element={
                <ProtectedRoute>
                  {admin?.has_company ? <CasinoPage /> : <Navigate to="/company-setup" replace />}
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