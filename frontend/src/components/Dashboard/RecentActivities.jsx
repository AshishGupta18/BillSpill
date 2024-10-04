import React from 'react';

const RecentActivities = ({ activities, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-gray-700 text-lg font-semibold mb-4">Recent Activity</h2>
                <ul className="space-y-2">
                    {activities.map(activity => (
                        <li key={activity.id} className="text-gray-600 text-center">
                            {activity.text}
                        </li>
                    ))}
                </ul>
                <button 
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition duration-200"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default RecentActivities;