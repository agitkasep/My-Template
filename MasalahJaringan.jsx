import React, { useState } from 'react';

const MasalahJaringan = () => {
  const [openId, setOpenId] = useState(null);

  const dataJaringan = [
    // --- GRUP 1: DIAGNOSA DASAR & IP ---
    { title: "Cek Alamat IP Sendiri", diag: "Ingin tahu nomor IP yang sedang dipakai PC saat ini.", cmd: "ip a", note: "Cari bagian 'inet'. Jika ada banyak, fokus pada yang namanya 'enp' (kabel) atau 'wlan' (wifi)." },
    { title: "Cek IP Singkat", diag: "Hanya ingin memunculkan angka IP tanpa info tambahan yang ribet.", cmd: "hostname -I", note: "Sangat berguna untuk melihat IP dengan cepat sebelum mencatatnya ke buku laporan." },
    { title: "Cek Nama Interface LAN", diag: "Lupa nama colokan LAN di Linux (apakah eth0, enp3s0, dll).", cmd: "ls /sys/class/net", note: "Nama ini wajib diketahui sebelum mengedit file Netplan." },
    { title: "Cek Status Kabel Tercolok", diag: "Memastikan kabel LAN sudah terdeteksi secara hardware atau belum.", cmd: "sudo ethtool enp3s0", note: "Cari baris 'Link detected'. Jika 'no', berarti kabel putus atau colokan longgar." },
    { title: "Scan IP di Seluruh Kantor", diag: "Melihat perangkat apa saja yang sedang aktif di jaringan kantor.", cmd: "sudo nmap -sn 192.168.1.0/24", note: "Gunakan untuk melacak jika ada orang asing yang ikut nyambung ke Wi-Fi kantor." },

    // --- GRUP 2: NETPLAN & IP STATIC ---
    { title: "Cari File Konfigurasi Netplan", diag: "Mencari lokasi file untuk mengatur IP permanen.", cmd: "ls /etc/netplan/", note: "Biasanya nama filenya berakhiran .yaml (contoh: 01-netcfg.yaml)." },
    { title: "Edit IP Permanen (Static)", diag: "Ingin mengubah IP server agar tidak berubah-ubah lagi.", cmd: "sudo nano /etc/netplan/*.yaml", note: "Ingat: Pakai SPASI, jangan pakai TAB saat mengedit di dalam sini." },
    { title: "Uji Coba Settingan Netplan", diag: "Mencegah server terkunci (lockout) jika salah ketik settingan IP.", cmd: "sudo netplan try", note: "Jurus paling aman! Jika dalam 2 menit tidak dikonfirmasi, settingan kembali ke awal." },
    { title: "Terapkan Settingan Netplan", diag: "Yakin settingan sudah benar dan ingin langsung diaktifkan.", cmd: "sudo netplan apply", note: "Gunakan ini jika Anda sedang berada di depan monitor server langsung." },
    { title: "Restart Jaringan Total", diag: "Internet macet total setelah ganti kabel, ingin refresh sistem.", cmd: "sudo systemctl restart systemd-networkd", note: "Lakukan ini jika Netplan Apply terasa lambat atau nyangkut." },

    // --- GRUP 3: KONEKTIVITAS & PING ---
    { title: "Tes Koneksi ke Google (Internet)", diag: "Memastikan server sudah bisa internetan atau belum.", cmd: "ping -c 4 8.8.8.8", note: "Jika muncul '0% packet loss', berarti internet lancar jaya." },
    { title: "Tes Nama Domain (DNS)", diag: "Bisa ping angka tapi tidak bisa buka website google.com.", cmd: "ping -c 4 google.com", note: "Jika gagal, berarti settingan DNS di Netplan Anda masih salah." },
    { title: "Cek Jalur Paket (Traceroute)", diag: "Internet lemot, ingin tahu di titik mana koneksi terhambat.", cmd: "traceroute google.com", note: "Melihat lompatan (hop) dari router kantor hingga sampai ke server tujuan." },
    { title: "Cek Pintu Aplikasi (Port Scan)", diag: "Memastikan port aplikasi 8080 sudah terbuka dan bisa diakses.", cmd: "telnet 192.168.1.100 8080", note: "Jika layar jadi hitam/blank, berarti pintu terbuka. Jika 'Connection Refused', pintu tertutup." },
    { title: "Cek Port Lokal yang Aktif", diag: "Melihat aplikasi apa saja yang sedang 'buka warung' di server.", cmd: "sudo ss -tulpn", note: "Sangat berguna untuk cek apakah PostgreSQL (5432) atau Golang (8080) sudah nyala." },

    // --- GRUP 4: MASALAH ROUTER & GATEWAY ---
    { title: "Cek Alamat IP Router (Gateway)", diag: "Lupa alamat IP Router/Modem kantor untuk setting Netplan.", cmd: "ip route | grep default", note: "Angka setelah kata 'via' adalah alamat Router Anda (Gateway)." },
    { title: "Cek DNS yang Sedang Dipakai", diag: "Memastikan server pakai DNS siapa (Google, Cloudflare, atau ISP).", cmd: "resolvectl status", note: "Cari bagian 'DNS Servers'. Pastikan muncul angka 8.8.8.8 atau sesuai keinginan." },
    { title: "Scan IP Bentrok (Duplicate)", diag: "Curiga ada dua perangkat pakai IP yang sama sehingga koneksi putus-nyambung.", cmd: "sudo arping -D -I enp3s0 192.168.1.100", note: "Jika muncul balasan, berarti ada perangkat lain yang 'mencuri' IP tersebut." },
    { title: "Hapus Cache ARP (Jaringan Lemot)", diag: "Tabel alamat jaringan penuh atau kacau setelah ganti router baru.", cmd: "sudo ip neigh flush all", note: "Membersihkan memori jaringan sementara agar server mencari ulang alamat perangkat sekitar." },
    { title: "Cek Speedtest via Terminal", diag: "Bos tanya berapa kecepatan internet kantor saat ini.", cmd: "curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python3 -", note: "Mengetahui kecepatan Download/Upload langsung dari layar hitam Linux." },

    // --- GRUP 5: FIREWALL & SECURITY ---
    { title: "Cek Aturan Firewall", diag: "Memastikan tidak ada port yang terblokir secara tidak sengaja.", cmd: "sudo ufw status numbered", note: "Gunakan nomor urut untuk memudahkan saat ingin menghapus aturan nanti." },
    { title: "Izinkan Akses dari IP Tertentu", diag: "Hanya memperbolehkan laptop Bos yang bisa akses server.", cmd: "sudo ufw allow from 192.168.1.50", note: "Ini meningkatkan keamanan agar tidak sembarang orang bisa masuk." },
    { title: "Blokir Total Satu Perangkat", diag: "Melihat ada aktivitas mencurigakan dari satu IP, ingin diputus.", cmd: "sudo ufw deny from 192.168.1.77", note: "IP tersebut tidak akan bisa ping atau akses apa pun ke server." },
    { title: "Monitor Koneksi Masuk Live", diag: "Melihat siapa saja yang sedang terkoneksi ke server detik ini.", cmd: "netstat -ant", note: "Cari status 'ESTABLISHED'. Itu adalah koneksi yang sedang aktif." },

    // --- GRUP 6: LOG & TROUBLESHOOTING ---
    { title: "Cek Log Jaringan", diag: "Mencari pesan error sistem jaringan yang tidak terlihat di layar.", cmd: "journalctl -u systemd-networkd", note: "Membantu mencari tahu kenapa IP Static gagal diterapkan." },
    { title: "Cek Gangguan Wi-Fi Sekitar", diag: "Sinyal Wi-Fi sering drop, curiga banyak gangguan frekuensi.", cmd: "nmcli dev wifi list", note: "Melihat daftar Wi-Fi sekitar beserta kekuatan sinyal dan channel-nya." },
    { title: "Cek Nama Host Server", diag: "Memastikan nama server sudah sesuai agar tidak tertukar saat remote.", cmd: "hostnamectl", note: "Bisa melihat nama PC, OS yang dipakai, hingga tipe kernel Linux." },
    { title: "Ganti Nama Host (PC)", diag: "Ingin mengubah nama 'ubuntu-server' jadi 'server-koperasi'.", cmd: "sudo hostnamectl set-hostname server-koperasi", note: "Setelah ganti, sebaiknya restart server agar nama baru muncul di jaringan." },
    { title: "Cek Bandwidth Real-Time", diag: "Melihat aplikasi mana yang sedang menyedot kuota internet paling banyak.", cmd: "sudo nload", note: "Menampilkan grafik naik turunnya data masuk dan keluar." },
    { title: "Reset Seluruh Aturan Firewall", diag: "Salah setting firewall dan bingung cara balikinnya.", cmd: "sudo ufw reset", note: "Hati-hati! Semua pintu akan tertutup kecuali yang default. Pastikan Anda punya akses fisik ke PC." }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Perintah disalin!");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto pb-20">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">🌐 Network Troubleshooting</h1>
      <p className="text-sm text-slate-500 mb-6">Panduan 30 masalah jaringan lapangan untuk IT Support.</p>

      <div className="grid gap-3">
        {dataJaringan.map((item, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div 
              className="p-4 cursor-pointer flex justify-between items-center hover:bg-blue-50 transition-colors"
              onClick={() => setOpenId(openId === index ? null : index)}
            >
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full">
                  {index + 1}
                </span>
                <h3 className="font-semibold text-slate-700 text-sm md:text-base">{item.title}</h3>
              </div>
              <span className="text-slate-400">{openId === index ? '▲' : '▼'}</span>
            </div>

            {openId === index && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 animate-in fade-in slide-in-from-top-1">
                <div className="mb-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Kapan digunakan:</p>
                  <p className="text-sm text-slate-600 italic">"{item.diag}"</p>
                </div>
                
                <div className="mb-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Terminal Command:</p>
                  <div className="bg-slate-900 p-3 rounded-lg flex justify-between items-center group">
                    <code className="text-emerald-400 text-xs font-mono break-all">{item.cmd}</code>
                    <button 
                      onClick={() => handleCopy(item.cmd)}
                      className="ml-2 bg-slate-700 text-[10px] text-white px-2 py-1 rounded hover:bg-blue-500"
                    >
                      COPY
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                  <p className="text-[10px] font-bold text-blue-500 uppercase mb-1">💡 Tips & Note:</p>
                  <p className="text-xs text-slate-700 leading-relaxed">{item.note}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasalahJaringan;
    
