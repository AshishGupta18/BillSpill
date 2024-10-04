import React from "react";
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-white"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 200 200'%3E%3Cpolygon fill='%23DCEFFA' fill-opacity='0.61' points='100 0 0 100 100 100 100 200 200 100 200 0'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Navbar */}
      <nav className="bg-teal-600 py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-black flex items-center space-x-2">
            <img
              className="h-12"
              src="https://img.icons8.com/fluent/48/000000/love-letter.png"
              alt="letter"
            />
            <span className="text-xl font-bold">BillSpill</span>
          </Link>
          <ul className="flex space-x-6">
            <li>
            <NavLink to="/login">
                <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md">
                  Login
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup">
                <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md">
                  Sign Up
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center h-screen mt-10">
        {/* Left Section */}
        <div className="md:w-7/12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Less stress when sharing expenses on trips.
          </h1>
          <div className="flex justify-center md:justify-start mt-8 space-x-6">
            <img
              className="h-28 transition-transform transform hover:scale-110"
              src="https://img.icons8.com/nolan/96/home.png"
              alt="home"
            />
            <img
              className="h-28 transition-transform transform hover:scale-110"
              src="https://img.icons8.com/nolan/96/airplane-take-off.png"
              alt="airplane"
            />
            <img
              className="h-28 transition-transform transform hover:scale-110"
              src="https://img.icons8.com/nolan/96/like.png"
              alt="heart"
            />
            <img
              className="h-28 transition-transform transform hover:scale-110"
              src="https://img.icons8.com/nolan/96/star.png"
              alt="star"
            />
          </div>
          <div className="mt-8 text-lg text-gray-700">
            <p>
              Keep track of your shared expenses and balances with housemates,
              trips, groups, friends, and family.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/signup"
              className="bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
            >
              Sign Up
            </Link>
          </div>
          <div className="mt-8 text-gray-500">
            <p>
              Free for <i className="fab fa-apple"></i> iPhone,{" "}
              <i className="fab fa-android"></i> Android, and web
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-5/12 h-screen flex justify-center items-center">
          <img
            className="w-full h-auto transition-transform transform hover:scale-110"
            alt="airplane"
            src="https://img.icons8.com/nolan/96/airplane-take-off.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;