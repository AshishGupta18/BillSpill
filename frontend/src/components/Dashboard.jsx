import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const [groups, setGroups] = useState([]);
  const [balances, setBalances] = useState({});
  
  const user = useSelector((state) => state.auth.user); // Assuming you have auth slice in Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's groups and balances from the backend
    fetchGroups();
    fetchBalances();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups'); // API endpoint to get user's groups
      const data = await response.json();
      setGroups(data.groups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const fetchBalances = async () => {
    try {
      const response = await fetch('/api/balances'); // API endpoint to get balances
      const data = await response.json();
      setBalances(data.balances);
    } catch (error) {
      console.error('Error fetching balances:', error);
    }
  };

  const handleCreateGroup = () => {
    navigate('/create-group'); // Redirect to group creation page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* User Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Welcome, {user?.name}!</h2>
          <p className="text-gray-600">Email: {user?.email}</p>
        </div>

        {/* Groups Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Your Groups</h3>
            <button
              onClick={handleCreateGroup}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create New Group
            </button>
          </div>
          {groups.length > 0 ? (
            <ul className="space-y-4">
              {groups.map((group) => (
                <li key={group.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h4 className="text-md font-semibold">{group.name}</h4>
                  <p className="text-gray-600">Members: {group.members.join(', ')}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You are not part of any groups yet.</p>
          )}
        </div>

        {/* Balances Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Your Balances</h3>
          {Object.keys(balances).length > 0 ? (
            <ul className="space-y-4">
              {Object.keys(balances).map((friend) => (
                <li key={friend} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  {balances[friend] > 0 ? (
                    <p className="text-green-600">
                      {friend} owes you ${balances[friend]}
                    </p>
                  ) : (
                    <p className="text-red-600">
                      You owe {friend} ${Math.abs(balances[friend])}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No outstanding balances.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;