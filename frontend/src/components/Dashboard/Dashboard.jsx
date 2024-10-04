import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import PaymentList from '../PaymentList';  // Assuming this is the component that handles the expense list

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [expenses, setExpenses] = useState([]);

    // Mock expenses data for selected group
    const handleGroupClick = (groupId) => {
        setSelectedGroup(groupId);
        const mockExpenses = [
            { date: '2024-01-15', description: 'Dinner', amount: 50, paidBy: 'Om', paidAmount: 50, owesAmount: 0 },
            { date: '2024-01-20', description: 'Groceries', amount: 100, paidBy: 'Ashish', paidAmount: 30, owesAmount: 70 },
            { date: '2024-02-05', description: 'Movie Night', amount: 40, paidBy: 'Sara', paidAmount: 40, owesAmount: 0 },
        ];
        setExpenses(mockExpenses);
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
                            <Link to="/home" className="bg-teal-500 px-4 py-2 rounded hover:bg-teal-700">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/profile" className="px-4 py-2 rounded hover:bg-teal-500">
                                <i className="fas fa-user"></i> Profile
                            </Link>
                        </li>
                        <li>
                            <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Log Out</button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className={`w-64 bg-white shadow-lg lg:block ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <Sidebar onGroupClick={handleGroupClick} />
                </aside>

                {/* Main Dashboard Area */}
                <main className="flex-1 p-6 bg-gray-50">
                    {/* If a group is selected, show the expense list */}
                    {selectedGroup ? (
                        <div>
                            <h1 className="text-2xl font-bold mb-4">Group Expenses</h1>
                            <PaymentList expenses={expenses} />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full space-y-6">
                            <button className="bg-teal-500 text-white px-6 py-3 rounded-lg">
                                Add Expense
                            </button>
                            <button className="bg-green-500 text-white px-6 py-3 rounded-lg">
                                Settle Up
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;