import React from "react";
// import airplane from "../airplane.png";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 200 200'%3E%3Cpolygon fill='%23DCEFFA' fill-opacity='0.61' points='100 0 0 100 100 100 100 200 200 100 200 0'/%3E%3C/svg%3E")` }}>
      {/* Navbar */}
      <nav className="bg-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-black">
            <img className="h-12" src="https://img.icons8.com/fluent/48/000000/love-letter.png" alt="letter" />
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link to="/login" className="text-green-700">
                Login
              </Link>
            </li>
            <li>
              <NavLink to="/signup">
                <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200">
                  Sign Up
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center h-screen">
        {/* Left Section */}
        <div className="md:w-7/12 text-center md:text-left mt-20">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-700 leading-tight">
            Less stress when sharing expenses on trips.
          </h1>
          <div className="flex justify-center md:justify-start mt-8 space-x-4">
            <img className="h-24" src="https://img.icons8.com/nolan/96/home.png" alt="home" />
            <img className="h-24" src="https://img.icons8.com/nolan/96/airplane-take-off.png" alt="airplane" />
            <img className="h-24" src="https://img.icons8.com/nolan/96/like.png" alt="heart" />
            <img className="h-24" src="https://img.icons8.com/nolan/96/star.png" alt="star" />
          </div>
          <div className="mt-8 text-lg text-gray-600">
            <p>Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.</p>
          </div>
          <div className="mt-8">
            <Link to="/signup" className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transition duration-200">
              Sign Up
            </Link>
          </div>
          <div className="mt-8 text-gray-500">
            <p>Free for <i className="fab fa-apple"></i> iPhone, <i className="fab fa-android"></i> Android, and web</p>
          </div>
        </div>

        {/* Right Section */}
        {/* Right Section */}
  <div className="md:w-5/12 h-screen flex justify-center items-center">
    <img className="w-full" alt="airplane" src="https://img.icons8.com/nolan/96/airplane-take-off.png" />
  </div>
</div>
    </div>
  );
};

export default Home;