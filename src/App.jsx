import React, { useState, useEffect } from 'react';

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
  // Initialize states from localStorage
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Update localStorage when login state changes
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
    console.log('Login attempt:', { username, password });

    const user = users[username];
    if (user && user.password === password) {
      console.log('Login successful');
      setIsLoggedIn(true);
      setUserType(user.type);
    } else {
      console.log('Login failed');
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setUserType('');
  };

  // User Dashboard Component
  const UserDashboard = () => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const user = users[username] || {};
    const familyMembers = user.familyMembers || [];

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with Welcome Message */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Welcome, {user.name || 'User'}</h1>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Membership Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Membership Details</h2>
              <div className="space-y-3">
                <p><span className="font-semibold">Type:</span> {user.membershipType || 'N/A'}</p>
                <p><span className="font-semibold">Status:</span> {user.membershipStatus || 'N/A'}</p>
                <p><span className="font-semibold">Member Since:</span> {user.memberSince || 'N/A'}</p>
                <p><span className="font-semibold">Next Payment:</span> {user.nextPaymentDue || 'N/A'}</p>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Make Payment (£{user.paymentAmount || '0.00'})
                </button>
              </div>
            </div>

            {/* Family Members */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Family Members</h2>
              <div className="space-y-4">
                {familyMembers.length > 0 ? (
                  familyMembers.map(member => (
                    <div key={member.id} className="border-b pb-3 last:border-0">
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.relationship}</p>
                      <p className="text-sm text-gray-600">{member.membershipType}</p>
                      {member.team && (
                        <p className="text-sm text-blue-600">Team: {member.team}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No family members found</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Modal */}
          {showPaymentModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Make Payment</h3>
                <p className="mb-4">Amount due: £{user.paymentAmount || '0.00'}</p>
                <div className="space-y-4">
                  <button 
                    onClick={() => setShowPaymentModal(false)}
                    className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Admin Dashboard Component
  const AdminDashboard = () => (
    <div className="container mx-auto px-4 py-8">
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
    </div>
  );

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
            </div>
          </div>
        ) : (
          // Render different dashboard based on user type
          userType === 'admin' ? <AdminDashboard /> : <UserDashboard />
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
