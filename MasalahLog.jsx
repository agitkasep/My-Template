import React, { useState } from 'react';

const MasalahLog = ({ search = "" }) => {
  const [openId, setOpenId] = useState(null);

  // DATA DETEKTIF LOG LENGKAP
  const dataLog = [
    { 
      id: 1, 
      title: "Pantau Log Secara Live (CCTV Mode)", 
      diag: "Ingin melihat aktivitas aplikasi (user login/transaksi) yang sedang terjadi detik ini juga.", 
      cmd: "sudo journalctl -u koperasi-app -f",
      note: "Perintah ini tidak akan berhenti (terus berjalan seiring masuknya log baru). Tekan tombol 'Ctrl + C' pada keyboard untuk keluar dari mode live ini."
    },
    { 
      id: 2, 
      title: "Cek Error Paling Baru (Scroll ke Bawah)", 
      diag: "Aplikasi baru saja mati, Anda butuh melihat pesan error terakhir tanpa harus scroll dari atas.", 
      cmd: "sudo journalctl -u koperasi-app -e",
      note: "Perintah ini langsung melempar Anda ke halaman paling ujung (terbaru) dari catatan log. Tekan huruf 'q' untuk keluar."
    },
    { 
      id: 3, 
      title: "Filter Khusus Pesan Error (Kritis)", 
      diag: "Log sangat panjang dan bikin pusing. Anda hanya ingin melihat baris peringatan yang penting saja.", 
      cmd: "sudo journalctl -u koperasi-app -p err",
      note: "Sangat berguna untuk mengabaikan pesan 'Info' biasa dan langsung fokus pada masalah utama yang membuat sistem gagal."
    },
    { 
      id: 4, 
      title: "Cek Log Khusus Hari Ini Saja", 
      diag: "Nasabah lapor ada kendala pagi ini, Anda tidak butuh melihat data log kemarin.", 
      cmd: "sudo journalctl -u koperasi-app --since today",
      note: "Menghemat waktu pencarian dengan memotong data log dan hanya menampilkan kejadian dari jam 00:00 hari ini."
    },
    { 
      id: 5, 
      title: "Cek Log di Jam Spesifik (Investigasi)", 
      diag: "Bos bertanya, 'Tadi jam 2 siang sampai jam 3 ada kendala apa di aplikasi?'", 
      cmd: "sudo journalctl -u koperasi-app --since \"14:00\" --until \"15:00\"",
      note: "Format waktunya adalah 'HH:MM'. Sangat pas untuk menginvestigasi laporan error dari jam spesifik."
    },
    { 
      id: 6, 
      title: "Cari Kata Kunci Tertentu (Grep)", 
      diag: "Mencari transaksi user tertentu atau error database (misal ingin mencari kata 'panic' atau 'timeout').", 
      cmd: "sudo journalctl -u koperasi-app | grep -i \"kata_kunci\"",
      note: "Ganti teks 'kata_kunci' dengan teks yang dicari. Bendera '-i' membuat Linux mengabaikan huruf besar atau kecil saat mencari."
    },
    { 
      id: 7, 
      title: "Cek Ukuran File Log di Hardisk", 
      diag: "Hardisk PC server tiba-tiba penuh, curiga file log aplikasi menumpuk terlalu besar.", 
      cmd: "journalctl --disk-usage",
      note: "Hanya mengecek ukuran, tidak menghapus apa-apa. Jika angkanya besar (bergiga-giga), segera lakukan pembersihan (Vacuum)."
    },
    { 
      id: 8, 
      title: "Bersihkan Log Lama (Vacuum)", 
      diag: "Hardisk penuh, aplikasi macet. Anda ingin membuang log lama dan menyisakan data 7 hari terakhir saja.", 
      cmd: "sudo journalctl --vacuum-time=7d",
      note: "Trik rahasia IT Support menyelamatkan server sesak napas. Anda bisa ubah angkanya, misal '3d' untuk 3 hari, atau '1G' untuk membatasi ukuran maksimal 1 GB."
    },
    { 
      id: 9, 
      title: "Cek Log Inti Sistem (Kernel / Hardware)", 
      diag: "Bukan aplikasi yang error, tapi PC Server tiba-tiba restart sendiri atau kabel LAN/Flashdisk tidak terbaca.", 
      cmd: "sudo dmesg -T",
      note: "Menampilkan log langsung dari inti Linux (hardware). Bendera '-T' berguna agar log waktu kejadian mudah dibaca oleh manusia."
    },
    { 
      id: 10, 
      title: "Cek Log Keamanan (Percobaan Hacker)", 
      diag: "Curiga ada yang coba menebak password server Anda dari jaringan luar.", 
      cmd: "sudo tail -n 50 /var/log/auth.log",
      note: "Menampilkan 50 baris terakhir dari catatan satpam Linux. Jika ada banyak pesan 'Failed password', berarti ada serangan Brute Force."
    }
  ];

  const filteredData = dataLog.filter(item =>
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
          <p className="text-gray-400 text-sm">Tidak ada masalah log yang cocok dengan pencarian.</p>
        </div>
      )}
    </div>
  );
};

export default MasalahLog;
      
