import React, { useState } from 'react';

const PaymentRow = ({ payment }) => {
    const [description, setDescription] = useState(payment.description);
    const amountPerPerson = (payment.totalAmount / payment.members.length).toFixed(2);

    return (
        <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
            {/* Payment Date */}
            <div className="text-gray-600 text-sm w-1/6">
                {new Date(payment.date).toLocaleDateString()}
            </div>

            {/* Payment Type Icon */}
            <div className="w-1/12 flex justify-center">
                {/* Assuming the type can be 'Food', 'Travel', 'Entertainment', etc. */}
                {payment.type === 'Food' && <img src="path-to-food-icon.png" alt="Food Icon" className="w-8 h-8" />}
                {payment.type === 'Travel' && <img src="path-to-travel-icon.png" alt="Travel Icon" className="w-8 h-8" />}
                {/* Add more icons as needed */}
            </div>

            {/* Editable Payment Description */}
            <div className="flex-1">
                <input
                    className="text-lg font-medium text-gray-800 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-teal-600 transition duration-200"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* Payment Details */}
            <div className="w-1/3 text-right">
                <p className="text-gray-800 text-lg font-bold">
                    <span className="font-bold">{payment.payer}</span> paid <span className="text-teal-600">₹{payment.totalAmount}</span>
                </p>
                <p className="text-gray-500 text-sm">
                    Each owes <span className="font-bold text-teal-600">₹{amountPerPerson}</span>
                </p>
            </div>
        </div>
    );
};

export default PaymentRow;