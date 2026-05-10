import React, { useState } from 'react';

const MasalahHardware = ({ search = "" }) => {
  const [openId, setOpenId] = useState(null);

  // DATA HARDWARE LENGKAP
  const dataHardware = [
    { 
      id: 1, 
      title: "Cek Sisa Hardisk (Penyimpanan)", 
      diag: "Aplikasi gagal menyimpan data, curiga karena kapasitas Hardisk/SSD server sudah penuh.", 
      cmd: "df -h",
      note: "Perhatikan kolom 'Use%'. Jika ada yang mencapai 90% atau 100%, segera lakukan pembersihan log atau hapus file yang tidak terpakai."
    },
    { 
      id: 2, 
      title: "Mencari 'Pencuri' Hardisk (Folder Terbesar)", 
      diag: "Hardisk penuh tapi Anda bingung folder mana yang ukurannya paling bengkak.", 
      cmd: "du -sh * | sort -rh | head -10",
      note: "Perintah ini akan menampilkan 10 daftar file/folder dengan ukuran paling raksasa di lokasi Anda berada saat ini. Sangat berguna untuk operasi pembersihan."
    },
    { 
      id: 3, 
      title: "Pantau CPU dan RAM (Visual/Dashboard)", 
      diag: "Server terasa sangat lambat (lemot). Anda ingin melihat grafik performa PC Core i3 Anda secara langsung.", 
      cmd: "htop",
      note: "Lihat barisan 'Mem' (RAM) dan barisan angka 1, 2, 3, 4 (Core CPU). Jika bar penuh berwarna merah, berarti server bekerja terlalu keras. Tekan 'q' untuk keluar."
    },
    { 
      id: 4, 
      title: "Cek Sisa RAM Secara Cepat", 
      diag: "Hanya ingin melihat angka sisa kapasitas RAM tanpa perlu masuk ke mode dashboard visual.", 
      cmd: "free -m",
      note: "Fokus pada kolom 'available' (Tersedia). Jangan panik jika kolom 'free' kecil, karena Linux memang sering memakai RAM untuk cache. Angkanya dalam satuan Megabytes (MB)."
    },
    { 
      id: 5, 
      title: "Pantau Kebocoran RAM Secara Live", 
      diag: "Curiga ada aplikasi yang pelan-pelan menyedot RAM sampai habis (Memory Leak). Ingin memantaunya secara real-time.", 
      cmd: "watch -n 2 free -m",
      note: "Layar akan me-refresh jumlah sisa RAM setiap 2 detik. Jika angkanya terus turun drastis, berarti ada aplikasi yang tidak sehat. Tekan 'Ctrl + C' untuk stop."
    },
    { 
      id: 6, 
      title: "Membunuh Aplikasi yang 'Mabuk' (Force Kill)", 
      diag: "Ada aplikasi yang 'nyangkut' / error, memakan CPU 100%, dan tidak bisa di-stop menggunakan systemctl biasa.", 
      cmd: "sudo kill -9 [PID]",
      note: "Buka 'htop' dulu untuk mencari nomor identitas aplikasi (kolom PID). Ganti [PID] dengan angka tersebut (misal: sudo kill -9 1234). Ini ibarat mencabut paksa kabel dari colokan."
    },
    { 
      id: 7, 
      title: "Cek Uptime (Lama PC Menyala)", 
      diag: "Curiga PC Server mati lampu dan baru saja restart sendiri, Anda ingin mengecek sudah berapa lama server hidup.", 
      cmd: "uptime",
      note: "Menampilkan jam saat ini, durasi PC menyala (up X days/hours), dan rata-rata beban kerja (load average)."
    },
    { 
      id: 8, 
      title: "Cek Spesifikasi CPU (Prosesor)", 
      diag: "Ingin memastikan spesifikasi teknis prosesor server, berapa core yang aktif, dan kecepatannya.", 
      cmd: "lscpu",
      note: "Sangat berguna jika Anda ingin mengetahui spesifikasi fisik hardware tanpa perlu membongkar casing PC."
    },
    { 
      id: 9, 
      title: "Cek Daftar Hardisk / SSD yang Terpasang", 
      diag: "Bos bilang baru saja menambah SSD baru ke server, dan Anda ingin mengecek apakah SSD tersebut sudah terbaca oleh Linux.", 
      cmd: "lsblk",
      note: "Akan memunculkan skema pohon / cabang dari semua media penyimpanan (hardisk, SSD, atau Flashdisk) yang dicolok ke server."
    },
    { 
      id: 10, 
      title: "Cek Kerusakan Fisik Hardware", 
      diag: "Sistem sering restart mendadak. Ingin mencari tahu apakah ada kerusakan fisik pada RAM, Hardisk, atau suhu yang terlalu panas (Overheat).", 
      cmd: "sudo dmesg -T | grep -i -E 'hardware|error|warn|fail'",
      note: "Menyaring catatan inti mesin (kernel) dan hanya menampilkan pesan darurat terkait kegagalan komponen fisik."
    }
  ];

  const filteredData = dataHardware.filter(item =>
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
          <p className="text-gray-400 text-sm">Tidak ada masalah hardware yang cocok dengan pencarian.</p>
        </div>
      )}
    </div>
  );
};

export default MasalahHardware;
    
