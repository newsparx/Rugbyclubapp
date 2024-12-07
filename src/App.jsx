import React, { useState, useEffect } from 'react';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

// Mock user database
const users = {
  'admin@admin.com': { 
    password: 'password123', 
    type: 'admin',
    name: 'Admin User'
  },
  'user@example.com': { 
    password: 'user123', 
    type: 'user',
    name: 'John Smith',
    membershipType: 'Family Gold',
    membershipStatus: 'Active',
    memberSince: '2023-01-15',
    nextPaymentDue: '2024-02-15',
    paymentAmount: 150.00,
    familyMembers: [
      {
        id: 'F1',
        name: 'Sarah Smith',
        relationship: 'Spouse',
        membershipType: 'Family Gold - Secondary',
        status: 'Active'
      },
      {
        id: 'F2',
        name: 'Tommy Smith',
        relationship: 'Child',
        membershipType: 'Junior Member',
        status: 'Active',
        team: 'Under 12s'
      }
    ]
  }
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('userType') || '';
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      localStorage.removeItem('userType');
    }
  }, [isLoggedIn, username, userType]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users[username];
    
    if (user && user.password === password) {
      setIsLoggedIn(true);
      setUserType(user.type);
      console.log('Login successful');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setUserType('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold">Rugby Club</div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-blue-200">Home</a>
            <a href="#" className="hover:text-blue-200">Teams</a>
            <a href="#" className="hover:text-blue-200">Fixtures</a>
            <a href="#" className="hover:text-blue-200">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {!isLoggedIn ? (
          <div className="container mx-auto px-4 py-8">
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