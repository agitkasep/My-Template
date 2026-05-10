import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Header Section */}
        <div className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Syarat dan Ketentuan Layanan</h1>
          <p className="text-gray-500 text-sm">Terakhir diperbarui: 10 Mei 2026</p>
        </div>

        {/* Content Section */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Pendahuluan</h2>
            <p>
              Selamat datang di layanan aplikasi kami. Dengan mendaftar, mengakses, atau menggunakan layanan digital ini, Anda secara otomatis menyetujui seluruh syarat dan ketentuan yang berlaku. Harap membaca dengan saksama sebelum melanjutkan penggunaan sistem.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Keamanan Akun dan Data</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Pengguna wajib menjaga kerahasiaan kata sandi (password) dan data autentikasi lainnya.</li>
              <li>Segala aktivitas transaksi dan pengelolaan data yang terjadi di bawah akun Anda sepenuhnya menjadi tanggung jawab Anda.</li>
              <li>Kami berkomitmen menjaga privasi data Anda dan tidak akan membagikannya kepada pihak ketiga tanpa persetujuan tertulis.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Penggunaan Layanan Digital</h2>
            <p>
              Fasilitas aplikasi ini disediakan untuk mempermudah akses informasi, pengelolaan media, dan transaksi operasional Anda. Pengguna dilarang keras menggunakan sistem ini untuk tindakan penipuan, manipulasi data, atau aktivitas yang melanggar hukum yang berlaku di Indonesia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Perubahan Ketentuan</h2>
            <p>
              Kami berhak sewaktu-waktu mengubah atau memperbarui Syarat dan Ketentuan ini. Perubahan akan diinformasikan melalui halaman ini atau notifikasi pada dashboard pengguna.
            </p>
          </section>

        </div>

        {/* Action Button */}
        <div className="mt-10 pt-6 border-t flex justify-end">
          <Link 
            to="/login" 
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Kembali ke Halaman Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;
