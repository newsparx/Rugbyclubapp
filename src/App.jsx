import React, { useState, useEffect } from 'react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Debug logging for render state
  useEffect(() => {
    console.log('Current login state:', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt initiated');
    
    const adminCredentials = {
      username: 'admin@admin.com',
      password: 'password123',
    };

    if (username.trim() === adminCredentials.username && password === adminCredentials.password) {
      console.log('Credentials match - setting isLoggedIn to true');
      setIsLoggedIn(true);
      console.log('Login state after update:', isLoggedIn); // Note: This will show the previous state due to closure
    } else {
      console.log('Invalid credentials');
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    console.log('Logout initiated');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  // Debug render output
  console.log('Rendering with isLoggedIn:', isLoggedIn);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold">Rugby Club</div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-blue-200">Home</a>
            <a href="#" className="hover:text-blue-200">Teams</a>
            <a href="#" className="hover:text-blue-200">Fixtures</a>
            <a href="#" className="hover:text-blue-200">Contact</a>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Sign In</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Sign In
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Admin Dashboard</h2>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Manage Members</h3>
                <p className="mb-4">View and edit member details</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View Members
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Payment Status</h3>
                <p className="mb-4">Check payment status for memberships</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View Payments
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Membership Types</h3>
                <p className="mb-4">Manage membership categories</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Manage Types
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Team Management</h3>
                <p className="mb-4">Organize teams and schedules</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Manage Teams
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>© 2024 Rugby Club. All Rights Reserved.</p>
          <p>Follow us on <a href="#" className="text-blue-400 hover:underline">Social Media</a></p>
        </div>
      </footer>
    </div>
  );
};

export default App;
