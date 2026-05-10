import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children, onLogout }) => {
  // Daftar menu umum yang sering dipakai
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '🏠' },
    { name: 'Profile', path: '/profile', icon: '👤' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
    { name: 'Messages', path: '/messages', icon: '✉️' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar Samping Kiri */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        {/* Logo / Judul Aplikasi */}
        <div className="p-6 text-2xl font-bold border-b border-gray-800 tracking-wider">
          MyApp.
        </div>
        
        {/* Navigasi Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Tombol Sign Out (Paling Bawah) */}
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={onLogout}
            className="flex items-center w-full gap-4 px-4 py-3 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Area Konten Utama (Kanan) */}
      <main className="flex-1 p-8">
        {children}
      </main>
      
    </div>
  );
};

export default Layout;
        
