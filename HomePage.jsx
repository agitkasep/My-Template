import React from 'react';
import LayoutDashboard from './LayoutDashboard'; 
// Memanggil foto yang baru saja Anda upload
import fotoProfil from './IMG_20260425_113801.png';

const HomePage = ({ onLogout }) => {
  return (
    <LayoutDashboard onLogout={onLogout}>
      
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
        
        {/* Header Portofolio */}
        <div className="text-center md:text-left mb-8 border-b border-gray-100 pb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Profil Kreator</h1>
          <p className="text-gray-500">Selamat datang di halaman portofolio digital saya.</p>
        </div>

        {/* Konten Portofolio: Dibagi 2 kolom di layar besar */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          {/* Bagian Kiri: Foto */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="relative">
              <img 
                src={fotoProfil} 
                alt="Agit Pamungkas" 
                className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full shadow-lg border-4 border-blue-50"
              />
              {/* Ornamen titik hijau online */}
              <div className="absolute bottom-4 right-4 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
            </div>
          </div>

          {/* Bagian Kanan: Data Diri */}
          <div className="w-full md:w-2/3 space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Agit Pamungkas Pesa Ningtyas</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">IT Developer</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">YouTuber</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">Songwriter</span>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-2 text-sm md:text-base">
                
                <dt className="font-semibold text-gray-600">Tempat, Tgl Lahir</dt>
                <dd className="sm:col-span-2 text-gray-800 font-medium">Cirebon, 16 Juli 1978</dd>

                <dt className="font-semibold text-gray-600">Agama</dt>
                <dd className="sm:col-span-2 text-gray-800 font-medium">Islam</dd>

                <dt className="font-semibold text-gray-600">Email</dt>
                <dd className="sm:col-span-2 font-medium">
                  <a href="mailto:agitkasep80@gmail.com" className="text-blue-600 hover:underline">
                    agitkasep80@gmail.com
                  </a>
                </dd>

                <dt className="font-semibold text-gray-600">YouTube</dt>
                <dd className="sm:col-span-2 font-medium">
                  <a 
                    href="https://youtube.com/@agitpamungkaspesaningtyas?si=EwRc3ccVAEunzHSY" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-red-600 hover:underline flex items-center gap-1"
                  >
                    <span>▶️</span> Kunjungi Channel Saya
                  </a>
                </dd>

                <dt className="font-semibold text-gray-600 mt-2">Alamat Lengkap</dt>
                <dd className="sm:col-span-2 text-gray-800 font-medium leading-relaxed mt-2 sm:mt-0">
                  Kampung Kalumpang, Desa Kalumpang No. 53, RT 03 / RW 01, <br />
                  Kecamatan Padarincang, Kabupaten Serang, Banten
                </dd>

              </dl>
            </div>
            
          </div>
        </div>

      </div>
      
    </LayoutDashboard>
  );
};

export default HomePage;
