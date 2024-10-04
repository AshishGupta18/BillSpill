import React from 'react';

// Sample data for payments
const payments = [
    { id: '1', amount: 500, category: 'Food', date: '2024-10-01' },
    { id: '2', amount: 1500, category: 'Transport', date: '2024-10-02' },
    { id: '3', amount: 2000, category: 'Groceries', date: '2024-10-03' },
    { id: '4', amount: 750, category: 'Entertainment', date: '2024-10-04' },
];

const PaymentList = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-semibold mb-4 border-b-2 border-teal-500 pb-2">Payment List</h2>
            <div className="space-y-2">
                {payments.map((payment) => (
                    <PaymentRow key={payment.id} payment={payment} />
                ))}
            </div>
        </div>
    );
};

const PaymentRow = ({ payment }) => {
    return (
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition duration-200 border border-gray-200">
            <div className="flex flex-col">
                <span className="text-teal-600 font-bold text-lg">
                    ₹{payment.amount}
                </span>
                <span className="text-gray-600 text-sm">{payment.category}</span>
            </div>
            <span className="text-gray-500 text-sm">{payment.date}</span>
        </div>
    );
};

export default PaymentList;