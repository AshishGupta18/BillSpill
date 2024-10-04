import React, { useState } from 'react';
import { Link } from "react-router-dom";
import NewGroupModal from './NewGroupModal';
import RecentActivities from './RecentActivities'; // Import RecentActivities component

const Sidebar = ({ onGroupClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showRecentActivities, setShowRecentActivities] = useState(false);
    const [groups, setGroups] = useState([
        { id: '1', name: 'Family' },
        { id: '2', name: 'Friends' },
        { id: '3', name: 'Work' },
        { id: '4', name: 'Gym Buddies' },
    ]);

    const [recentActivities] = useState([
        { id: 1, text: 'Payment of $20 to Family on 10/01/2024' },
        { id: 2, text: 'Payment of $50 to Friends on 09/29/2024' },
        { id: 3, text: 'Added a new expense to Work group on 09/28/2024' },
    ]);

    const handleGroupSubmit = (newGroup) => {
        setGroups([...groups, newGroup]);
    };

    const toggleRecentActivities = () => {
        setShowRecentActivities(!showRecentActivities);
    };

    return (
        <div className="p-4">
            {/* Dashboard Header */}
            <div className="flex items-center mb-6">
                <Link to="/home" className="flex items-center space-x-4">
                    <img className="w-12 h-12 rounded-full" src="https://img.icons8.com/fluent/48/000000/love-letter.png" alt="Dashboard" />
                    <span className="text-gray-700 text-lg font-semibold">Dashboard</span>
                </Link>
            </div>

            {/* Recent Activity Toggle Button */}
            <div className="mb-6">
                <button 
                    onClick={toggleRecentActivities} 
                    className="flex items-center space-x-2 text-gray-700 font-semibold"
                >
                    <i className={`fas ${showRecentActivities ? 'fa-minus' : 'fa-plus'} text-gray-700`} />
                    <span>{showRecentActivities ? 'Hide Recent Activity' : 'Show Recent Activity'}</span>
                </button>
            </div>

            {/* Group List */}
            <div>
                <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-4">
                    <p className="text-gray-600 font-bold">GROUPS</p>
                    <button
                        className="text-teal-600 flex items-center space-x-1"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <i className="fa fa-plus text-teal-600" />
                        <span>Add</span>
                    </button>
                </div>
                <ul className="space-y-2">
                    {groups.map((group) => (
                        <li key={group.id} className="flex items-center">
                            <button
                                className="flex items-center space-x-4 p-2 rounded-md hover:bg-gray-200 transition duration-200 w-full text-left"
                                onClick={() => onGroupClick(group.id)} // Call onGroupClick when clicked
                            >
                                <i className="fas fa-bookmark text-teal-600 text-xl" />
                                <span className="text-teal-600 hover:text-teal-700">{group.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* New Group Modal */}
            <NewGroupModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onGroupSubmit={handleGroupSubmit}
            />

            {/* Recent Activities Component */}
            {showRecentActivities && (
                <RecentActivities 
                    activities={recentActivities} 
                    onClose={() => setShowRecentActivities(false)} 
                />
            )}
        </div>
    );
};

export default Sidebar;