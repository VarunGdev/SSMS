// src/components/CustomerHistory.js
import React, { useState } from 'react';
import { FaHistory, FaSearch, FaUser } from 'react-icons/fa';

function CustomerHistory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [customer, setCustomer] = useState(null); // Current customer data

    // Mock data for search
    const mockCustomer = {
        name: 'Deepika Sadu',
        phone: '9876543210',
        totalSpend: 5400.50,
        history: [
            { id: 91, date: '06-Dec-2020', total: 1325.00, items: 'Bhakarwadi, Namkeen Mix' },
            { id: 85, date: '01-Dec-2020', total: 100.00, items: 'Mori Papdi' },
        ]
    };

    const handleSearch = () => {
        // In a real app, this would be an API call
        if (searchTerm.length >= 5) {
            setCustomer(mockCustomer);
        } else {
            setCustomer(null);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-6 flex items-center"><FaHistory className="mr-3 text-indigo-400" /> Customer Purchase History</h2>

            {/* Search Bar */}
            <div className="bg-dark-surface p-6 rounded-xl shadow-xl border border-gray-700 mb-8 flex gap-4 text-white">
                <div className="relative grow">
                    <input 
                        type="text" 
                        placeholder="Search by Phone Number or Name" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-800 p-3 pl-10 rounded-lg w-full" 
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button onClick={handleSearch} className="px-6 py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-opacity-90 flex items-center">
                    Search
                </button>
            </div>

            {/* Customer Details and History */}
            {customer && (
                <div className="bg-dark-surface p-6 rounded-xl shadow-lg border border-primary-blue/50">
                    <h3 className="text-2xl font-semibold mb-4 flex items-center text-primary-blue"><FaUser className="mr-2" /> {customer.name}</h3>
                    <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                        <p>Phone: <span className="font-bold text-white">{customer.phone}</span></p>
                        <p>Total Spend: <span className="font-bold text-accent-green">${customer.totalSpend.toFixed(2)}</span></p>
                        <p>Total Bills: <span className="font-bold text-white">{customer.history.length}</span></p>
                    </div>

                    <h4 className="text-xl font-medium mb-3 border-t border-gray-700 pt-4">Recent Bills</h4>
                    <table className="min-w-full text-sm text-white">
                        <thead className="bg-gray-700 text-gray-300 uppercase">
                            <tr>
                                <th className="py-3 px-4 text-left">Bill ID</th>
                                <th className="py-3 px-4 text-left">Date</th>
                                <th className="py-3 px-4 text-left">Items Purchased</th>
                                <th className="py-3 px-4 text-right">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.history.map((bill) => (
                                <tr key={bill.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                                    <td className="py-3 px-4 text-primary-blue">{bill.id}</td>
                                    <td className="py-3 px-4">{bill.date}</td>
                                    <td className="py-3 px-4 text-gray-400">{bill.items}</td>
                                    <td className="py-3 px-4 text-right font-semibold">${bill.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CustomerHistory;