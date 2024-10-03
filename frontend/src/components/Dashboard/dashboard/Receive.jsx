import React, { useState, useEffect } from 'react';

const Recieve = ({ paymentList }) => {
    const [getPayment, setGetPayment] = useState(paymentList);

    useEffect(() => {
        setGetPayment(paymentList);
    }, [paymentList]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col">
                <div className="w-full">
                    <div className="bg-gray-100 rounded-lg shadow-md p-4">
                        <div className="flex items-center text-gray-700">
                            <img
                                className="w-16 h-16 mr-4"
                                src="https://img.icons8.com/nolan/64/shopping-cart-loaded.png"
                                alt="Shopping Cart"
                            />
                            <div>
                                <p className="text-lg font-semibold">{getPayment.name}</p>
                                <p className="text-green-600">Owes you +${getPayment.totalAmt}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <ul className="list-none">
                                {
                                    getPayment.groups.map((group) => (
                                        <li className="bg-gray-50 p-2 rounded-md my-2 text-gray-600" key={group.id}>
                                            {getPayment.name} owes you +${group.amt} for "{group.group}"
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recieve;