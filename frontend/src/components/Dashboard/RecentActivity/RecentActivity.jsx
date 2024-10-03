import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ExpenseList from './ExpenseList';
import ExpenseBackendAPIService from '../../../services/ExpenseBackendAPIService';
import { connect } from 'react-redux';
import { toast } from 'react-toastify'; // Importing react-toastify

const RecentActivityComponent = (props) => {
    const { userId } = useSelector(state => ({
        userId: state.userState.id,
    }));

    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        const fetchRecentActivities = async () => {
            try {
                const { data, success } = await ExpenseBackendAPIService.getRecentActivity();
                if (success) {
                    setRecentActivities(data);
                } else {
                    toast.error(data.reason || 'Failed to fetch recent activities'); // Notify error
                }
            } catch (error) {
                toast.error('An error occurred while fetching recent activities'); // Notify error
            }
        };

        fetchRecentActivities();
    }, []);

    return (
        <div className="container mx-auto py-4">
            <div className="bg-white rounded-lg shadow-md p-4 z-10">
                <div className="header flex items-center justify-center bg-gray-200 py-2 rounded-md">
                    <span className="text-lg font-semibold">Recent Activity</span>
                </div>
                {
                    recentActivities.length ? (
                        <div className="mt-4">
                            <table className="min-w-full bg-white border border-gray-200">
                                <tbody>
                                    {recentActivities.length ? 
                                        <ExpenseList recentActivities={recentActivities} userId={userId} key={recentActivities.id} /> 
                                        : <div>Loading...</div>
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center py-4">
                            <span className="text-gray-600">No recent activity</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addRecentActivities: (state) => {
            dispatch({
                type: "ADD_ACTIVITIES",
                payload: state
            });
        }
    };
};

export default connect(null, mapDispatchToProps)(RecentActivityComponent);