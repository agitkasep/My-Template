import React, { useState } from 'react';

const MasalahDatabase = ({ search = "" }) => {
  const [openId, setOpenId] = useState(null);

  // DATA DATABASE LENGKAP
  const dataDatabase = [
    { 
      id: 1, 
      title: "Web Error: Connection Refused", 
      diag: "Aplikasi Golang tidak bisa terhubung ke database. Kemungkinan service PostgreSQL mati atau macet.", 
      cmd: "sudo systemctl restart postgresql",
      note: "Ini adalah 'Pertolongan Pertama' paling ampuh jika web tiba-tiba blank karena gagal memuat data nasabah."
    },
    { 
      id: 2, 
      title: "Backup Database (Wajib Rutin!)", 
      diag: "Mengamankan seluruh data koperasi sebelum melakukan update aplikasi atau mencegah data hilang saat hardisk rusak.", 
      cmd: "sudo -u postgres pg_dump koperasi_db > backup_koperasi.sql",
      note: "Ganti 'koperasi_db' dengan nama database yang sebenarnya. File hasil backup (.sql) wajib didownload ke laptop Windows Anda."
    },
    { 
      id: 3, 
      title: "Restore (Kembalikan) Database", 
      diag: "Terjadi kerusakan data yang parah, dan Anda harus mengembalikan kondisi database dari file backup (.sql) kemarin.", 
      cmd: "sudo -u postgres psql koperasi_db < backup_koperasi.sql",
      note: "Perhatikan tanda panahnya ke kiri (<). Artinya kita memasukkan isi file backup_koperasi.sql ke dalam koperasi_db."
    },
    { 
      id: 4, 
      title: "Masuk ke Ruang Brankas (Terminal Psql)", 
      diag: "Ingin mengecek tabel, melihat data secara manual, atau menjalankan perintah SQL langsung di dalam mesin.", 
      cmd: "sudo -u postgres psql",
      note: "Anda akan masuk ke mode 'postgres=#'. Ingat, untuk keluar dari tempat ini dan kembali ke Linux biasa, ketik '\\q' lalu tekan Enter."
    },
    { 
      id: 5, 
      title: "Melihat Daftar Semua Database", 
      diag: "Lupa nama pasti dari database koperasi yang dibuat oleh bos/teman Anda.", 
      cmd: "sudo -u postgres psql -c \"\\l\"",
      note: "Perintah ini bisa langsung diketik dari Linux tanpa harus masuk ke dalam terminal psql dulu. Akan muncul tabel daftar nama database."
    },
    { 
      id: 6, 
      title: "Cek Pintu Database (Port 5432)", 
      diag: "Aplikasi error, Anda ingin memastikan apakah PostgreSQL benar-benar sudah 'membuka pintu' di port bawaannya (5432).", 
      cmd: "sudo ss -tulpn | grep 5432",
      note: "Jika hasilnya kosong, berarti database belum berjalan sempurna. Jika ada tulisan LISTEN, berarti pintu database aman."
    },
    { 
      id: 7, 
      title: "Ganti Password User Database", 
      diag: "Ingin mengubah kata sandi utama database untuk alasan keamanan atau karena password lama bocor.", 
      cmd: "sudo -u postgres psql -c \"ALTER USER postgres PASSWORD 'PasswordBaru123';\"",
      note: "Ganti 'PasswordBaru123' dengan sandi yang kuat. Ingat, jika password database diganti, Anda WAJIB mengubah konfigurasi di aplikasi Golangnya juga!"
    },
    { 
      id: 8, 
      title: "Bersihkan Ruang Database (Vacuum)", 
      diag: "Aplikasi terasa lambat saat mencari data nasabah karena banyak tumpukan data 'sampah' (bekas hapusan/update) di dalam tabel.", 
      cmd: "sudo -u postgres vacuumdb --all",
      note: "Sangat disarankan dilakukan sebulan sekali saat aplikasi sedang sepi/malam hari agar pencarian data kembali 'ngebut'."
    },
    { 
      id: 9, 
      title: "Cek Siapa yang Sedang Terkoneksi", 
      diag: "Ingin melihat apakah aplikasi Golang sedang tersambung, atau adakah orang tak dikenal yang masuk ke database.", 
      cmd: "sudo -u postgres psql -c \"SELECT pid, usename, client_addr FROM pg_stat_activity;\"",
      note: "Akan memunculkan daftar IP address dan aplikasi apa saja yang sedang 'menyedot' data dari PostgreSQL."
    },
    { 
      id: 10, 
      title: "Cek Log Error Khusus Database", 
      diag: "Database sering mati sendiri tanpa alasan yang jelas. Anda butuh catatan errornya untuk dilaporkan ke bos/teman developer.", 
      cmd: "sudo journalctl -u postgresql -e",
      note: "Sama seperti log aplikasi, ini akan menampilkan baris terakhir penyebab crash pada PostgreSQL. Cari tulisan berwarna merah atau 'FATAL'."
    }
  ];

  const filteredData = dataDatabase.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.diag.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Perintah disalin!");
  };

  return (
    <div className="space-y-4">
      {filteredData.length > 0 ? filteredData.map((item) => (
        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all">
          <div 
            className="p-5 cursor-pointer flex justify-between items-center hover:bg-gray-50"
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-sm font-bold">
                {item.id}
              </span>
              <span className="font-bold text-slate-700">{item.title}</span>
            </div>
            <span className="text-slate-400">{openId === item.id ? '▲' : '▼'}</span>
          </div>

          {openId === item.id && (
            <div className="px-5 pb-5 pt-2 bg-slate-50 border-t border-gray-100">
              <div className="mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Diagnosa & Skenario:</p>
                <p className="text-sm text-slate-600">{item.diag}</p>
              </div>

              {/* CATATAN PENTING */}
              <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <p className="text-[10px] font-bold text-yellow-700 uppercase tracking-wider mb-1">Catatan Penting:</p>
                <p className="text-xs text-yellow-800 leading-relaxed italic">{item.note}</p>
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Terminal Command:</p>
                <div className="bg-slate-900 rounded-lg p-4 flex justify-between items-center group relative">
                  <code className="text-blue-300 text-sm font-mono break-all">{item.cmd}</code>
                  <button 
                    onClick={() => handleCopy(item.cmd)}
                    className="ml-4 bg-slate-700 hover:bg-blue-600 text-white text-[10px] font-bold px-3 py-2 rounded-md transition-colors"
                  >
                    COPY
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )) : (
        <div className="text-center py-10 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-sm">Tidak ada masalah database yang cocok dengan pencarian.</p>
        </div>
      )}
    </div>
  );
};

export default MasalahDatabase;
    
