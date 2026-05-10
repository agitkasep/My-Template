import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import TermsAndConditions from './TermsAndConditions';

function App() {
  // State untuk melacak apakah user sudah login atau belum
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fungsi untuk mengubah status login
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <Routes>
        {/* Halaman Login */}
        <Route 
          path="/login" 
          element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        
        {/* Halaman Utama (Hanya bisa diakses jika sudah login) */}
        <Route 
          path="/" 
          element={isAuthenticated ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />

        {/* Halaman Syarat & Ketentuan (Bisa diakses siapa saja) */}
        <Route 
          path="/terms" 
          element={<TermsAndConditions />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
