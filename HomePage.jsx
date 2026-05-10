import React from 'react';

const HomePage = ({ onLogout }) => {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <nav className="flex justify-between items-center bg-white p-4 shadow-sm rounded-xl">
        <h1 className="text-xl font-bold text-blue-600">My App</h1>
        <button 
          onClick={onLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Sign Out
        </button>
      </nav>
      
      <main className="mt-10 text-center">
        <h2 className="text-3xl font-semibold">Selamat Datang!</h2>
        <p className="text-gray-600 mt-2">Anda berhasil masuk ke sistem.</p>
      </main>
    </div>
  );
};

export default HomePage;
