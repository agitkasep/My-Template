import React from 'react';
import { Link } from 'react-router-dom'; // Tambahkan import Link untuk navigasi
import LayoutDashboard from './LayoutDashboard'; 
// Memanggil foto profil
import fotoProfil from './IMG_20260425_113801.png';

const HomePage = ({ onLogout }) => {
  // Nomor HP disiapkan untuk link (WA wajib pakai 62)
  const noTelp = "088224806861";
  const noWA = "6288224806861";

  return (
    <LayoutDashboard onLogout={onLogout}>
      
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto flex flex-col items-center text-center">
        
        {/* Foto Profil */}
        <div className="relative mb-6 mt-4">
          <img 
            src={fotoProfil} 
            alt="Agit Pamungkas" 
            className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full shadow-lg border-4 border-blue-50"
          />
          {/* Ornamen titik hijau online */}
          <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
        </div>

        {/* Nama & Label Profesi */}
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Agit Pamungkas Pesa Ningtyas</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">Fitter Kontruksi</span>
          <span className="px-4 py-1.5 bg-red-100 text-red-700 text-sm font-semibold rounded-full">YouTuber</span>
          <span className="px-4 py-1.5 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">Office Boy</span> {/* Sedikit penyesuaian label agar sesuai role baru */}
        </div>

        {/* Informasi Detail (Satu Baris Rata Tengah) */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 w-full mb-8 space-y-4 text-sm md:text-base text-gray-800 shadow-inner">
          
          <p>
            <span className="font-semibold text-gray-500 mr-2">Tempat, Tgl Lahir:</span> 
            Cirebon, 16 Juli 1978
          </p>
          
          <p>
            <span className="font-semibold text-gray-500 mr-2">Agama:</span> 
            Islam
          </p>
          
          <p>
            <span className="font-semibold text-gray-500 mr-2">Email:</span>
            <a href="mailto:agitkasep80@gmail.com" className="text-blue-600 hover:underline font-medium">
              agitkasep80@gmail.com
            </a>
          </p>
          
          <p>
            <span className="font-semibold text-gray-500 mr-2">YouTube:</span>
            <a href="https://youtube.com/@agitpamungkaspesaningtyas?si=EwRc3ccVAEunzHSY" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline font-medium">
              Agit Pamungkas Pesa Ningtyas
            </a>
          </p>
          
          <p className="leading-relaxed px-2">
            <span className="font-semibold text-gray-500 mr-2">Alamat:</span>
            Kampung Kalumpang, Desa Kalumpang No. 53, RT 03 / RW 01, Kec. Padarincang, Kab. Serang, Banten
          </p>

        </div>

        {/* AREA TOMBOL NAVIGASI & KONTAK */}
        <div className="flex flex-col w-full px-4 gap-4">
          
          {/* Tombol Utama: Trik dan Solusi IT (Akses ke Bank Masalah) */}
          <Link 
            to="/bank-masalah" 
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg w-full"
          >
            <span className="text-2xl">🛠️</span> Buka Dashboard Trik & Solusi IT
          </Link>

          {/* Tombol Kontak (Telepon & WhatsApp) disejajarkan di bawahnya */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
            <a 
              href={`tel:${noTelp}`}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg w-full sm:w-1/2"
            >
              <span className="text-xl">📞</span> Hubungi Telepon
            </a>
            
            <a 
              href={`https://wa.me/${noWA}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg w-full sm:w-1/2"
            >
              <span className="text-xl">💬</span> Chat WhatsApp
            </a>
          </div>

        </div>

      </div>
      
    </LayoutDashboard>
  );
};

export default HomePage;
