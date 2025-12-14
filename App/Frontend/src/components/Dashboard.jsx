// src/components/Dashboard.js
import React from 'react';
import { FaDollarSign, FaShoppingCart, FaMoneyCheckAlt, FaBoxes } from 'react-icons/fa';

// --- Reusable Dashboard Card Component ---
const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  // Changed bg-dark-surface to bg-white and border-gray-700 to light-border
  <div className="bg-white p-6 rounded-xl shadow-md border border-light-border hover:border-primary-blue transition duration-300">
    <div className={`flex items-center justify-between p-2 rounded-full w-12 h-12 mb-3 ${colorClass} bg-opacity-20`}>
      <Icon className={`text-2xl ${colorClass}`} />
    </div>
    {/* Changed text-gray-400 to secondary-text */}
    <p className="text-secondary-text text-sm">{title}</p>
    {/* Changed text-white to dark-text */}
    <h3 className="text-3xl font-bold mt-1 text-dark-text">{value}</h3>
  </div>
);

function Dashboard() {
  return (
    <div className="dashboard-view">
      <h2 className="text-3xl font-semibold mb-6 text-dark-text">📊 Dashboard Overview</h2>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* StatCard usage remains the same */}
        <StatCard title="Sales Today" value="$1325.00" icon={FaDollarSign} colorClass="text-accent-green" />
        <StatCard title="POS Today" value="14 Bills" icon={FaShoppingCart} colorClass="text-primary-blue" />
        <StatCard title="Bank Balance" value="$98732.00" icon={FaMoneyCheckAlt} colorClass="text-indigo-600" />
        <StatCard title="Items in Stock" value="36 Items" icon={FaBoxes} colorClass="text-yellow-600" />
      </div>

      {/* Two-Column Layout for Tables/Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Latest Entries Table */}
        {/* Changed bg-dark-surface to bg-white */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-light-border">
          <h3 className="text-xl font-semibold mb-4 text-dark-text">Latest Entries</h3>
          <table className="min-w-full table-auto text-sm text-dark-text">
            {/* Changed text-gray-400 to secondary-text and border-gray-700 to light-border */}
            <thead className="text-secondary-text border-b border-light-border">
              <tr>
                <th className="py-2 text-left">Date</th>
                <th className="py-2 text-left">Party</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* Changed border-gray-800 to light-border and hover:bg-gray-800 to hover:bg-gray-50 */}
              <tr className="border-b border-light-border hover:bg-gray-50 transition">
                <td className="py-2">06-12-2020</td>
                <td className="py-2">Deepika Sadu</td>
                <td className="py-2 text-right text-accent-green">$1325.00</td>
              </tr>
              <tr className="border-b border-light-border hover:bg-gray-50 transition">
                <td className="py-2">06-12-2020</td>
                <td className="py-2">Cash</td>
                <td className="py-2 text-right text-accent-green">$570.00</td>
              </tr>
            </tbody>
          </table>
          <button className="mt-4 text-primary-blue hover:underline text-sm font-medium">View All Entries</button>
        </div>

        {/* Charts/Top Products */}
        {/* Changed bg-dark-surface to bg-white */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border border-light-border">
          <h3 className="text-xl font-semibold mb-4 text-dark-text">Top Selling Products</h3>
          {/* Changed bg-gray-800 to light-bg and text-gray-500 to secondary-text */}
          <div className="h-64 flex items-center justify-center bg-light-bg rounded-lg text-secondary-text border border-light-border">
            Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;