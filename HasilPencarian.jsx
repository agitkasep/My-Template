import React, { useState } from 'react';

const HasilPencarian = ({ search = "" }) => {
  const [openId, setOpenId] = useState(null);

  // ==========================================
  // MASTER DATA: GABUNGAN SEMUA 58 MASALAH
  // ==========================================
  const allData = [
    // --- NAVIGASI ---
    { cat: "NAVIGASI", title: "Copy File (Salin Satu File)", diag: "Ingin menduplikasi file config atau data untuk cadangan.", cmd: "cp file_asli.json file_backup.json", note: "Gunakan perintah ini setiap kali sebelum mengedit file asli sebagai SOP backup." },
    { cat: "NAVIGASI", title: "Copy Folder (Salin Beserta Isinya)", diag: "Ingin menduplikasi seluruh folder aplikasi atau assets.", cmd: "cp -r folder_asal/ folder_tujuan/", note: "Wajib gunakan bendera -r (Recursive) agar folder dan seluruh file di dalamnya ikut tersalin." },
    { cat: "NAVIGASI", title: "Rename File (Ubah Nama File)", diag: "Ingin mengubah nama file tanpa mengubah isinya.", cmd: "mv nama_lama.txt nama_baru.txt", note: "Di Linux, perintah 'mv' punya fungsi ganda: untuk memindahkan lokasi atau sekadar mengubah nama file." },
    { cat: "NAVIGASI", title: "Rename Folder (Ubah Nama Folder)", diag: "Ingin mengganti nama direktori folder.", cmd: "mv folder_lama/ folder_baru/", note: "Logikanya sama dengan rename file, memindahkan isi folder lama ke nama folder yang baru." },
    { cat: "NAVIGASI", title: "Hapus Satu File", diag: "Membersihkan satu file yang sudah tidak diperlukan.", cmd: "rm nama_file.txt", note: "Hati-hati! File yang dihapus dengan 'rm' tidak masuk tong sampah (Recycle Bin), tapi hilang permanen." },
    { cat: "NAVIGASI", title: "Hapus Banyak File Sekaligus", diag: "Menghapus beberapa file secara bersamaan.", cmd: "rm file1.txt file2.txt file3.txt", note: "Cukup tuliskan nama file satu per satu dipisahkan dengan spasi. Selalu gunakan 'ls -la' dulu untuk memastikan file yang akan dihapus sudah benar." },
    { cat: "NAVIGASI", title: "Hapus Satu Folder", diag: "Menghapus direktori folder yang sudah tidak terpakai.", cmd: "rm -r nama_folder/", note: "Gunakan -r (Recursive) agar Linux menghapus folder beserta seluruh isinya tanpa bertanya satu per satu." },
    { cat: "NAVIGASI", title: "Hapus Banyak Folder Sekaligus", diag: "Membersihkan banyak direktori sekaligus.", cmd: "rm -r folder1/ folder2/", note: "Pisahkan nama folder dengan spasi. Pastikan Anda tidak salah ketik nama folder agar tidak terjadi bencana data." },
    { cat: "NAVIGASI", title: "Cek Lokasi Folder Saat Ini", diag: "Memastikan posisi folder agar tidak salah hapus/edit.", cmd: "pwd", note: "Selalu cek posisi Anda dengan 'pwd' sebelum melakukan perintah hapus (rm) massal." },
    { cat: "NAVIGASI", title: "Lihat Isi Folder", diag: "Mencari file konfigurasi rahasia seperti .env atau .git.", cmd: "ls -la", note: "Bendera -a akan memunculkan file tersembunyi (hidden) yang diawali dengan tanda titik." },

    // --- SERVICE ---
    { cat: "SERVICE", title: "Cek Status Aplikasi", diag: "Ingin memastikan apakah aplikasi Golang sedang berjalan (active) atau mati (failed/error).", cmd: "sudo systemctl status koperasi-app", note: "Perhatikan teks berwarna hijau (active) atau merah (failed). Tekan tombol 'q' untuk keluar dari mode status." },
    { cat: "SERVICE", title: "Menyalakan Aplikasi (Start)", diag: "Aplikasi sedang dalam kondisi mati (dead) dan perlu dihidupkan.", cmd: "sudo systemctl start koperasi-app", note: "Selalu lanjutkan dengan perintah 'status' untuk memastikan aplikasi benar-benar menyala." },
    { cat: "SERVICE", title: "Mematikan Aplikasi Sementara (Stop)", diag: "Ingin menghentikan aplikasi untuk proses perbaikan (maintenance).", cmd: "sudo systemctl stop koperasi-app", note: "Hati-hati, pengguna tidak akan bisa mengakses aplikasi sampai Anda menyalakannya kembali." },
    { cat: "SERVICE", title: "Restart Aplikasi (Mulai Ulang)", diag: "Aplikasi terasa lemot, nge-bug, atau ganti file config.", cmd: "sudo systemctl restart koperasi-app", note: "Sama dengan melakukan 'stop' lalu 'start' secara instan." },
    { cat: "SERVICE", title: "Nyalakan Otomatis Saat Booting (Enable)", diag: "Server mati listrik. Agar aplikasi otomatis nyala sendiri saat PC hidup.", cmd: "sudo systemctl enable koperasi-app", note: "Wajib untuk aplikasi utama agar tidak perlu ngetik manual saat PC habis restart." },
    { cat: "SERVICE", title: "Matikan Fitur Auto-Start (Disable)", diag: "Aplikasi sudah tidak dipakai dan tidak ingin otomatis menyala.", cmd: "sudo systemctl disable koperasi-app", note: "Aplikasi tidak dihapus, hanya saja tidak akan ikut menyala secara otomatis." },
    { cat: "SERVICE", title: "Refresh Sistem Linux (Daemon Reload)", diag: "Baru saja mengedit file .service milik Linux, tapi belum terbaca.", cmd: "sudo systemctl daemon-reload", note: "Wajib dieksekusi jika Anda mengutak-atik file yang ada di folder '/etc/systemd/system/'." },
    { cat: "SERVICE", title: "Melihat Semua Aplikasi yang Berjalan", diag: "Lupa nama persis aplikasi, atau ingin melihat daftar yang sedang hidup.", cmd: "systemctl list-units --type=service --state=running", note: "Gunakan tanda panah atas/bawah untuk menggulir daftar, dan tekan 'q' untuk keluar." },

    // --- LOG ---
    { cat: "LOG", title: "Pantau Log Secara Live (CCTV Mode)", diag: "Ingin melihat aktivitas aplikasi yang sedang terjadi detik ini juga.", cmd: "sudo journalctl -u koperasi-app -f", note: "Perintah ini tidak akan berhenti. Tekan tombol 'Ctrl + C' untuk keluar." },
    { cat: "LOG", title: "Cek Error Paling Baru", diag: "Aplikasi mati/blank, butuh melihat pesan error terakhir.", cmd: "sudo journalctl -u koperasi-app -e", note: "Langsung melempar Anda ke halaman paling ujung (terbaru) dari log. Tekan 'q' untuk keluar." },
    { cat: "LOG", title: "Filter Khusus Pesan Error", diag: "Log sangat panjang. Hanya ingin melihat baris peringatan yang kritis saja.", cmd: "sudo journalctl -u koperasi-app -p err", note: "Mengabaikan pesan 'Info' biasa dan langsung fokus pada masalah utama." },
    { cat: "LOG", title: "Cek Log Khusus Hari Ini", diag: "Nasabah lapor ada kendala pagi ini, tidak butuh data kemarin.", cmd: "sudo journalctl -u koperasi-app --since today", note: "Memotong data log dan hanya menampilkan kejadian dari jam 00:00 hari ini." },
    { cat: "LOG", title: "Cek Log di Jam Spesifik", diag: "Investigasi kendala di aplikasi antara jam 2 siang sampai jam 3.", cmd: "sudo journalctl -u koperasi-app --since \"14:00\" --until \"15:00\"", note: "Format waktunya adalah 'HH:MM'." },
    { cat: "LOG", title: "Cari Kata Kunci (Grep)", diag: "Mencari transaksi tertentu atau error database (misal kata panic/timeout).", cmd: "sudo journalctl -u koperasi-app | grep -i \"kata_kunci\"", note: "Bendera '-i' mengabaikan huruf besar/kecil. Ganti 'kata_kunci' dengan teks pencarian." },
    { cat: "LOG", title: "Cek Ukuran File Log", diag: "Hardisk penuh, curiga file log bengkak.", cmd: "journalctl --disk-usage", note: "Hanya mengecek ukuran. Jika bergiga-giga, segera lakukan Vacuum." },
    { cat: "LOG", title: "Bersihkan Log Lama (Vacuum)", diag: "Hardisk penuh. Buang log lama dan sisakan 7 hari terakhir.", cmd: "sudo journalctl --vacuum-time=7d", note: "Bisa diubah, misal '3d' untuk 3 hari, atau '1G' untuk batas 1 GB." },
    { cat: "LOG", title: "Cek Log Inti Sistem (Hardware)", diag: "PC Server tiba-tiba restart sendiri atau Flashdisk tidak terbaca.", cmd: "sudo dmesg -T", note: "Menampilkan log langsung dari inti Linux." },
    { cat: "LOG", title: "Cek Log Keamanan (Hacker)", diag: "Curiga ada yang coba menebak password server.", cmd: "sudo tail -n 50 /var/log/auth.log", note: "Menampilkan 50 baris terakhir dari log keamanan. Waspadai pesan 'Failed password'." },

    // --- HARDWARE ---
    { cat: "HARDWARE", title: "Cek Sisa Hardisk (Penyimpanan)", diag: "Aplikasi gagal nyimpan data, kapasitas Hardisk penuh.", cmd: "df -h", note: "Perhatikan kolom 'Use%'. Jika mencapai 100%, segera lakukan pembersihan log." },
    { cat: "HARDWARE", title: "Mencari Folder Terbesar", diag: "Hardisk penuh tapi bingung folder mana yang bengkak.", cmd: "du -sh * | sort -rh | head -10", note: "Menampilkan 10 daftar file/folder terbesar di lokasi Anda saat ini." },
    { cat: "HARDWARE", title: "Pantau CPU dan RAM (Visual)", diag: "Server lemot parah. Lihat grafik performa PC.", cmd: "htop", note: "Lihat barisan 'Mem' (RAM). Jika penuh merah, server bekerja terlalu keras. Tekan 'q' keluar." },
    { cat: "HARDWARE", title: "Cek Sisa RAM Cepat", diag: "Melihat angka sisa kapasitas RAM tanpa mode visual.", cmd: "free -m", note: "Fokus pada kolom 'available'. Angkanya dalam satuan Megabytes (MB)." },
    { cat: "HARDWARE", title: "Pantau RAM Penuh Secara Live", diag: "Curiga memori leak, RAM kesedot habis pelan-pelan.", cmd: "watch -n 2 free -m", note: "Refresh setiap 2 detik. Tekan 'Ctrl + C' untuk stop." },
    { cat: "HARDWARE", title: "Force Kill Aplikasi Nyangkut", diag: "Aplikasi macet, CPU 100%, tidak bisa di-stop biasa.", cmd: "sudo kill -9 [PID]", note: "Buka 'htop' cari nomor PID. Ganti [PID] dengan angka tersebut." },
    { cat: "HARDWARE", title: "Cek Uptime Server", diag: "PC Server mati lampu, cek sudah berapa lama server hidup.", cmd: "uptime", note: "Menampilkan jam, durasi nyala, dan beban kerja rata-rata." },
    { cat: "HARDWARE", title: "Cek Spesifikasi CPU", diag: "Memastikan spesifikasi fisik prosesor server.", cmd: "lscpu", note: "Melihat jumlah core dan kecepatan tanpa bongkar PC." },
    { cat: "HARDWARE", title: "Cek Daftar Hardisk/SSD", diag: "Mengecek apakah SSD/Flashdisk baru sudah terbaca.", cmd: "lsblk", note: "Memunculkan skema pohon penyimpanan." },
    { cat: "HARDWARE", title: "Cek Kerusakan Hardware", diag: "Sistem overheat atau RAM error secara fisik.", cmd: "sudo dmesg -T | grep -i -E 'hardware|error|warn|fail'", note: "Menyaring catatan kernel terkait kegagalan komponen." },

    // --- DATABASE ---
    { cat: "DATABASE", title: "Web Error: Connection Refused", diag: "Koneksi terputus. Port mati. Database PostgreSQL perlu di-restart.", cmd: "sudo systemctl restart postgresql", note: "Pertolongan pertama jika web blank karena gagal muat data." },
    { cat: "DATABASE", title: "Backup Database Rutin", diag: "Mengamankan data koperasi sebelum update.", cmd: "sudo -u postgres pg_dump koperasi_db > backup_koperasi.sql", note: "Wajib! Download file .sql hasilnya ke Windows Anda." },
    { cat: "DATABASE", title: "Restore (Kembalikan) Database", diag: "Data rusak, mengembalikan database dari backup.", cmd: "sudo -u postgres psql koperasi_db < backup_koperasi.sql", note: "Perhatikan tanda panah ke kiri (<) untuk memasukkan data." },
    { cat: "DATABASE", title: "Terminal Psql (Brankas)", diag: "Ingin mengecek tabel atau lihat data manual.", cmd: "sudo -u postgres psql", note: "Ketik '\\q' untuk keluar dari PostgreSQL." },
    { cat: "DATABASE", title: "Melihat Daftar Semua Database", diag: "Lupa nama pasti database.", cmd: "sudo -u postgres psql -c \"\\l\"", note: "Akan muncul tabel daftar nama database di terminal." },
    { cat: "DATABASE", title: "Cek Pintu Database (Port 5432)", diag: "Memastikan port 5432 terbuka untuk database.", cmd: "sudo ss -tulpn | grep 5432", note: "Jika tulisan LISTEN ada, berarti aman." },
    { cat: "DATABASE", title: "Ganti Password Database", diag: "Kata sandi bocor, ganti password user postgres.", cmd: "sudo -u postgres psql -c \"ALTER USER postgres PASSWORD 'PassBaru';\"", note: "Jangan lupa ubah di aplikasi Golang juga jika password diganti!" },
    { cat: "DATABASE", title: "Bersihkan Database (Vacuum)", diag: "Pencarian data lambat karena sampah tumpukan update.", cmd: "sudo -u postgres vacuumdb --all", note: "Lakukan sebulan sekali saat malam hari." },
    { cat: "DATABASE", title: "Cek Koneksi Aktif", diag: "Siapa yang sedang konek ke database?", cmd: "sudo -u postgres psql -c \"SELECT pid, usename, client_addr FROM pg_stat_activity;\"", note: "Daftar IP dan aplikasi yang menyedot data." },
    { cat: "DATABASE", title: "Cek Log Error Database", diag: "Database mati tanpa alasan yang jelas.", cmd: "sudo journalctl -u postgresql -e", note: "Mencari tulisan FATAL di log PostgreSQL." },

    // --- KEAMANAN ---
    { cat: "KEAMANAN", title: "Cek Status Firewall UFW", diag: "Melihat status keamanan dan port yang diizinkan.", cmd: "sudo ufw status verbose", note: "Status 'active' berarti dilindungi." },
    { cat: "KEAMANAN", title: "Membuka Port Baru (Allow)", diag: "Aplikasi web port 8080 terblokir dari luar.", cmd: "sudo ufw allow 8080/tcp", note: "Buka jalan agar web bisa diakses." },
    { cat: "KEAMANAN", title: "Menutup Port Lama (Deny)", diag: "Aplikasi sudah tidak dipakai, kunci pintunya.", cmd: "sudo ufw deny 9090/tcp", note: "Jangan biarkan port menganga tak terpakai." },
    { cat: "KEAMANAN", title: "Menghapus Aturan Firewall", diag: "Salah buka port dan ingin dihapus.", cmd: "sudo ufw delete allow 8081/tcp", note: "Menghilangkan aturan dari daftar sepenuhnya." },
    { cat: "KEAMANAN", title: "Mengaktifkan Firewall (SANGAT KRITIS)", diag: "Menyalakan keamanan UFW di server.", cmd: "sudo ufw allow 22/tcp && sudo ufw enable", note: "PERINGATAN: Selalu allow port 22 dulu agar tidak terkunci dari SSH!" },
    { cat: "KEAMANAN", title: "Memblokir IP Address Tertentu", diag: "Hacker membanjiri server, blokir IP-nya.", cmd: "sudo ufw deny from 192.168.1.100", note: "Ganti angka dengan IP penyerang." },
    { cat: "KEAMANAN", title: "Cek Gagal Login (Brute Force)", diag: "Melihat siapa yang coba tebak password SSH.", cmd: "sudo lastb -a | head -n 20", note: "Menampilkan 20 daftar IP hacker yang gagal masuk." },
    { cat: "KEAMANAN", title: "Membuat Akun User Baru", diag: "Tim IT baru butuh akses server tanpa root.", cmd: "sudo adduser nama_staf", note: "Sistem akan minta Anda membuat password untuk staf tersebut." },
    { cat: "KEAMANAN", title: "Memberi Hak Admin (Sudo)", diag: "Staf tersebut butuh izin restart server.", cmd: "sudo usermod -aG sudo nama_staf", note: "Hanya berikan akses ini pada orang yang dipercaya." },
    { cat: "KEAMANAN", title: "Menghapus Akun Staf (Resign)", diag: "Akses harus diputus karena staf keluar.", cmd: "sudo deluser --remove-home nama_staf", note: "Menghapus user dan folder pribadinya." }
  ];

  // ==========================================
  // LOGIKA PENCARIAN SUPER SMART (MULTI-WORD)
  // ==========================================
  // Jika user mengetik "port eror", sistem akan memecahnya jadi kata "port" dan "eror"
  // Sistem akan menampilkan masalah jika KEDUA kata tersebut ada di dalam teks
  
  const searchWords = search.toLowerCase().split(' ').filter(word => word.trim() !== "");
  
  const filteredData = allData.filter(item => {
    // Gabungkan semua teks ke dalam satu wadah raksasa agar pencarian luas
    const content = `${item.title} ${item.diag} ${item.note} ${item.cat}`.toLowerCase();
    
    // Syarat: SEMUA kata yang diketik harus ada di dalam content
    // Jika ada kata "eror", kita anggap sama dengan "error"
    return searchWords.every(word => {
      if (word === 'eror') {
        return content.includes('eror') || content.includes('error');
      }
      return content.includes(word);
    });
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Perintah disalin!");
  };

  return (
    <div className="space-y-4">
      {/* Header Info Pencarian */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between shadow-sm">
        <p className="text-blue-800 text-sm font-medium">
          🔎 Hasil pencarian: <span className="font-bold">"{search}"</span>
        </p>
        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {filteredData.length} Kasus
        </span>
      </div>

      {/* Daftar Hasil Pencarian */}
      {filteredData.length > 0 ? filteredData.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
          
          <div 
            className="p-5 cursor-pointer flex justify-between items-start md:items-center hover:bg-slate-50"
            onClick={() => setOpenId(openId === index ? null : index)}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full pr-4">
              {/* Badge Kategori Asal */}
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider w-fit
                ${item.cat === 'NAVIGASI' ? 'bg-indigo-100 text-indigo-700' : ''}
                ${item.cat === 'SERVICE' ? 'bg-cyan-100 text-cyan-700' : ''}
                ${item.cat === 'LOG' ? 'bg-teal-100 text-teal-700' : ''}
                ${item.cat === 'HARDWARE' ? 'bg-amber-100 text-amber-700' : ''}
                ${item.cat === 'DATABASE' ? 'bg-rose-100 text-rose-700' : ''}
                ${item.cat === 'KEAMANAN' ? 'bg-purple-100 text-purple-700' : ''}
              `}>
                {item.cat}
              </span>
              <span className="font-bold text-slate-800 text-sm md:text-base">{item.title}</span>
            </div>
            <span className="text-slate-400 text-lg mt-1 md:mt-0">{openId === index ? '▲' : '▼'}</span>
          </div>

          {openId === index && (
            <div className="px-5 pb-5 pt-2 bg-slate-50 border-t border-gray-100">
              <div className="mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Diagnosa / Skenario:</p>
                <p className="text-sm text-slate-600">{item.diag}</p>
              </div>

              <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <p className="text-[10px] font-bold text-yellow-700 uppercase tracking-wider mb-1">Catatan Penting:</p>
                <p className="text-xs text-yellow-800 leading-relaxed italic">{item.note}</p>
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Terminal Command:</p>
                <div className="bg-slate-900 rounded-lg p-4 flex justify-between items-center group relative overflow-hidden">
                  <code className="text-blue-300 text-sm font-mono break-all pr-12">{item.cmd}</code>
                  <button 
                    onClick={() => handleCopy(item.cmd)}
                    className="absolute right-2 bg-slate-700 hover:bg-blue-600 text-white text-[10px] font-bold px-3 py-2 rounded-md transition-colors"
                  >
                    COPY
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )) : (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-4xl mb-3">🕵️‍♂️</p>
          <p className="text-slate-500 font-medium">Aduh, solusinya tidak ditemukan.</p>
          <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci lain, seperti "hardisk", "mati", atau "password".</p>
        </div>
      )}
    </div>
  );
};

export default HasilPencarian;
     
