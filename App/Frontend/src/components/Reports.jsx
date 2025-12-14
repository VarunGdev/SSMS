// src/components/Reports.js
import React from 'react';
import { FaChartLine, FaCalendarAlt } from 'react-icons/fa';

const ReportCard = ({ title, content }) => (
    <div className="bg-dark-surface p-6 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2 text-primary-blue">{title}</h3>
        {content}
    </div>
);

function Reports() {
    const ChartPlaceholder = ({ label }) => (
        <div className="h-48 flex items-center justify-center bg-gray-800 rounded-lg text-gray-500 border border-gray-700">
            {label} Chart Placeholder
        </div>
    );

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-6 flex items-center"><FaChartLine className="mr-3 text-accent-green" /> Real-Time Reports</h2>

            {/* Date Range Picker */}
            <div className="bg-dark-surface p-6 rounded-xl shadow-xl border border-gray-700 mb-8 flex gap-4 items-center">
                <FaCalendarAlt className="text-gray-400 text-xl" />
                <label className="text-gray-300">Start Date:</label>
                <input type="date" className="bg-gray-800 p-2 rounded-lg" defaultValue="2025-11-01" />
                <label className="text-gray-300">End Date:</label>
                <input type="date" className="bg-gray-800 p-2 rounded-lg" defaultValue="2025-12-14" />
                <button className="ml-auto px-5 py-2 bg-primary-blue text-white rounded-lg hover:bg-opacity-90">Generate Report</button>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                
                <ReportCard 
                    title="Daily Sales Trend" 
                    content={<ChartPlaceholder label="Line" />}
                />

                <ReportCard 
                    title="Sales by Category" 
                    content={<ChartPlaceholder label="Pie" />}
                />

                <ReportCard 
                    title="Low Stock Items" 
                    content={
                        <ul className="list-disc list-inside text-accent-red font-medium">
                            <li>Kaju Katli (3 Kg left)</li>
                            <li>Mori Papdi (5 packets left)</li>
                        </ul>
                    }
                />

                <ReportCard 
                    title="Top 5 Selling Items" 
                    content={<ChartPlaceholder label="Bar" />}
                />
                
            </div>
        </div>
    );
}

export default Reports;