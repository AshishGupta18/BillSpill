import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import "tailwindcss/tailwind.css";

// Placeholder components for the different sections
const DashboardHome = () => (
    <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your BillSplit dashboard.</p>
    </div>
);

const Groups = () => (
    <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-800">Your Groups</h1>
        <p className="text-gray-600">List of groups and group details will go here.</p>
    </div>
);

const Expenses = () => (
    <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-800">Expenses</h1>
        <p className="text-gray-600">Track your expenses across groups.</p>
    </div>
);

const RecentActivity = () => (
    <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-800">Recent Activity</h1>
        <p className="text-gray-600">Your recent transactions will be displayed here.</p>
    </div>
);

// Main Dashboard component
const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [expenses, setExpenses] = useState([]);

    // Mock expenses data
    const handleGroupClick = (groupId) => {
        setSelectedGroup(groupId);
        const mockExpenses = [
            { date: '2024-01-15', description: 'Dinner', amount: 50, paidBy: 'User A', paidAmount: 50, owesAmount: 0 },
            { date: '2024-01-20', description: 'Groceries', amount: 100, paidBy: 'User B', paidAmount: 30, owesAmount: 70 },
            { date: '2024-02-05', description: 'Movie Night', amount: 40, paidBy: 'User A', paidAmount: 40, owesAmount: 0 },
        ];
        setExpenses(mockExpenses);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-teal-600 text-white shadow-md">
                <div className="container mx-auto flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold">
                        BillSplit
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="block lg:hidden bg-teal-700 px-3 py-2 rounded-md text-white"
                    >
                        Menu
                    </button>
                    <ul className="hidden lg:flex space-x-4 items-center">
                        <li>
                            <Link to="/home" className="bg-teal-500 px-4 py-2 rounded hover:bg-teal-700">
                                Dashboard
                            </Link>
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
                <aside className={`w-64 bg-white shadow-lg ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
                    <Sidebar onGroupClick={handleGroupClick} />
                </aside>

                {/* Main Display */}
                <main className="flex-1 p-6 bg-gray-50">
                    <div className="container mx-auto">
                        {!selectedGroup ? (
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700">
                                    Add Expense
                                </button>
                                <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
                                    Settle Up
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col w-full">
                                <h2 className="text-xl font-semibold mb-4">Expenses for Group {selectedGroup}</h2>
                                <div className="overflow-y-scroll h-64 border border-gray-300 rounded-md p-4">
                                    {/* Expenses List */}
                                    {expenses.length === 0 ? (
                                        <p>No expenses available for this group.</p>
                                    ) : (
                                        <ul className="space-y-2">
                                            {expenses.map((expense, index) => (
                                                <li key={index} className="flex justify-between p-2 border-b">
                                                    <div>
                                                        <p className="font-bold">{expense.description}</p>
                                                        <p>{expense.date}</p>
                                                    </div>
                                                    <div>
                                                        <p>Paid: ${expense.paidAmount}</p>
                                                        <p>Owes: ${expense.owesAmount}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )}
                        <Routes>
                            <Route path="/home" element={<DashboardHome />} />
                            <Route path="/groups" element={<Groups />} />
                            <Route path="/expenses" element={<Expenses />} />
                            <Route path="/activity" element={<RecentActivity />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;