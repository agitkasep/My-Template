import React, { useState } from 'react';

const MasalahKeamanan = ({ search = "" }) => {
  const [openId, setOpenId] = useState(null);

  // DATA KEAMANAN LENGKAP
  const dataKeamanan = [
    { 
      id: 1, 
      title: "Cek Status Satpam (Firewall UFW)", 
      diag: "Ingin melihat apakah firewall sedang aktif dan melihat daftar pintu (port) mana saja yang diizinkan untuk dilewati.", 
      cmd: "sudo ufw status verbose",
      note: "Status 'active' berarti server dilindungi. Anda akan melihat daftar port (misal 22, 80, 443) beserta statusnya (ALLOW/DENY)."
    },
    { 
      id: 2, 
      title: "Membuka Pintu Aplikasi Baru (Allow Port)", 
      diag: "Aplikasi Golang baru saja di-deploy di port 8080, tapi tidak bisa diakses dari luar kantor karena terblokir firewall.", 
      cmd: "sudo ufw allow 8080/tcp",
      note: "Pastikan Anda menambahkan '/tcp' di belakang nomor port jika itu untuk aplikasi web agar aturannya lebih presisi."
    },
    { 
      id: 3, 
      title: "Menutup Pintu yang Tidak Dipakai (Deny Port)", 
      diag: "Aplikasi lama yang menggunakan port 9090 sudah dimatikan, Anda ingin mengunci pintunya agar tidak disusupi hacker.", 
      cmd: "sudo ufw deny 9090/tcp",
      note: "SOP Keamanan: Jangan pernah biarkan sebuah port terbuka jika sudah tidak ada aplikasi yang menggunakannya."
    },
    { 
      id: 4, 
      title: "Menghapus Aturan Firewall", 
      diag: "Anda salah ketik saat membuka port (misal: malah membuka 8081) dan ingin menghapus aturan tersebut dari daftar UFW.", 
      cmd: "sudo ufw delete allow 8081/tcp",
      note: "Menghapus (delete) berbeda dengan menutup (deny). Delete akan menghilangkan catatan tersebut sepenuhnya dari daftar 'ufw status'."
    },
    { 
      id: 5, 
      title: "Mengaktifkan Firewall (SANGAT KRITIS)", 
      diag: "Server baru saja diinstal ulang dan status firewall masih 'inactive'. Anda ingin menyalakannya.", 
      cmd: "sudo ufw allow 22/tcp && sudo ufw enable",
      note: "PERINGATAN KERAS: Selalu izinkan port 22 (SSH) SEBELUM melakukan 'ufw enable'. Jika Anda langsung enable tanpa allow 22, Anda akan terkunci dari luar server!"
    },
    { 
      id: 6, 
      title: "Memblokir IP Address Tertentu", 
      diag: "Melihat ada satu alamat IP (hacker) yang terus-menerus mencoba masuk atau membanjiri server Anda.", 
      cmd: "sudo ufw deny from 192.168.1.100",
      note: "Ganti '192.168.1.100' dengan alamat IP penyerang. IP tersebut tidak akan bisa mengakses apapun di server Anda lagi."
    },
    { 
      id: 7, 
      title: "Cek Daftar Orang yang Gagal Login", 
      diag: "Curiga ada yang mencoba menebak password (Brute Force) untuk masuk ke server melalui jalur SSH.", 
      cmd: "sudo lastb -a | head -n 20",
      note: "Perintah ini menampilkan 20 daftar terakhir percobaan login yang GAGAL beserta alamat IP-nya. Jika panjang, lapor bos untuk pasang 'fail2ban'."
    },
    { 
      id: 8, 
      title: "Membuat Akun User Baru", 
      diag: "Ada anak magang atau tim IT baru yang butuh akses ke server. Jangan pernah berikan akses/password 'root' utama Anda.", 
      cmd: "sudo adduser nama_staf",
      note: "Linux akan memandu Anda untuk memasukkan password baru dan data diri staf tersebut secara interaktif."
    },
    { 
      id: 9, 
      title: "Memberikan Hak Admin (Sudo) ke User", 
      diag: "User yang baru dibuat tidak bisa melakukan restart aplikasi. Anda ingin memberikan dia hak akses 'sudo'.", 
      cmd: "sudo usermod -aG sudo nama_staf",
      note: "Hanya berikan akses 'sudo' kepada rekan kerja yang benar-benar Anda percaya dan memiliki wewenang mengutak-atik server."
    },
    { 
      id: 10, 
      title: "Menghapus Akun Staf (Resign)", 
      diag: "Rekan kerja Anda sudah tidak bekerja di koperasi lagi. Aksesnya harus segera diputus demi keamanan data.", 
      cmd: "sudo deluser --remove-home nama_staf",
      note: "Bendera '--remove-home' memastikan semua folder dan file pribadi miliknya di dalam server ikut terhapus bersih."
    }
  ];

  const filteredData = dataKeamanan.filter(item =>
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
          <p className="text-gray-400 text-sm">Tidak ada masalah keamanan yang cocok dengan pencarian.</p>
        </div>
      )}
    </div>
  );
};

export default MasalahKeamanan;
      
