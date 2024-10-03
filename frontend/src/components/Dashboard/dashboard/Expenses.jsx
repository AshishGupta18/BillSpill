import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Recieve from './Recieve';
import Give from './GivePayment';
import Modal from './Modal';
import ExpenseBackendAPIService from '../../../services/ExpenseBackendAPIService';
import UserBackendAPIService from '../../../services/UserBackendAPIService';

const Expenses = () => {
    const { recieve, pay } = useSelector(state => ({
        recieve: state.expenseState.recieve,
        pay: state.expenseState.pay,
        token: state.userState.token,
    }));

    const [userIndo, setUserIndo] = useState();
    const [allBalance, setBalance] = useState();

    useEffect(() => {
        UserBackendAPIService.getUserDetails().then(({ data, success }) => {
            if (success) {
                setUserIndo(data);
            }
        }).catch(e => {
            console.log(e.message);
        });
    }, []);

    useEffect(() => {
        ExpenseBackendAPIService.getAllExpenses().then(({ data, success }) => {
            if (success) {
                setBalance(data);
            }
        });
    }, []);

    return (
        <div className="container mx-auto p-4 rounded-lg shadow-lg bg-white">
            <nav className="flex justify-between items-center bg-gray-200 p-4 rounded">
                <a href="#" className="text-black text-lg font-bold">Dashboard</a>
                <ul className="flex space-x-4">
                    <li>
                        <a href="#" className="btn bg-orange-600 text-white px-4 py-2 rounded">Add a bill</a>
                        <a className="btn modal-trigger bg-orange-600 text-white px-4 py-2 rounded" data-target="modal1">Settle</a>
                        <Modal />
                    </li>
                </ul>
            </nav>

            <table className="min-w-full mt-4 bg-gray-200 rounded">
                <tbody>
                    <tr>
                        <td className="px-4 py-2">
                            <div className="user-exp user-total">
                                <p className="text-gray-600">Total balance</p>
                                <span className="text-green-600">{allBalance ? allBalance.totalcost : ''}</span>
                            </div>
                        </td>
                        <td className="px-4 py-2">
                            <div className="user-exp user-total">
                                <p className="text-gray-600">You owe</p>
                                <span className="text-green-600">{allBalance ? allBalance.recieve : ''}</span>
                            </div>
                        </td>
                        <td className="px-4 py-2">
                            <div className="user-exp user-total">
                                <p className="text-gray-600">You are owed</p>
                                <span className="text-green-600">{allBalance ? allBalance.pay : ''}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="flex mt-4">
                <div className="w-1/2 pr-2">
                    <h5 className="text-gray-600">YOU OWE</h5>
                    {
                        allBalance && allBalance.recieveExpenses.length > 0 ?
                            allBalance.recieveExpenses.map((payment) => (
                                <Give paymentList={payment} key={payment.id} />
                            )) :
                            <div className="text-center text-gray-600">List is empty</div>
                    }
                </div>
                <div className="w-1/2 pl-2">
                    <h5 className="text-gray-600">YOU ARE OWED</h5>
                    {
                        allBalance && allBalance.getExpenses.length ?
                            allBalance.getExpenses.map((payment) => (
                                <Recieve paymentList={payment} key={payment.id} />
                            )) :
                            <div className="text-center text-gray-600">List is empty</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Expenses;