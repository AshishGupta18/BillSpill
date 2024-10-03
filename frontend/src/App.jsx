import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // Adjust path as needed
import { AuthProvider } from './Context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Authentication/LoginPage';
import Signup from './components/Authentication/SignUpPage';
import Dashboard from './components/Dashboard/Dashboard';


const App = () => {
  return (
    <AuthProvider>
   
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
   
    </AuthProvider>
  );
}

export default App;