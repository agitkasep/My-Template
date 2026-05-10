TermsAndConditions.jsx              Fasilitas aplikasi ini disediakan untuk mempermudah akses informasi, pengelolaan media, dan transaksi operasional Anda. Pengguna dilarang keras menggunakan sistem ini untuk tindakan penipuan, manipulasi data, atau aktivitas yang melanggar hukum yang berlaku di Indonesia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Perubahan Ketentuan</h2>
            <p>
              Kami berhak sewaktu-waktu mengubah atau memperbarui Syarat dan Ketentuan ini. Perubahan akan diinformasikan melalui halaman ini atau notifikasi pada dashboard pengguna.
            </p>
          </section>

        </div>

        {/* Action Button */}
        <div className="mt-10 pt-6 border-t flex justify-end">
          <Link 
            to="/login" 
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Kembali ke Halaman Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;
              
