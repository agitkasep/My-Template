import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); // Mengubah status menjadi login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-sm border border-gray-200">
        <div className="text-center mb-8">
          <span className="text-5xl">🚀</span>
          <h2 className="text-2xl font-bold mt-4 text-gray-800">Agit Studio</h2>
          <p className="text-gray-500 text-sm mt-1">Silakan masuk ke akun Anda</p>
        </div>

        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Alamat Email" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
          <input 
            type="password" 
            placeholder="Kata Sandi" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>

        <button type="submit" className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors shadow-md">
          Sign In
        </button>

        {/* Ini yang menghubungkan Login dengan Halaman Syarat Ketentuan */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Dengan masuk, Anda menyetujui <br />
          <Link to="/terms" className="text-blue-600 hover:underline font-medium">
            Syarat & Ketentuan
          </Link> kami.
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
