import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome, {user.email}!</p>
      {/* Add further functionality for group management and expense tracking here */}
    </div>
  );
};

export default Dashboard;