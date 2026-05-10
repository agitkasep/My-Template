import React from 'react';

const MasalahDatabase = ({ search }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🗄️ Database PostgreSQL</h2>
      <p className="text-gray-500 italic">Halaman Database masih kosong. Siap diisi dengan cara backup (pg_dump) dan atasi koneksi.</p>
      {/* Konten Accordion / Daftar Masalah akan masuk ke sini */}
    </div>
  );
};

export default MasalahDatabase;
