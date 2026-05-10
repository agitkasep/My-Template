import React from 'react';
import LayoutDashboard from './LayoutDashboard'; 

const HomePage = ({ onLogout }) => {
  return (
    // Memanggil Layout Gabungan (Sidebar + Navbar)
    <LayoutDashboard onLogout={onLogout}>
      
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Selamat Datang di Agit Studio!</h1>
        <p className="text-gray-600 mb-8">Ini adalah tampilan profesional yang memiliki Sidebar di kiri dan Navbar di atas.</p>
        
        {/* Kartu Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 transition hover:shadow-md hover:-translate-y-1">
            <h3 className="text-blue-800 text-sm font-semibold">Total Pengguna</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">1,245</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl border border-green-100 transition hover:shadow-md hover:-translate-y-1">
            <h3 className="text-green-800 text-sm font-semibold">Pendapatan</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">Rp 8.430.000</p>
          </div>
          <div className="bg-red-50 p-6 rounded-xl border border-red-100 transition hover:shadow-md hover:-translate-y-1">
            <h3 className="text-red-800 text-sm font-semibold">Tugas Tertunda</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">12</p>
          </div>
        </div>

        {/* Tambahan: Tabel/List Aktivitas Dummy agar terlihat seperti real app */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4">Aktivitas Terbaru</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-3">
              <span className="text-green-500 text-lg">🟢</span> 
              Sistem berhasil diperbarui ke versi 2.0.
            </li>
            <li className="flex items-center gap-3">
              <span className="text-blue-500 text-lg">🔵</span> 
              User "Budi" baru saja mendaftar dari Jakarta.
            </li>
            <li className="flex items-center gap-3">
              <span className="text-red-500 text-lg">🔴</span> 
              Laporan keuangan bulanan belum diverifikasi.
            </li>
          </ul>
        </div>

      </div>
      
    </LayoutDashboard>
  );
};

export default HomePage;
