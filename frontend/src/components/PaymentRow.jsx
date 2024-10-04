import React, { useState } from 'react';

const PaymentRow = ({ payment }) => {
    const [description, setDescription] = useState(payment.description);
    const amountPerPerson = (payment.totalAmount / payment.members.length).toFixed(2);

    return (
        <div className="flex justify-between items-center bg-white shadow-lg rounded-md p-4 mb-4">
            {/* Payment Date */}
            <div className="text-gray-600 w-1/6">
                {new Date(payment.date).toLocaleDateString()}
            </div>

            {/* Payment Type Icon */}
            <div className="w-1/12 flex justify-center">
                {/* Assuming the type can be 'Food', 'Travel', 'Entertainment', etc. */}
                {payment.type === 'Food' && <img src="path-to-food-icon.png" alt="Food Icon" className="w-6 h-6" />}
                {payment.type === 'Travel' && <img src="path-to-travel-icon.png" alt="Travel Icon" className="w-6 h-6" />}
                {/* Add more icons as needed */}
            </div>

            {/* Editable Payment Description */}
            <div className="flex-1">
                <input
                    className="text-lg font-semibold text-gray-700 bg-transparent border-b border-dashed focus:outline-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* Payment Details */}
            <div className="w-1/3 text-right">
                <p className="text-gray-700">
                    <span className="font-bold">{payment.payer}</span> paid ₹{payment.totalAmount}
                </p>
                <p className="text-gray-500">
                    Each owes <span className="font-bold">₹{amountPerPerson}</span>
                </p>
            </div>
        </div>
    );
};

export default PaymentRow;