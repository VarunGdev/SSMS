// src/components/Promotions.js
import React, { useState } from 'react';
import { FaPlus, FaTag, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function Promotions() {
    const [promotions, setPromotions] = useState([
        { id: 1, name: 'Diwali 10% Off', type: 'Percentage', value: 10, minPurchase: 500, status: 'Active' },
        { id: 2, name: 'Buy 2 Kaju Katli, Get 1 Free', type: 'BOGO', value: '1 Free', minPurchase: 0, status: 'Expired' },
    ]);

    const [newPromo, setNewPromo] = useState({ name: '', type: 'Percentage', value: 0, minPurchase: 0 });

    const handleCreatePromo = () => {
        // Simple add logic
        setPromotions([...promotions, { ...newPromo, id: promotions.length + 1, status: 'Active' }]);
        setNewPromo({ name: '', type: 'Percentage', value: 0, minPurchase: 0 });
    };

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-6 flex items-center"><FaGift className="mr-3 text-yellow-400" /> Offers & Promotions</h2>

            {/* Create New Promotion Form */}
            <div className="bg-dark-surface p-6 rounded-xl shadow-xl border border-gray-700 mb-8">
                <h3 className="text-xl font-medium mb-4">Create New Promotion</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                    <input name="name" placeholder="Promotion Name (e.g., Summer Sale)" value={newPromo.name} onChange={(e) => setNewPromo({...newPromo, name: e.target.value})} className="col-span-2 bg-gray-800 p-2" />
                    
                    <select name="type" onChange={(e) => setNewPromo({...newPromo, type: e.target.value})} className="bg-gray-800 p-2 text-gray-300">
                        <option value="Percentage">Percentage Off</option>
                        <option value="Fixed">Fixed Amount Off</option>
                        <option value="BOGO">Buy X Get Y</option>
                    </select>

                    <input name="value" type="number" placeholder="Value (e.g., 10 or 50)" value={newPromo.value} onChange={(e) => setNewPromo({...newPromo, value: parseFloat(e.target.value)})} className="bg-gray-800 p-2" />
                    <input name="minPurchase" type="number" placeholder="Min Purchase $" value={newPromo.minPurchase} onChange={(e) => setNewPromo({...newPromo, minPurchase: parseFloat(e.target.value)})} className="bg-gray-800 p-2" />
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={handleCreatePromo} className="px-5 py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-opacity-90 flex items-center">
                        <FaPlus className="mr-2" /> Activate Promotion
                    </button>
                </div>
            </div>

            {/* Active Promotions Table */}
            <div className="bg-dark-surface rounded-xl shadow-lg border border-gray-700 overflow-hidden">
                <h3 className="text-xl font-semibold p-4 border-b border-gray-700">Active Offers</h3>
                <table className="min-w-full text-sm text-white">
                    <thead className="bg-gray-700 text-gray-300 uppercase">
                        <tr>
                            <th className="py-3 px-4 text-left">Promotion Name</th>
                            <th className="py-3 px-4 text-left">Type</th>
                            <th className="py-3 px-4 text-right">Value</th>
                            <th className="py-3 px-4 text-right">Min Purchase</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promotions.map((promo) => (
                            <tr key={promo.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                                <td className="py-3 px-4 font-medium">{promo.name}</td>
                                <td className="py-3 px-4 text-primary-blue">{promo.type}</td>
                                <td className="py-3 px-4 text-right">{promo.value}{promo.type === 'Percentage' ? '%' : ''}</td>
                                <td className="py-3 px-4 text-right">${promo.minPurchase.toFixed(2)}</td>
                                <td className="py-3 px-4 text-center">
                                    {promo.status === 'Active' ? 
                                        <FaCheckCircle className="text-accent-green inline" /> : 
                                        <FaTimesCircle className="text-accent-red inline" />}
                                </td>
                                <td className="py-3 px-4 text-center space-x-2">
                                    <button title="Edit" className="text-primary-blue hover:text-white"><FaEdit /></button>
                                    <button title="Toggle Status" className="text-gray-400 hover:text-white"><FaTag /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Promotions;