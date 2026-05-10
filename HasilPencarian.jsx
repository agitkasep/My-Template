import React from 'react';

const HasilPencarian = ({ search }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Hasil Pencarian</h2>
      {search ? (
        <p className="text-gray-600">Menampilkan hasil untuk kata kunci: <span className="font-semibold text-blue-600">"{search}"</span></p>
      ) : (
        <p className="text-gray-500">Silakan ketikkan masalah Anda di kolom pencarian.</p>
      )}
      {/* Area untuk menampilkan map data hasil pencarian nantinya */}
    </div>
  );
};

export default HasilPencarian;
