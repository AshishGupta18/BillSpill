import React, { useState, useEffect } from 'react';

const Give = ({ paymentList }) => {
    const [givePayment, setPayment] = useState(paymentList);

    useEffect(() => {
        setPayment(paymentList);
    }, [paymentList]);

    return (
        <div className="container my-4 p-4 rounded-lg shadow-md bg-gray-100">
            <div className="row">
                <div className="w-full">
                    <div className="bg-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="text-gray-800">
                            <div className="flex items-center bg-gray-300 p-2 rounded">
                                <img
                                    className="w-16 h-16 mr-4"
                                    src="https://img.icons8.com/nolan/64/shopping-cart-loaded.png"
                                    alt="Shopping Cart"
                                />
                                <div>
                                    <p className="text-lg font-semibold">{givePayment.name}</p>
                                    <p className="text-green-600">You owe +${givePayment.totalAmt}</p>
                                </div>
                            </div>
                            <div className="list-content mt-2">
                                <ul className="list-disc list-inside">
                                    {
                                        givePayment.groups.map((group) => (
                                            <li className="text-gray-600 mt-1" key={group.id}>
                                                You owe {givePayment.name} +${group.amt} for "{group.group}"
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Give;