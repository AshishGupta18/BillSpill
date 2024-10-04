import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';


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
            {expenses.length > 0 ? (
                expenses.map((expense, index) => (
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
                ))
            ) : (
                <p className="text-gray-600">No expenses found for this group.</p>
            )}
        </div>
    </div>
);

const AddExpenseForm = ({ onSubmit, groupMembers }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [splitOption, setSplitOption] = useState('equally');
    const [selectedMembers, setSelectedMembers] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount <= 0 || !description) {
            alert('Please provide valid description and amount');
            return;
        }
        onSubmit({ description, amount, splitOption, selectedMembers });
        setDescription('');
        setAmount(0);
        setSelectedMembers([]);
    };

    const handleMemberSelect = (member) => {
        if (selectedMembers.includes(member)) {
            setSelectedMembers(selectedMembers.filter(m => m !== member));
        } else {
            setSelectedMembers([...selectedMembers, member]);
        }
    };

    return (
        <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
            <h2 className="text-2xl mb-4">Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <input 
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Amount</label>
                    <input 
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-md"
                        required
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

const SettleUp = ({ balances, onSettle }) => (
    <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Settle Balances</h2>
        {balances.length > 0 ? (
            balances.map((balance, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-4 rounded-md mb-4 shadow">
                    <span>{balance.memberName} owes you {balance.amount}</span>
                    <button onClick={() => onSettle(balance)} className="bg-green-500 text-white px-4 py-2 rounded-md">
                        Settle
                    </button>
                </div>
            ))
        ) : (
            <p className="text-gray-600">No balances to settle up.</p>
        )}
    </div>
);

const GroupBalances = ({ balances }) => (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4">Group Balances</h2>
        <div className="space-y-2">
            {balances.length > 0 ? (
                <>
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
                </>
            ) : (
                <p className="text-gray-600">No balances found.</p>
            )}
        </div>
    </div>
);

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
    const [isSettleUpOpen, setIsSettleUpOpen] = useState(false);
    const navigate = useNavigate();

    // Mock data for group balances and members
    const groupBalances = [
        { memberName: 'John', amount: 50, isOwedToYou: true }, 
        { memberName: 'Jane', amount: 100, isOwedToYou: false }
    ];
    const groupMembers = [{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }];

    const handleGroupClick = (groupId) => {
        setSelectedGroup(groupId);
        const mockExpenses = [
            { date: '2024-01-15', description: 'Dinner', amount: 50, paidBy: 'John', owesAmount: 25 },
            { date: '2024-01-20', description: 'Groceries', amount: 100, paidBy: 'Jane', owesAmount: 75 },
        ];
        setExpenses(mockExpenses);
    };

    const handleAddExpense = (expense) => {
        setExpenses([...expenses, expense]);
        setIsAddExpenseOpen(false);
    };

    const handleSettleUp = (balance) => {
        alert(`Settled with ${balance.memberName} for ${balance.amount}`);
        setIsSettleUpOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-teal-600 text-white p-4 flex justify-between items-center">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                    <span className="sr-only">Open sidebar</span>
                    ☰
                </button>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </nav>

            <div className="flex flex-grow">
                {/* Sidebar */}
                <Sidebar isMenuOpen={isMenuOpen} onGroupClick={handleGroupClick} />

                {/* Main Content */}
                <div className="flex-grow bg-gray-100 p-6">
                    {!selectedGroup ? (
                        <DashboardHome />
                    ) : (
                        <>
                            <Expenses group={{ name: "Group Name" }} expenses={expenses} />
                            <GroupBalances balances={groupBalances} />
                            {isAddExpenseOpen && <AddExpenseForm onSubmit={handleAddExpense} groupMembers={groupMembers} />}
                            {isSettleUpOpen && <SettleUp balances={groupBalances} onSettle={handleSettleUp} />}
                        </>
                    )}

                    {/* Buttons for Add Expense and Settle Up */}
                    {selectedGroup && (
                        <div className="fixed bottom-4 right-4 space-y-2">
                            <button onClick={() => setIsAddExpenseOpen(true)} className="bg-teal-500 text-white px-6 py-2 rounded-md shadow-lg">Add Expense</button>
                            <button onClick={() => setIsSettleUpOpen(true)} className="bg-green-500 text-white px-6 py-2 rounded-md shadow-lg">Settle Up</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;