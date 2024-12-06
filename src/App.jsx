import React, { useState } from 'react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 bg-black text-green-500 flex items-center justify-between px-6 py-4 border-b border-green-500">
        <div className="text-xl font-bold">RUGBY WORLD CUP</div>
        {/* Hamburger Icon for Mobile */}
        <button
          className="text-green-500 lg:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Simple Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Navigation Links */}
        <nav
          className={`lg:flex space-x-6 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}
        >
          <a href="#" className="block mt-2 lg:mt-0 hover:underline">
            Tournaments
          </a>
          <a href="#" className="block mt-2 lg:mt-0 hover:underline">
            Sign Up
          </a>
        </nav>
      </header>

      {/* Privacy Notice */}
      <div className="bg-gray-800 p-4 border border-gray-600 max-w-4xl mx-auto mt-4 rounded">
        <h2 className="text-lg font-semibold">World Rugby: We value your privacy.</h2>
        <p className="text-sm mt-2">
          We and our third parties store, access, and/or process information about your personal data, your devices, and
          your online interactions using cookies, so we can provide, analyse, and improve our services.
        </p>
        <div className="flex justify-end space-x-4 mt-4">
          <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">Cookies Settings</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400">Reject All</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400">Accept All Cookies</button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="mt-8">
        <div className="text-center bg-black py-16 px-8 border-b border-green-500">
          <h1 className="text-3xl font-bold mb-4">RWC Unveil</h1>
          <p className="text-lg mb-6">Watch Now</p>
          <button className="bg-green-500 text-black px-6 py-3 rounded text-lg hover:bg-green-400">Watch Now →</button>
        </div>
      </section>

      {/* Logo Section */}
      <section className="flex justify-center items-center space-x-8 py-16 bg-white text-black">
        <img src="/path-to-logo1.png" alt="Logo 1" className="w-24 h-24" />
        <img src="/path-to-logo2.png" alt="Logo 2" className="w-24 h-24" />
        <img src="/path-to-logo3.png" alt="Logo 3" className="w-24 h-24" />
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 text-center py-4 mt-8">
        © 2024 Rugby World Cup. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
