import React from 'react';
import { Link } from 'react-router-dom';

const LayoutDashboard = ({ children, onLogout }) => {
  // Menu Sidebar
  const menuItems = [
    { name: 'Beranda', path: '/', icon: '🏠' },
    { name: 'Transaksi', path: '/transaksi', icon: '💰' },
    { name: 'Laporan', path: '/laporan', icon: '📊' },
    { name: 'Pengaturan', path: '/pengaturan', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* 1. SIDEBAR (Bagian Kiri) */}
      <aside className="w-64 bg-gray-900 text-white flex-col hidden md:flex">
        {/* Logo Sidebar */}
        <div className="h-16 flex items-center px-6 bg-gray-950 border-b border-gray-800">
          <span className="text-2xl mr-2">🚀</span>
          <span className="text-xl font-bold tracking-wider">Agit Studio</span>
        </div>
        
        {/* Menu Navigasi Sidebar */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* AREA KANAN (Navbar + Konten Utama) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* 2. NAVBAR (Bagian Atas Sisi Kanan) */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6 z-10 border-b border-gray-200">
          <div className="flex items-center">
            {/* Judul Halaman di Navbar */}
            <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">Dashboard Overview</h2>
            {/* Logo Mobile (muncul jika dibuka di HP / Sidebar sembunyi) */}
            <span className="md:hidden text-xl font-bold text-blue-600">🚀 Agit Studio</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Info Admin/User */}
            <div className="hidden sm:flex items-center gap-2 text-gray-600">
              <span className="text-xl">👤</span>
              <span className="font-medium">Admin</span>
            </div>
            
            {/* Tombol Sign Out di Navbar Kanan */}
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold border border-red-100"
            >
              <span>Sign Out</span>
              <span>🚪</span>
            </button>
          </div>
        </header>

        {/* 3. KONTEN UTAMA (Bagian Bawah Navbar) */}
        {/* overflow-auto memastikan area ini bisa di-scroll tanpa menggeser Navbar/Sidebar */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
};

export default LayoutDashboard;
        
