import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import semua halaman masalah
import HasilPencarian from './HasilPencarian';
import MasalahNavigasi from './MasalahNavigasi';
import MasalahService from './MasalahService';
import MasalahLog from './MasalahLog';
import MasalahHardware from './MasalahHardware';
import MasalahDatabase from './MasalahDatabase';
import MasalahKeamanan from './MasalahKeamanan';

const BankMasalah = () => {
  const [activeTab, setActiveTab] = useState('NAVIGASI');
  const [searchTerm, setSearchTerm] = useState('');
  
  // STATE BARU: Untuk buka/tutup menu di HP
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'NAVIGASI', label: 'Navigasi', icon: '🧭' },
    { id: 'SERVICE', label: 'Service', icon: '⚙️' },
    { id: 'LOG', label: 'Log', icon: '📄' },
    { id: 'HARDWARE', label: 'Hardware', icon: '💻' },
    { id: 'DATABASE', label: 'Database', icon: '🗄️' },
    { id: 'KEAMANAN', label: 'Keamanan', icon: '🛡️' },
  ];

  const renderContent = () => {
    if (searchTerm.trim() !== "") {
      return <HasilPencarian search={searchTerm} />;
    }
    switch (activeTab) {
      case 'NAVIGASI': return <MasalahNavigasi />;
      case 'SERVICE': return <MasalahService />;
      case 'LOG': return <MasalahLog />;
      case 'HARDWARE': return <MasalahHardware />;
      case 'DATABASE': return <MasalahDatabase />;
      case 'KEAMANAN': return <MasalahKeamanan />;
      default: return <MasalahNavigasi />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans relative">
      
      {/* --- OVERLAY GELAP UNTUK HP --- */}
      {/* Muncul saat sidebar terbuka di HP. Kalau di-klik, sidebar tertutup */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      {/* Di HP: Posisi absolute & bisa digeser (translate-x). Di PC: Posisi relative & selalu tampil */}
      <aside 
        className={`fixed md:relative top-0 left-0 h-full w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black tracking-tighter text-blue-400">🛠️ AGIT TOOLS</h1>
            <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-widest">IT Support Dashboard</p>
          </div>
          {/* Tombol X untuk tutup sidebar di HP */}
          <button 
            className="md:hidden text-slate-400 hover:text-white text-2xl"
            onClick={() => setIsSidebarOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="p-5">
          <div className="relative group">
            <span className="absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-400">🔍</span>
            <input 
              type="text"
              placeholder="Cari kata kunci..."
              className="w-full bg-slate-800 border-none rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSearchTerm('');
                setIsSidebarOpen(false); // OTOMATIS TUTUP SIDEBAR SAAT MENU DIKLIK (di HP)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === item.id && searchTerm === ""
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 translate-x-1' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 px-4 py-3.5 w-full text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
          >
            <span>⬅️</span> Kembali ke Beranda
          </Link>
        </div>
      </aside>

      {/* --- AREA KONTEN UTAMA --- */}
      <main className="flex-1 flex flex-col h-full w-full overflow-hidden">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-10 py-4 flex justify-between items-center shadow-sm z-10 relative">
          <div className="flex items-center gap-3">
            {/* TOMBOL MENU HAMBURGER (Hanya muncul di HP) */}
            <button 
              className="md:hidden p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="text-xl">☰</span>
            </button>
            
            <div>
              <h2 className="text-lg md:text-2xl font-extrabold text-slate-800 leading-tight">
                {searchTerm ? "Hasil Pencarian" : activeTab}
              </h2>
              <p className="text-xs md:text-sm text-slate-400 hidden sm:block mt-0.5">
                Daftar kendala dan solusi
              </p>
            </div>
          </div>
        </header>

        {/* Konten Detail */}
        <section className="flex-1 p-4 md:p-10 overflow-y-auto bg-slate-50/50">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </section>

      </main>

    </div>
  );
};

export default BankMasalah;
        
