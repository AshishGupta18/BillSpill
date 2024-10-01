import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <Link to="/" className="font-bold">
        Expense Sharing App
      </Link>
      <div>
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={logout} className="ml-4">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="ml-4">Login</Link>
            <Link to="/signup" className="ml-4">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;