import React from 'react';

const MasalahLog = ({ search }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📄 Detektif Log</h2>
      <p className="text-gray-500 italic">Halaman Log masih kosong. Siap diisi dengan daftar perintah journalctl untuk mencari error.</p>
      {/* Konten Accordion / Daftar Masalah akan masuk ke sini */}
    </div>
  );
};

export default MasalahLog;
