import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import PaymentList from '../PaymentList';  // Assuming this is the component that handles the expense list

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleGroupClick = (groupId) => {
        setSelectedGroup(groupId);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navbar */}
            <nav className="bg-teal-600 text-white shadow-lg">
                <div className="container mx-auto flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold">BillSplit</Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="block lg:hidden bg-teal-700 px-3 py-2 rounded-md text-white"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <ul className="hidden lg:flex space-x-4 items-center">
                        <li>
                            <Link to="/home" className="bg-teal-500 px-4 py-2 rounded hover:bg-teal-700 transition duration-200">Home</Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className="px-4 py-2 rounded hover:bg-teal-500 transition duration-200">Dashboard</Link>
                        </li>
                        <li>
                            <button className="px-4 py-2 rounded bg-red-500 hover:bg-red-700 transition duration-200">Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Layout */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <div className={`lg:w-1/4 w-full bg-white shadow-lg lg:shadow-none ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
                    <Sidebar onGroupClick={handleGroupClick} />
                </div>

                {/* Main Content */}
                <div className="flex-grow p-8">
                    {selectedGroup ? (
                        <PaymentList groupId={selectedGroup} />
                    ) : (
                        <div className="text-center text-gray-600">
                            <p>Select a group to view expenses.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;