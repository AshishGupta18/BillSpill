import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import "tailwindcss/tailwind.css";

// Placeholder components for different sections
const DashboardHome = () => (
    <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your BillSplit dashboard.</p>
    </div>
);

const Expenses = ({ group, expenses }) => (
    <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-800">{group.name} Expenses</h1>
        <div className="space-y-4">
            {expenses.map((expense, index) => (
                <div key={index} className="bg-white p-4 shadow rounded-md">
                    <div className="flex justify-between">
                        <span>{expense.date}</span>
                        <div className="flex space-x-4">
                            <span>{expense.paidBy} Paid {expense.amount}</span>
                            <span>{expense.description}</span>
                            <span>You owe {expense.owesAmount}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Add Expense Form
const AddExpenseForm = ({ onSubmit, groupMembers }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [splitOption, setSplitOption] = useState('equally');
    const [selectedMembers, setSelectedMembers] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ description, amount, splitOption, selectedMembers });
    };

    const handleMemberSelect = (member) => {
        if (selectedMembers.includes(member)) {
            setSelectedMembers(selectedMembers.filter(m => m !== member));
        } else {
            setSelectedMembers([...selectedMembers, member]);
        }
    };

    return (
        <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl mb-4">Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <input 
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Amount</label>
                    <input 
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Split Option</label>
                    <select 
                        value={splitOption}
                        onChange={(e) => setSplitOption(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md"
                    >
                        <option value="equally">Equally</option>
                        <option value="manually">Manually</option>
                    </select>
                </div>
                {splitOption === 'manually' && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Select Members</label>
                        <div className="grid grid-cols-2 gap-2">
                            {groupMembers.map(member => (
                                <div key={member.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleMemberSelect(member)}
                                        className="mr-2"
                                    />
                                    <span>{member.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <button type="submit" className="bg-teal-500 text-white px-6 py-2 rounded-md">Add Expense</button>
            </form>
        </div>
    );
};

// Settle Up Section
const SettleUp = ({ balances, onSettle }) => (
    <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Settle Balances</h2>
        {balances.map((balance, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-4 rounded-md mb-4 shadow">
                <span>{balance.memberName} owes you {balance.amount}</span>
                <button onClick={() => onSettle(balance)} className="bg-green-500 text-white px-4 py-2 rounded-md">
                    Settle
                </button>
            </div>
        ))}
    </div>
);

// Group Balances Component
const GroupBalances = ({ balances }) => (
    <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Group Balances</h2>
        <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-700">People owe you:</h3>
            {balances.filter(balance => balance.isOwedToYou).map((balance, index) => (
                <div key={index} className="flex justify-between">
                    <span>{balance.memberName} owes you</span>
                    <span>${balance.amount}</span>
                </div>
            ))}
            <h3 className="text-xl font-semibold text-gray-700 mt-4">You owe to:</h3>
            {balances.filter(balance => !balance.isOwedToYou).map((balance, index) => (
                <div key={index} className="flex justify-between">
                    <span>You owe {balance.memberName}</span>
                    <span>${balance.amount}</span>
                </div>
            ))}
        </div>
    </div>
);

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
    const [isSettleUpOpen, setIsSettleUpOpen] = useState(false);

    // Mock data for group balances and members
    const groupBalances = [
        { memberName: 'John', amount: 50, isOwedToYou: true }, 
        { memberName: 'Jane', amount: 100, isOwedToYou: false }
    ];
    const groupMembers = [{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }];

    // Handle group selection
    const handleGroupClick = (groupId) => {
        setSelectedGroup(groupId);
        const mockExpenses = [
            { date: '2024-01-15', description: 'Dinner', amount: 50, paidBy: 'John', paidAmount: 50, owesAmount: 25 },
            { date: '2024-01-20', description: 'Groceries', amount: 100, paidBy: 'Jane', paidAmount: 100, owesAmount: 75 },
        ];
        setExpenses(mockExpenses);
    };

    // Handle adding new expense
    const handleAddExpense = (expense) => {
        setExpenses([...expenses, expense]);
        setIsAddExpenseOpen(false);
    };

    // Handle settling up
    const handleSettleUp = (balance) => {
        alert(`Settled with ${balance.memberName} for ${balance.amount}`);
        setIsSettleUpOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-teal-600 text-white shadow-md">
                <div className="container mx-auto flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold">BillSplit</Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="block lg:hidden bg-teal-700 px-3 py-2 rounded-md text-white"
                    >
                        Menu
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
                <aside className={`w-64 bg-white shadow-lg ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
                    <Sidebar onGroupClick={handleGroupClick} />
                </aside>

                {/* Main Display */}
                <main className="flex-1 p-6 bg-gray-50">
                    {selectedGroup ? (
                        <div className="flex">
                            <div className="flex-1 pr-4">
                                {/* Expenses Section */}
                                <Expenses group={selectedGroup} expenses={expenses} />
                                {/* Add Expense Button */}
                                <button onClick={() => setIsAddExpenseOpen(true)} className="bg-teal-500 text-white px-4 py-2 rounded-lg">
                                    Add Expense
                                </button>
                                {/* Settle Up Button */}
                                <button onClick={() => setIsSettleUpOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4">
                                    Settle Up
                                </button>

                                {/* Add Expense Form */}
                                {isAddExpenseOpen && <AddExpenseForm onSubmit={handleAddExpense} groupMembers={groupMembers} />}
                            </div>

                            {/* Group Balances Section */}
                            <div className="w-64">
                                <GroupBalances balances={groupBalances} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <button onClick={() => alert('Please select a group.')} className="bg-teal-500 text-white px-4 py-2 rounded-lg">
                                Select a Group to View Details
                            </button>
                        </div>
                    )}

                    {/* Settle Up Section */}
                    {isSettleUpOpen && <SettleUp balances={groupBalances} onSettle={handleSettleUp} />}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;