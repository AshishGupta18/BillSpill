import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Expenses from './dashboard/Expenses';
import RecentActivity from './RecentActivity/RecentActivity';
import UserGroups from './Groups/UserGroup';
import CreateNewGroup from './CreateNewGroup';
import Invites from './Groups/GroupInvites';

const Dashboard = (props) => {
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        props.logout();
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navbar */}
            <nav className="bg-teal-600 text-white shadow-md">
                <div className="container mx-auto flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold">
                        ExpenseApp
                    </Link>
                    <ul className="flex space-x-4 items-center">
                        <li>
                            <Link to="/user/home" className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/user/home/invites" className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
                                <i className="material-icons">add</i>
                            </Link>
                        </li>
                        <li>
                            <Link to="/user">
                                <span className="text-2xl">
                                    <i className="fas fa-user"></i>
                                </span>
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
                                Log Out
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-lg">
                    <Sidebar />
                </aside>

                {/* Main Display */}
                <main className="flex-1 p-6 bg-gray-50">
                    <div className="container mx-auto">
                        <Switch>
                            <Route exact path="/user/home" component={Expenses} />
                            <Route path="/user/home/dashboard" component={Expenses} />
                            <Route path="/user/home/groups/:id" component={UserGroups} />
                            <Route path="/user/home/recent-activity" component={RecentActivity} />
                            <Route path="/user/home/new-group" component={CreateNewGroup} />
                            <Route path="/user/home/invites" component={Invites} />
                        </Switch>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;