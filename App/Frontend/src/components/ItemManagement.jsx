// src/components/ItemManagement.js
import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';

function ItemManagement() {
  const categories = ['All', 'Namkeen', 'Mithai', 'Sweets'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [items, setItems] = useState([
    { id: 1, name: 'Bhakarwadi 500Gm', hsn: '1905', salePrice: 100.00, mrp: 120.00, opBal: 20, opVal: 6000.00, category: 'Namkeen', img: 'https://via.placeholder.com/50/FFD700/000000?text=S1' },
    { id: 2, name: 'Kaju Katli', hsn: '1905', salePrice: 800.00, mrp: 900.00, opBal: 10, opVal: 8000.00, category: 'Mithai', img: 'https://via.placeholder.com/50/FFC0CB/000000?text=S2' },
  ]);

  const [newItem, setNewItem] = useState({
    name: '', hsn: '', tax: 5, unit: 'Kg', salePrice: 0, mrp: 0, category: 'Namkeen', img: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const addItem = () => {
    if (newItem.name && newItem.salePrice > 0) {
      setItems([...items, { ...newItem, id: items.length + 1, opBal: 0, opVal: 0.00, img: newItem.img || 'https://via.placeholder.com/50/AAAAAA/FFFFFF?text=New' }]);
      setNewItem({ name: '', hsn: '', tax: 5, unit: 'Kg', salePrice: 0, mrp: 0, category: 'Namkeen', img: '' }); 
    }
  };

  const filteredItems = items
    .filter(item => activeCategory === 'All' || item.category === activeCategory)
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.hsn.includes(searchTerm)
    );

  return (
    <div className="item-management-view">
      <h2 className="text-3xl font-semibold mb-6">📦 Item Management & Inventory</h2>

      {/* --- Add New Item Form --- */}
      <div className="bg-dark-surface p-6 rounded-xl shadow-xl border border-primary-blue/50 mb-8">
        <h3 className="text-xl font-medium mb-4 text-primary-blue">New Item Details</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input name="name" value={newItem.name} onChange={handleInputChange} placeholder="Item Name" className="col-span-2 bg-gray-800 p-2" />
          <input name="hsn" value={newItem.hsn} onChange={handleInputChange} placeholder="HSN Code" className="bg-gray-800 p-2" />
          <input name="img" value={newItem.img} onChange={handleInputChange} placeholder="Image URL (Optional)" className="bg-gray-800 p-2" />
          
          <select name="category" onChange={handleInputChange} className="bg-gray-800 p-2 text-gray-300">
            {categories.slice(1).map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select name="unit" onChange={handleInputChange} className="bg-gray-800 p-2 text-gray-300">
            <option value="Kg">Kg</option>
            <option value="Pcs">Pcs</option>
          </select>
          <input name="salePrice" type="number" value={newItem.salePrice} onChange={handleInputChange} placeholder="Sale Price" className="bg-gray-800 p-2 text-accent-green" />
          <input name="mrp" type="number" value={newItem.mrp} onChange={handleInputChange} placeholder="MRP" className="bg-gray-800 p-2" />
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={addItem} className="px-5 py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-opacity-90 flex items-center">
            <FaPlus className="mr-2" /> Save New Sweet
          </button>
        </div>
      </div>

      {/* --- Item List Controls --- */}
      <div className="flex justify-between items-center mb-4 p-4 bg-dark-surface rounded-xl border border-gray-700">
          <div className="flex space-x-2 items-center">
              <FaFilter className="text-primary-blue" />
              {categories.map(cat => (
                  <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 text-sm rounded-full transition ${activeCategory === cat ? 'bg-primary-blue text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                      {cat}
                  </button>
              ))}
          </div>
          <div className="relative">
              <input 
                type="text" 
                placeholder="Search Items" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 p-2 pl-10 rounded-lg w-64" 
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
      </div>
      
      {/* --- Item List Table --- */}
      <div className="bg-dark-surface rounded-xl shadow-lg border border-gray-700 overflow-hidden">
        <table className="min-w-full text-sm">
            <thead className="bg-gray-700 text-gray-300 uppercase">
                <tr>
                    <th className="py-3 px-4 text-left"></th>
                    <th className="py-3 px-4 text-left">Item Name</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-right">Sale Price</th>
                    <th className="py-3 px-4 text-right">Stock</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                        <td className="py-3 px-4"><img src={item.img} alt={item.name} className="w-8 h-8 rounded-full object-cover" /></td>
                        <td className="py-3 px-4 font-medium">{item.name}</td>
                        <td className="py-3 px-4 text-gray-400">{item.category}</td>
                        <td className="py-3 px-4 text-right text-accent-green">${item.salePrice.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right font-bold">{item.opBal} {item.unit}</td>
                        <td className="py-3 px-4 text-center space-x-2">
                            <button title="Edit" className="text-primary-blue hover:text-white"><FaEdit /></button>
                            <button title="Delete" className="text-accent-red hover:text-white"><FaTrash /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemManagement;