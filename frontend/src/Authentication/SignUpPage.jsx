import React, { useState } from 'react';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Call backend API for sign up (to be implemented)
    console.log('Sign Up with:', email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full" onSubmit={handleSignUp}>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>
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
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;