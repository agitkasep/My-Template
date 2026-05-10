import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import TermsAndConditions from './TermsAndConditions';
// Import komponen Bank Masalah
import BankMasalah from './BankMasalah';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/" 
          element={isAuthenticated ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/terms" 
          element={<TermsAndConditions />} 
        />
        
        {/* RUTE BARU: Halaman Bank Masalah (Hanya bisa diakses kalau sudah login) */}
        <Route 
          path="/bank-masalah" 
          element={isAuthenticated ? <BankMasalah /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
