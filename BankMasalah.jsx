import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import semua halaman masalah yang sudah Anda buat
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

  // Konfigurasi Menu Sidebar
  const menuItems = [
    { id: 'NAVIGASI', label: 'Navigasi', icon: '🧭' },
    { id: 'SERVICE', label: 'Service', icon: '⚙️' },
    { id: 'LOG', label: 'Log', icon: '📄' },
    { id: 'HARDWARE', label: 'Hardware', icon: '💻' },
    { id: 'DATABASE', label: 'Database', icon: '🗄️' },
    { id: 'KEAMANAN', label: 'Keamanan', icon: '🛡️' },
  ];

  // Fungsi Logika Pengatur Tampilan (Render)
  const renderContent = () => {
    // PRIORITAS 1: Jika user sedang mengetik, langsung tampilkan HasilPencarian.jsx
    if (searchTerm.trim() !== "") {
      return <HasilPencarian search={searchTerm} />;
    }

    // PRIORITAS 2: Jika kolom pencarian kosong, tampilkan berdasarkan Tab yang dipilih
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
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* --- SIDEBAR (Kiri) --- */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-10">
        
        {/* Logo & Versi */}
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-black tracking-tighter text-blue-400">🛠️ AGIT TOOLS</h1>
          <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-widest">IT Support Bank Masalah</p>
        </div>

        {/* 1. Kolom Pencarian Super Smart */}
        <div className="p-5">
          <div className="relative group">
            <span className="absolute left-3 top-3 text-gray-400 group-focus-within:text-blue-400 transition-colors">🔍</span>
            <input 
              type="text"
              placeholder="Cari kata kunci..."
              className="w-full bg-slate-800 border-none rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* 2. Teks Deskripsi */}
          <p className="text-[11px] text-slate-500 mt-4 px-1 font-medium leading-relaxed">
            Cari solusimu berdasarkan kasusmu...
          </p>
        </div>

        {/* 3-8. Tombol Kategori (Tabs) */}
        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSearchTerm(''); // Mengosongkan pencarian saat klik kategori
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

        {/* 9. Tombol Kembali (Back to Dashboard) */}
        <div className="p-4 border-t border-slate-800">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 px-4 py-3.5 w-full text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
          >
            <span>⬅️</span> Kembali ke Beranda
          </Link>
        </div>
      </aside>

      {/* --- AREA KONTEN (Kanan) --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header Dinamis */}
        <header className="bg-white border-b border-gray-200 px-10 py-5 flex justify-between items-center shadow-sm">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">
              {searchTerm ? "Hasil Pencarian" : activeTab}
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              {searchTerm ? `Menemukan solusi untuk "${searchTerm}"` : `Daftar kendala dan solusi kategori ${activeTab.toLowerCase()}`}
            </p>
          </div>
          
          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[11px] font-bold text-green-700 uppercase tracking-wider">System Online</span>
          </div>
        </header>

        {/* Area Utama Render Komponen */}
        <section className="flex-1 p-10 overflow-y-auto bg-slate-50/50">
          <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {renderContent()}
          </div>
        </section>

      </main>

    </div>
  );
};

export default BankMasalah;
     
