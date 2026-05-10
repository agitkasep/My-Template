import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import TermsAndConditions from './TermsAndConditions';

function App() {
  // Cek apakah di database browser sudah ada status login
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // Fungsi Login: Set state dan simpan ke database browser
  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsAuthenticated(true);
  };

  // Fungsi Logout: Hapus state dan hapus status dari database browser
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
      </Routes>
    </Router>
  );
}

export default App;
  );
}

export default App;
