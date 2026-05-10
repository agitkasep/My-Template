import React, { useState } from 'react';

const MasalahService = ({ search = "" }) => {
  const [openId, setOpenId] = useState(null);

  // DATA SERVICE LENGKAP
  const dataService = [
    { 
      id: 1, 
      title: "Cek Status Aplikasi", 
      diag: "Ingin memastikan apakah aplikasi Golang sedang berjalan (active) atau mati (failed).", 
      cmd: "sudo systemctl status koperasi-app",
      note: "Perhatikan teks berwarna hijau (active/running) atau merah (failed). Jika teksnya panjang dan tidak bisa mengetik lagi, tekan tombol 'q' untuk keluar dari mode status."
    },
    { 
      id: 2, 
      title: "Menyalakan Aplikasi (Start)", 
      diag: "Aplikasi sedang dalam kondisi mati (dead) dan perlu dihidupkan.", 
      cmd: "sudo systemctl start koperasi-app",
      note: "Perintah ini tidak akan memunculkan teks apa-apa jika berhasil. Selalu lanjutkan dengan perintah 'status' untuk memastikan aplikasi benar-benar menyala."
    },
    { 
      id: 3, 
      title: "Mematikan Aplikasi Sementara (Stop)", 
      diag: "Ingin menghentikan aplikasi untuk proses perbaikan (maintenance) atau pindah data.", 
      cmd: "sudo systemctl stop koperasi-app",
      note: "Hati-hati, saat perintah ini dijalankan, semua pengguna/nasabah tidak akan bisa mengakses aplikasi sampai Anda menyalakannya kembali."
    },
    { 
      id: 4, 
      title: "Restart Aplikasi (Mulai Ulang)", 
      diag: "Aplikasi terasa lemot, nge-bug, atau Anda baru saja mengubah file konfigurasi (.json) dan butuh refresh.", 
      cmd: "sudo systemctl restart koperasi-app",
      note: "Ini adalah cara tercepat untuk merefresh aplikasi. Sama dengan melakukan 'stop' lalu 'start' secara instan."
    },
    { 
      id: 5, 
      title: "Nyalakan Otomatis Saat Booting (Enable)", 
      diag: "Server sering mati listrik. Ingin aplikasi otomatis menyala sendiri saat PC Server baru dihidupkan.", 
      cmd: "sudo systemctl enable koperasi-app",
      note: "WAJIB dilakukan untuk aplikasi utama! Tanpa perintah ini, Anda harus datang ke kantor dan mengetik 'start' secara manual setiap kali PC habis direstart."
    },
    { 
      id: 6, 
      title: "Matikan Fitur Auto-Start (Disable)", 
      diag: "Aplikasi sudah tidak dipakai secara rutin dan Anda tidak ingin aplikasi tersebut otomatis menyala dan memakan RAM.", 
      cmd: "sudo systemctl disable koperasi-app",
      note: "Aplikasi tidak dihapus, hanya saja tidak akan ikut menyala secara otomatis saat PC server dihidupkan."
    },
    { 
      id: 7, 
      title: "Refresh Sistem Linux (Daemon Reload)", 
      diag: "Anda baru saja membuat atau mengedit file .service milik sistem Linux, tapi Linux belum membaca perubahannya.", 
      cmd: "sudo systemctl daemon-reload",
      note: "Wajib dieksekusi jika Anda mengutak-atik file yang ada di folder '/etc/systemd/system/'. Jika tidak, Linux akan error saat disuruh start/restart."
    },
    { 
      id: 8, 
      title: "Melihat Semua Aplikasi yang Berjalan", 
      diag: "Lupa nama persis dari aplikasi Anda, atau ingin melihat daftar apa saja yang sedang hidup di server.", 
      cmd: "systemctl list-units --type=service --state=running",
      note: "Perintah ini aman dijalankan tanpa 'sudo'. Gunakan tanda panah atas/bawah untuk menggulir daftar, dan tekan 'q' untuk keluar."
    }
  ];

  const filteredData = dataService.filter(item =>
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
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Diagnosa & Fungsi:</p>
                <p className="text-sm text-slate-600">{item.diag}</p>
              </div>

              {/* CATATAN PENTING */}
              <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <p className="text-[10px] font-bold text-yellow-700 uppercase tracking-wider mb-1">Catatan Penting:</p>
                <p className="text-xs text-yellow-800 leading-relaxed italic">{item.note}</p>
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Terminal Command:</p>
                <div className="bg-slate-900 rounded-lg p-4 flex justify-between items-center">
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
          <p className="text-gray-400 text-sm">Tidak ada masalah service yang cocok dengan pencarian.</p>
        </div>
      )}
    </div>
  );
};

export default MasalahService;
      
