import React from 'react';

const PaymentList = ({ expenses }) => {
    return (
        <div className="space-y-4">
            {expenses.length > 0 ? (
                expenses.map((expense, index) => (
                    <div key={index} className="flex justify-between items-center bg-white shadow-lg rounded-md p-4">
                        {/* Date */}
                        <div className="text-gray-600 w-1/6">
                            {new Date(expense.date).toLocaleDateString()}
                        </div>
                        
                        {/* Description */}
                        <div className="flex-1">
                            <p className="text-lg font-semibold text-gray-700">
                                {expense.description}
                            </p>
                        </div>

                        {/* Payment Info */}
                        <div className="w-1/3 text-right">
                            <p className="text-gray-700">
                                <span className="font-bold">{expense.paidBy}</span> paid ₹{expense.paidAmount}
                            </p>
                            <p className="text-gray-500">
                                You owe ₹{expense.owesAmount}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No expenses available.</p>
            )}
        </div>
    );
};

export default PaymentList;