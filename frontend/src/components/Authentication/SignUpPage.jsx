import React, { useState } from 'react';
import { signup } from '../../API/api'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState(''); // Added username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(username, email, password); // Pass username, email, password
      localStorage.setItem('token', response.data.token); // Store token
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.'); // Notify user of error
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md">
        <input
          type="text"
          placeholder="Username" // Added username input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;