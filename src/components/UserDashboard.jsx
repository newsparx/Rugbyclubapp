import React, { useState } from 'react';

const UserDashboard = ({ user, onLogout }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const familyMembers = user.familyMembers || [];

  // Sidebar navigation items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'profile', label: 'Update Profile', icon: '👤' },
    { id: 'family', label: 'Family Members', icon: '👨‍👩‍👧‍👦' },
    { id: 'payments', label: 'Payment History', icon: '💳' },
    { id: 'membership', label: 'Membership Details', icon: '🎫' },
    { id: 'teams', label: 'Team Information', icon: '🏉' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'settings', label: 'Account Settings', icon: '⚙️' }
  ];

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
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
        );
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Update Profile</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue={user.phone}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save Changes
              </button>
            </form>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
            <p>Content for {activeSection} section coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user.name || 'User'}</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 ${
                  activeSection === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
          {renderContent()}
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
  );
};

export default UserDashboard;