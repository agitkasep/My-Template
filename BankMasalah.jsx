import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import komponen-komponen masalah (Sesuaikan path-nya dengan folder Anda)
// import MasalahNavigasi from './MasalahNavigasi';
// import MasalahService from './MasalahService';
// import MasalahLog from './MasalahLog';
// import MasalahHardware from './MasalahHardware';
// import MasalahDatabase from './MasalahDatabase';
// import Keamanan from './Keamanan';

const BankMasalah = () => {
  const [activeTab, setActiveTab] = useState('NAVIGASI');
  const [searchTerm, setSearchTerm] = useState('');

  // Data Menu Sidebar
  const menuItems = [
    { id: 'NAVIGASI', label: 'Navigasi', icon: '🧭' },
    { id: 'SERVICE', label: 'Service', icon: '⚙️' },
    { id: 'LOG', label: 'Log', icon: '📄' },
    { id: 'HARDWARE', label: 'Hardware', icon: '💻' },
    { id: 'DATABASE', label: 'Database', icon: '🗄️' },
    { id: 'KEAMANAN', label: 'Keamanan', icon: '🛡️' },
  ];

  // Fungsi untuk merender komponen berdasarkan tab yang aktif
  const renderContent = () => {
    // Jika ada pencarian, sistem bisa diarahkan ke fungsi filter global
    // Untuk sementara, ini adalah routing antar tab
    switch (activeTab) {
      case 'NAVIGASI': return <div className="p-4 bg-white rounded-xl border border-gray-200"> {/* <MasalahNavigasi search={searchTerm} /> */} <p className="text-gray-500 italic">Memuat Masalah Navigasi...</p></div>;
      case 'SERVICE': return <div className="p-4 bg-white rounded-xl border border-gray-200"> {/* <MasalahService search={searchTerm} /> */} <p className="text-gray-500 italic">Memuat Masalah Service...</p></div>;
      case 'LOG': return <div className="p-4 bg-white rounded-xl border border-gray-200"> {/* <MasalahLog search={searchTerm} /> */} <p className="text-gray-500 italic">Memuat Masalah Log...</p></div>;
      case 'HARDWARE': return <div className="p-4 bg-white rounded-xl border border-gray-200"> {/* <MasalahHardware search={searchTerm} /> */} <p className="text-gray-500 italic">Memuat Masalah Hardware...</p></div>;
      case 'DATABASE': return <div className="p-4 bg-white rounded-xl border border-gray-200"> {/* <MasalahDatabase search={searchTerm} /> */} <p className="text-gray-500 italic">Memuat Masalah Database...</p></div>;
      case 'KEAMANAN': return <div className="p-4 bg-white rounded-xl border border-gray-200"> {/* <Keamanan search={searchTerm} /> */} <p className="text-gray-500 italic">Memuat Masalah Keamanan...</p></div>;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-gray-900 text-white flex flex-col shadow-2xl">
        
        {/* Header Sidebar */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold tracking-widest text-blue-400">BANK MASALAH</h1>
          <p className="text-xs text-gray-400 mt-1">IT Support Dashboard v1.0</p>
        </div>

        {/* 1. Kolom Pencarian Super Smart */}
        <div className="p-4">
          <div className="relative">
            <input 
              type="text"
              placeholder="Cari kata kunci..."
              className="w-full bg-gray-800 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-2.5">🔍</span>
          </div>
          {/* 2. Teks Deskripsi */}
          <p className="text-[10px] text-gray-500 mt-3 uppercase tracking-wider font-semibold px-1">
            Cari solusimu berdasarkan kasusmu
          </p>
        </div>

        {/* 3-8. Daftar Tab Navigasi */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* 9. Tab Back (Kembali ke HomePage) */}
        <div className="p-4 border-t border-gray-800">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
          >
            <span>⬅️</span> Kembali ke Beranda
          </Link>
        </div>
      </aside>

      {/* --- KONTEN UTAMA --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header Konten */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">
            Kategori: <span className="text-blue-600">{activeTab}</span>
          </h2>
          {searchTerm && (
            <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full animate-pulse">
              Mencari: "{searchTerm}"
            </span>
          )}
        </header>

        {/* Area Render Masalah */}
        <section className="flex-1 p-8 overflow-y-auto bg-slate-50">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </section>

      </main>

    </div>
  );
};

export default BankMasalah;
    
