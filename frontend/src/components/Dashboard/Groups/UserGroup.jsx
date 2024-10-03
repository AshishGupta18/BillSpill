import React, { useEffect, useState } from 'react';
import ExpenseList from 'ExpenseList';
import Modal from './Modal';
import "materialize-css/dist/css/materialize.min.css";
import ExpenseBackendAPIService from "../../../services/ExpenseBackendAPIService";
import GroupBackendAPIService from "../../../services/GroupBackendAPIService";
import UserBackendAPIService from '../../../services/UserBackendAPIService';

const UserGroups = (props) => {
    const [groupExpenses, setGroupExpenses] = useState([]);
    const [group, setGroup] = useState({ name: '' });
    const [groupId, setGroupId] = useState(props.match.params.id);
    const [allUserExpense, setAllUserExpenses] = useState([]);
    const [showUsers, setShowUsers] = useState([]);
    const [remainingUsers, setRemainingUsers] = useState([]);

    useEffect(() => {
        setGroupId(props.match.params.id);
    }, [props.match.params.id]);

    useEffect(() => {
        // Fetch group info
        GroupBackendAPIService.getGroupInfo(groupId)
            .then(({ data, success }) => {
                if (success) {
                    setGroup(data);
                }
            })
            .catch((err) => console.log(err));

        // Fetch group expenses
        ExpenseBackendAPIService.getAllExpensesForGroupId(groupId)
            .then(({ data, success }) => {
                if (success) {
                    setGroupExpenses(data);
                }
            })
            .catch((err) => console.log(err));

        // Fetch balance of each user
        ExpenseBackendAPIService.getBalanceOfEachUserInGoupId(groupId)
            .then(({ data, success }) => {
                if (success) {
                    setAllUserExpenses(data);
                    setShowUsers(data.slice(0, 1)); // First user
                    setRemainingUsers(data.slice(1)); // Rest of the users
                }
            })
            .catch((err) => console.log(err));

        // Fetch all users (though not directly used here)
        UserBackendAPIService.getAllUsers()
            .then(({ data, success }) => {
                if (success) {
                    console.log('Fetched users:', data);
                }
            })
            .catch((err) => console.log(err));

    }, [groupId]);

    // Toggle view for showing extra users
    const toggleExtraInfo = () => {
        document.querySelector("#extraInfo").classList.toggle('vanish');
        document.querySelector("#openDetailsLink").classList.toggle('vanish');
        document.querySelector("#closeDetailsLink").classList.toggle('vanish');
    };

    return (
        <div className="container user-groups">
            <div className="row">
                <div className="col m8 z-depth-1">
                    {/* Group Header */}
                    <div className="header row valign-wrapper grey lighten-2">
                        <div className="col m6 valign-wrapper">
                            <img className="responsive-img" src="https://img.icons8.com/flat-round/64/000000/home--v1.png" alt="Group" />
                            <span className="center-align">{group.name}</span>
                        </div>
                        <div className="col m6 valign-wrapper expenseBtn">
                            <Modal groupId={groupId} />
                        </div>
                    </div>

                    {/* Group Expenses */}
                    {groupExpenses.length > 0 ? (
                        <div>
                            <table className="centered highlight expenses-list-table">
                                <tbody>
                                    {groupExpenses.map(expense => (
                                        <ExpenseList expenselist={expense} key={expense.id} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>No expenses made yet....</div>
                    )}
                </div>

                {/* Sidebar for Group Balances */}
                <div className="col m4">
                    <div className="row">
                        <div className="col m12 s12 sidebar-header">
                            <h6 className="grey-text">GROUP BALANCES</h6>
                        </div>

                        {/* List of users */}
                        <div className="col m12 s12" id="main-list">
                            <ul className="collection users-collection" id="mainInfo">
                                {showUsers.length > 0 ? (
                                    showUsers.map(user => (
                                        <li className="collection-item" key={user.user}>
                                            <div className="row valign-wrapper" style={{ marginBottom: "0px" }}>
                                                <img className="col m3" src="https://img.icons8.com/fluent/50/000000/user-male-circle.png" alt="User" />
                                                <div className="col m9 left-align">
                                                    <h6 style={{ marginBottom: "0px" }}>{user.user}</h6>
                                                    <p className={user.amt > 0 ? "orange-text" : "green-text"} style={{ marginTop: "0px" }}>
                                                        Owes USD {Math.abs(user.amt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <div>Loading...</div>
                                )}
                            </ul>

                            {/* Remaining users (initially hidden) */}
                            <ul className="collection users-collection vanish" id="extraInfo">
                                {remainingUsers.length > 0 ? (
                                    remainingUsers.map(user => (
                                        <li className="collection-item" key={user.user}>
                                            <div className="row valign-wrapper" style={{ marginBottom: "0px" }}>
                                                <img className="col m3" src="https://img.icons8.com/fluent/50/000000/user-male-circle.png" alt="User" />
                                                <div className="col m9 left-align">
                                                    <h6 style={{ marginBottom: "0px" }}>{user.user}</h6>
                                                    <p className={user.amt > 0 ? "orange-text" : "green-text"} style={{ marginTop: "0px" }}>
                                                        Owes USD {Math.abs(user.amt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <div>Loading...</div>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Toggle buttons */}
                    <div className="view-details">
                        <p id="openDetailsLink" className="contentLink row" onClick={toggleExtraInfo}>
                            <span className="col m12">view more &gt;&gt;</span>
                        </p>
                        <p id="closeDetailsLink" className="contentLink vanish row" onClick={toggleExtraInfo}>
                            <span className="col m12">X</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserGroups;