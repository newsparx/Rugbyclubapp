import React, { useState } from 'react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Default admin credentials
  const adminCredentials = {
    username: 'admin@admin.com',
    password: 'password123',
  };

  const handleLogin = () => {
  // Logging user inputs and expected credentials for debugging
  console.log("Username entered:", username);
  console.log("Password entered:", password);
  console.log("Expected Username:", adminCredentials.username);
  console.log("Expected Password:", adminCredentials.password);

  // Authentication logic
  if (username.trim() === adminCredentials.username && password === adminCredentials.password) {
    console.log("Login successful");
    setIsLoggedIn(true); // Set the logged-in state to true
  } else {
    console.log("Login failed");
    alert("Invalid credentials"); // Display an error message
  }
};


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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-8">
        {!isLoggedIn ? (
          <div className="bg-gray-800 p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-4 p-2 rounded border border-gray-600"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-2 rounded border border-gray-600"
            />
            <button
              onClick={handleLogin}
              className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <p className="mb-4">Manage the Rugby Club portal below.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Manage Members */}
              <div className="bg-gray-700 p-4 rounded shadow-md">
                <h3 className="text-xl font-bold mb-2">Manage Members</h3>
                <p className="text-sm mb-4">View and edit member details.</p>
                <button className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400">
                  Go to Members
                </button>
              </div>

              {/* Payment Status */}
              <div className="bg-gray-700 p-4 rounded shadow-md">
                <h3 className="text-xl font-bold mb-2">Payment Status</h3>
                <p className="text-sm mb-4">Check payment status for memberships.</p>
                <button className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400">
                  View Payments
                </button>
              </div>

              {/* Membership Types */}
              <div className="bg-gray-700 p-4 rounded shadow-md">
                <h3 className="text-xl font-bold mb-2">Membership Types</h3>
                <p className="text-sm mb-4">Create and manage membership products.</p>
                <button className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400">
                  Manage Memberships
                </button>
              </div>

              {/* Manage Teams */}
              <div className="bg-gray-700 p-4 rounded shadow-md">
                <h3 className="text-xl font-bold mb-2">Manage Teams</h3>
                <p className="text-sm mb-4">Add, edit, and organize teams.</p>
                <button className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400">
                  Manage Teams
                </button>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 mt-6"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black text-gray-400 text-center py-4 mt-8">
        © 2024 Rugby World Cup. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
