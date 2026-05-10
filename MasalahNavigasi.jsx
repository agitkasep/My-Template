import React, { useState } from 'react';

const MasalahNavigasi = ({ search = "" }) => {
  const [openId, setOpenId] = useState(null);

  const dataNavigasi = [
    { 
      id: 1, 
      title: "Copy File (Salin Satu File)", 
      diag: "Ingin menduplikasi file config atau data untuk cadangan.", 
      cmd: "cp file_asli.json file_backup.json",
      note: "Gunakan perintah ini setiap kali sebelum mengedit file asli sebagai SOP backup."
    },
    { 
      id: 2, 
      title: "Copy Folder (Salin Beserta Isinya)", 
      diag: "Ingin menduplikasi seluruh folder aplikasi atau assets.", 
      cmd: "cp -r folder_asal/ folder_tujuan/",
      note: "Wajib gunakan bendera -r (Recursive) agar folder dan seluruh file di dalamnya ikut tersalin."
    },
    { 
      id: 3, 
      title: "Rename File (Ubah Nama File)", 
      diag: "Ingin mengubah nama file tanpa mengubah isinya.", 
      cmd: "mv nama_lama.txt nama_baru.txt",
      note: "Di Linux, perintah 'mv' punya fungsi ganda: untuk memindahkan lokasi atau sekadar mengubah nama file."
    },
    { 
      id: 4, 
      title: "Rename Folder (Ubah Nama Folder)", 
      diag: "Ingin mengganti nama direktori folder.", 
      cmd: "mv folder_lama/ folder_baru/",
      note: "Logikanya sama dengan rename file, memindahkan isi folder lama ke nama folder yang baru."
    },
    { 
      id: 5, 
      title: "Hapus Satu File", 
      diag: "Membersihkan satu file yang sudah tidak diperlukan.", 
      cmd: "rm nama_file.txt",
      note: "Hati-hati! File yang dihapus dengan 'rm' tidak masuk tong sampah (Recycle Bin), tapi hilang permanen."
    },
    { 
      id: 6, 
      title: "Hapus Banyak File Sekaligus", 
      diag: "Menghapus beberapa file secara bersamaan.", 
      cmd: "rm file1.txt file2.txt file3.txt",
      note: "Cukup tuliskan nama file satu per satu dipisahkan dengan spasi. Selalu gunakan 'ls -la' dulu untuk memastikan file yang akan dihapus sudah benar."
    },
    { 
      id: 7, 
      title: "Hapus Satu Folder", 
      diag: "Menghapus direktori folder yang sudah tidak terpakai.", 
      cmd: "rm -r nama_folder/",
      note: "Gunakan -r (Recursive) agar Linux menghapus folder beserta seluruh isinya tanpa bertanya satu per satu."
    },
    { 
      id: 8, 
      title: "Hapus Banyak Folder Sekaligus", 
      diag: "Membersihkan banyak direktori sekaligus.", 
      cmd: "rm -r folder1/ folder2/",
      note: "Pisahkan nama folder dengan spasi. Pastikan Anda tidak salah ketik nama folder agar tidak terjadi bencana data."
    },
    { 
      id: 9, 
      title: "Cek Lokasi Folder Saat Ini", 
      diag: "Memastikan posisi folder agar tidak salah hapus/edit.", 
      cmd: "pwd",
      note: "Selalu cek posisi Anda dengan 'pwd' sebelum melakukan perintah hapus (rm) massal."
    },
    { 
      id: 10, 
      title: "Lihat Isi Folder", 
      diag: "Mencari file konfigurasi rahasia seperti .env atau .git.", 
      cmd: "ls -la",
      note: "Bendera -a akan memunculkan file tersembunyi (hidden) yang diawali dengan tanda titik."
    }
  ];

  const filteredData = dataNavigasi.filter(item =>
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
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Diagnosa:</p>
                <p className="text-sm text-slate-600">{item.diag}</p>
              </div>

              {/* BAGIAN NOTES BARU */}
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
          <p className="text-gray-400 text-sm">Tidak ada masalah navigasi yang cocok.</p>
        </div>
      )}
    </div>
  );
};

export default MasalahNavigasi;
      
