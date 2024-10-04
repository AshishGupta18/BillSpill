import React, { useState } from 'react';
import { Link } from "react-router-dom";
import NewGroupModal from './NewGroupModal';

const Sidebar = ({ onGroupClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groups, setGroups] = useState([
        { id: '1', name: 'Family' },
        { id: '2', name: 'Friends' },
        { id: '3', name: 'Work' },
        { id: '4', name: 'Gym Buddies' },
    ]);

    const handleGroupSubmit = (newGroup) => {
        setGroups([...groups, newGroup]);
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

            {/* Recent Activity */}
            <div className="flex items-center mb-6">
                <Link to="/recent-activity" className="flex items-center space-x-4">
                    <i className="fas fa-flag text-gray-700 text-2xl" />
                    <span className="text-gray-700 text-lg font-semibold">Recent Activity</span>
                </Link>
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
                        <li
                            key={group.id}
                            className="flex items-center space-x-4 p-2 rounded-md hover:bg-gray-200 transition duration-200"
                            onClick={() => onGroupClick(group.id)}
                        >
                            <i className="fas fa-bookmark text-teal-600 text-xl" />
                            <span className="text-teal-600 hover:text-teal-700">{group.name}</span>
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
        </div>
    );
};

export default Sidebar;