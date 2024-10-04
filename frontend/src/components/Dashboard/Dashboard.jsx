import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import RecentActivity from "./RecentActivities";
import PaymentList from "../PaymentList";

// Placeholder components for different sections

const DashboardHome = () => (
  <div className="p-4">
    <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
    <p className="text-gray-600">Welcome to your BillSplit dashboard.</p>
    
    {/* Summary Section */}
    <div className="mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Summary</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-teal-100 p-4 rounded shadow">
          <h3 className="font-bold">Total Expenses</h3>
          <p className="text-xl text-teal-600">$1,200</p>
        </div>
        <div className="bg-teal-100 p-4 rounded shadow">
          <h3 className="font-bold">Total Groups</h3>
          <p className="text-xl text-teal-600">4</p>
        </div>
        <div className="bg-teal-100 p-4 rounded shadow">
          <h3 className="font-bold">Pending Settlements</h3>
          <p className="text-xl text-teal-600">$200</p>
        </div>
      </div>
    </div>

    {/* Recent Activity Section */}
    <div className="mt-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Recent Activity</h2>
      <ul className="mt-4 space-y-2">
        <li className="flex justify-between">
          <span className="text-gray-700">Dinner with friends</span>
          <span className="text-gray-600">$50</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-700">Grocery shopping</span>
          <span className="text-gray-600">$80</span>
        </li>
        <li className="flex justify-between">
          <span className="text-gray-700">Movie Night</span>
          <span className="text-gray-600">$30</span>
        </li>
      </ul>
    </div>

    {/* Call to Action Section */}
    <div className="mt-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">What would you like to do next?</h2>
      <div className="mt-4 space-x-4">
     
        <a
          href="/groups"
          className="inline-block px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          Manage Groups
        </a>
      </div>
    </div>
  </div>
);


// const Expenses = ({ group, expenses }) => (
//   <div className="p-4">
//     <h1 className="text-3xl font-bold text-gray-800">{group.name} Expenses</h1>
//     <div className="space-y-4">
//       {expenses.length > 0 ? (
//         expenses.map((expense, index) => (
//           <div key={index} className="bg-white p-4 shadow rounded-md">
//             <div className="flex justify-between">
//               <span>{expense.date}</span>
//               <div className="flex space-x-4">
//                 <span>
//                   {expense.paidBy} Paid {expense.amount}
//                 </span>
//                 <span>{expense.description}</span>
//                 <span>You owe {expense.owesAmount}</span>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-600">No expenses found for this group.</p>
//       )}
//     </div>
//   </div>
// );


const AddExpenseForm = ({ onSubmit, groupMembers, onCancel }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [splitOption, setSplitOption] = useState("equally");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0 || !description) {
      alert("Please provide valid description and amount");
      return;
    }
    onSubmit({ description, amount, splitOption, selectedMembers });
    setDescription("");
    setAmount(0);
    setSelectedMembers([]);
  };

  const handleMemberSelect = (member) => {
    if (selectedMembers.includes(member)) {
      setSelectedMembers(selectedMembers.filter((m) => m !== member));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Split Option</label>
          <select
            value={splitOption}
            onChange={(e) => setSplitOption(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          >
            <option value="equally">Equally</option>
            <option value="manually">Manually</option>
          </select>
        </div>
        {splitOption === "manually" && (
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Select Members</label>
            <div className="grid grid-cols-2 gap-4">
              {groupMembers.map((member) => (
                <div key={member.id} className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleMemberSelect(member)}
                    className="mr-2"
                  />
                  <span className={`text-gray-800 ${selectedMembers.includes(member) ? 'font-bold' : ''}`}>{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-2 rounded-md shadow hover:bg-teal-600 transition duration-300"
          >
            Add Expense
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 text-white px-6 py-2 rounded-md ml-4 shadow hover:bg-red-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const SettleUpForm = ({ balances, onSettle, onCancel }) => (
  <div className="p-6 bg-gray-100 rounded-lg shadow-md">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Settle Balances</h2>
    {balances.length > 0 ? (
      balances.map((balance, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white p-4 rounded-md mb-4 shadow transition duration-300 ease-in-out hover:shadow-lg"
        >
          <span className="text-lg text-gray-700">
            {balance.memberName} owes you 
            <span className="font-bold text-teal-600"> ${balance.amount}</span>
          </span>
          <button
            onClick={() => onSettle(balance)}
            className="bg-teal-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-teal-600 hover:shadow-lg"
          >
            Settle
          </button>
        </div>
      ))
    ) : (
      <p className="text-gray-600 text-lg">No balances to settle up.</p>
    )}
    <button
      onClick={onCancel}
      className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out hover:bg-red-600"
    >
      Cancel
    </button>
  </div>
);


const GroupBalances = ({ balances }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
    <h2 className="text-2xl font-bold mb-4">Group Balances</h2>
    <div className="space-y-2">
      {balances.length > 0 ? (
        <>
          <h3 className="text-xl font-semibold text-gray-700">
            People owe you:
          </h3>
          {balances
            .filter((balance) => balance.isOwedToYou)
            .map((balance, index) => (
              <div key={index} className="flex justify-between">
                <span>{balance.memberName} owes you</span>
                <span>${balance.amount}</span>
              </div>
            ))}
          <h3 className="text-xl font-semibold text-gray-700 mt-4">
            You owe to:
          </h3>
          {balances
            .filter((balance) => !balance.isOwedToYou)
            .map((balance, index) => (
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
  const [isRecentActivityOpen, setIsRecentActivityOpen] = useState(false);


  
  // Mock data for group balances and members
  const groupBalances = [
    { memberName: "John", amount: 50, isOwedToYou: true },
    { memberName: "Jane", amount: 100, isOwedToYou: false },
  ];
  const groupMembers = [
    { id: "1", name: "John" },
    { id: "2", name: "Jane" },
  ];

  const handleGroupClick = (groupId) => {
    setSelectedGroup(groupId);
    const mockExpenses = [
      {
        date: "2024-01-15",
        description: "Dinner",
        amount: 50,
        paidBy: "John",
        owesAmount: 25,
      },
      {
        date: "2024-01-20",
        description: "Groceries",
        amount: 100,
        paidBy: "Jane",
        owesAmount: 75,
      },
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
    localStorage.removeItem('token'); // Remove the token on logout
    window.location.href = '/login'; // Redirect to login page
  };




  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-teal-600 text-white p-4 flex justify-between items-center">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "Close Menu" : "Open Menu"}
        </button>
        <h1 className="text-2xl font-extrabold">BILLSPILL</h1>
        <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white rounded">
        Logout
      </button>
      </nav>
      <div className="flex flex-grow">
    <Sidebar isOpen={isMenuOpen} onGroupClick={handleGroupClick} />
    <div className="flex-grow p-4">
        <DashboardHome />
        {selectedGroup && (
            <div>
                {/* Use flex container to place PaymentList and GroupBalances side by side */}
                <div className="flex justify-between">
                    <div className="w-2/3 pr-4"> {/* Adjust the width as needed */}
                        <PaymentList />
                    </div>
                    <div className="w-1/3"> {/* Adjust the width as needed */}
                        <GroupBalances balances={groupBalances} />
                    </div>
                </div>

                <div className="flex justify-start ml-5 mt-4 gap-4"> {/* Use gap-4 for spacing */}
    <button
        onClick={() => setIsAddExpenseOpen(true)}
        className="bg-teal-500 text-white px-6 py-2 rounded-md"
    >
        Add Expense
    </button>
    <button
        onClick={() => setIsSettleUpOpen(true)}
        className="bg-teal-500 text-white px-6 py-2 rounded-md"
    >
        Settle Up
    </button>
</div>

                {isAddExpenseOpen && (
                    <AddExpenseForm
                        onSubmit={handleAddExpense}
                        groupMembers={groupMembers}
                        onCancel={() => setIsAddExpenseOpen(false)}
                    />
                )}
                {isSettleUpOpen && (
                    <SettleUpForm
                        balances={groupBalances}
                        onSettle={handleSettleUp}
                        onCancel={() => setIsSettleUpOpen(false)}
                    />
                )}

                {/* Recent Activity Modal */}
                {isRecentActivityOpen && (
                    <RecentActivity
                        onClose={() => setIsRecentActivityOpen(false)}
                    />
                )}
            </div>
        )}
    </div>
</div>
      </div>
    
  );
};

export default Dashboard;
