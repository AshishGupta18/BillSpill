import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Call backend API for login (to be implemented)
    console.log('Login with:', email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;