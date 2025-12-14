// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaCashRegister, FaListAlt, FaHistory, FaGift, FaChartLine } from 'react-icons/fa';

// Import Components
import Dashboard from './components/Dashboard';
import POS from './components/POS';
import ItemManagement from './components/ItemManagement';
import CustomerHistory from './components/CustomerHistory'; 
import Promotions from './components/Promotions';           
import Reports from './components/Reports';                 

// --- NavLink Helper Component ---
const SideNavLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  // Adjusted classes for light background
  const activeClass = isActive 
    ? "bg-primary-blue text-black shadow-lg focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75"
    : "text-secondary-text hover:bg-gray-100 hover:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50 active:bg-gray-200 active:text-dark-text";

  return (
    <li className="mb-2">
      <Link to={to} className={`flex items-center p-3 rounded-lg font-medium transition duration-150 ${activeClass}`}>
        <Icon className="mr-3 text-lg" />
        {label}
      </Link>
    </li>
  );
};

// --- Navigation Bar Component ---
const SideNav = () => {
  return (
    // Changed bg-dark-surface to bg-white
    <div className="w-64 bg-white p-6 shadow-xl flex-shrink-0 min-h-screen border-r border-light-border">
      <h2 className="text-2xl font-semibold text-primary-blue mb-8">Manan's Sweets</h2>
      <nav>
        <ul>
          <SideNavLink to="/" icon={FaTachometerAlt} label="Dashboard" />
          <SideNavLink to="/pos" icon={FaCashRegister} label="POS (Point of Sale)" />
          <SideNavLink to="/items" icon={FaListAlt} label="Item Management" />
          
          <div className="my-6 border-t border-light-border"></div>

          <SideNavLink to="/history" icon={FaHistory} label="Customer History" />
          <SideNavLink to="/promotions" icon={FaGift} label="Offers & Promotions" />
          <SideNavLink to="/reports" icon={FaChartLine} label="Real-Time Reports" />
        </ul>
      </nav>
    </div>
  );
};

// --- Main Application Component ---
function App() {
  return (
    <Router>
      {/* 🚨 CRITICAL CHANGE: bg-light-bg and text-dark-text 🚨 */}
      <div className="flex bg-light-bg text-dark-text min-h-screen font-sans">
        <SideNav />
        <main className="flex-grow p-8">
          {/* Header text color changed to match secondary text */}
          <header className="pb-4 mb-8 border-b border-light-border">
            <h1 className="text-2xl font-light text-secondary-text">Sweet Shop Management System</h1>
          </header>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pos" element={<POS />} />
            <Route path="/items" element={<ItemManagement />} />
            <Route path="/history" element={<CustomerHistory />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;