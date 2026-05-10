import React, { useState } from 'react';

const HasilPencarian = ({ search }) => {
  // Database Masalah Gabungan (Semua Poin 1-6)
  const allData = [
    { cat: "NAVIGASI", title: "Cek Lokasi & File", cmd: "ls -la && pwd", diag: "Cek posisi folder/file hidden." },
    { cat: "SERVICE", title: "Restart App", cmd: "sudo systemctl restart aplikasi", diag: "Aplikasi crash atau ganti config." },
    { cat: "LOG", title: "Cek Error", cmd: "sudo journalctl -u app -e", diag: "Mencari penyebab aplikasi failed." },
    { cat: "HARDWARE", title: "Cek RAM", cmd: "free -m", diag: "Memastikan sisa memori tersedia." },
    { cat: "DATABASE", title: "Backup DB", cmd: "pg_dump db > backup.sql", diag: "Amankan data sebelum edit." },
    { cat: "KEAMANAN", title: "Cek Port", cmd: "sudo ufw status", diag: "Melihat pintu mana yang terbuka." },
    // Tambahkan data lainnya di sini...
  ];

  const [openId, setOpenId] = useState(null);

  // Logic Filter Pintar
  const filtered = allData.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.diag.toLowerCase().includes(search.toLowerCase()) ||
    item.cat.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Perintah disalin!");
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
        <p className="text-blue-800 text-sm">
          🔎 Menampilkan hasil untuk: <span className="font-bold">"{search}"</span>
          <span className="ml-2 text-blue-500">({filtered.length} ditemukan)</span>
        </p>
      </div>

      {filtered.length > 0 ? filtered.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div 
            className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50"
            onClick={() => setOpenId(openId === index ? null : index)}
          >
            <div>
              <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded mr-2 font-bold uppercase">{item.cat}</span>
              <span className="font-semibold text-gray-800">{item.title}</span>
            </div>
            <span className="text-gray-400">{openId === index ? '▲' : '▼'}</span>
          </div>

          {openId === index && (
            <div className="p-4 bg-gray-50 border-t border-gray-100 animate-fadeIn">
              <p className="text-sm text-gray-600 mb-3"><strong>Diagnosa:</strong> {item.diag}</p>
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg flex justify-between items-center font-monospace text-sm">
                <code>{item.cmd}</code>
                <button 
                  onClick={() => copyToClipboard(item.cmd)}
                  className="bg-gray-700 hover:bg-gray-600 text-white text-[10px] px-3 py-1 rounded transition-colors"
                >
                  COPY
                </button>
              </div>
            </div>
          )}
        </div>
      )) : (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400">Kasus tidak ditemukan. Coba gunakan kata kunci lain.</p>
        </div>
      )}
    </div>
  );
};

export default HasilPencarian;
