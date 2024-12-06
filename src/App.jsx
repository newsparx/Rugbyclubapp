import React, { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin@admin.com' && password === 'password123') {
      console.log('Login successful');
      // Add login logic here
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Rugby Club</div>
          <div className="space-x-6">
            <a href="#" className="hover:text-gray-200">Home</a>
            <a href="#" className="hover:text-gray-200">Teams</a>
            <a href="#" className="hover:text-gray-200">Fixtures</a>
            <a href="#" className="hover:text-gray-200">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="bg-gray-300 h-[500px] w-full flex items-center justify-center">
          <div className="text-center text-white z-10">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Rugby Club Portal</h1>
            <p className="mb-6">Stay updated with our teams, fixtures, and more.</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Get Started
            </button>
          </div>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      </div>

      {/* Sign In Form */}
      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                autoComplete="current-password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-center text-gray-600">
            Don't have an account? {' '}
            <a href="#" className="text-blue-600 hover:underline">Register</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>© 2024 Rugby Club. All Rights Reserved.</p>
          <p>Follow us on {' '}
            <a href="#" className="text-blue-400 hover:underline">Social Media</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
