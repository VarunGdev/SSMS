// src/components/POS.js
import React, { useState } from 'react';
import { FaPlus, FaSave, FaPrint, FaTimes, FaCreditCard, FaWallet, FaReceipt } from 'react-icons/fa';
// Uncomment and install these packages for PDF export:
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// --- Payment Modal Component (Unchanged) ---
const PaymentModal = ({ total, isOpen, onClose }) => {
    // ... (Modal implementation from previous response, simplified for brevity)
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-dark-surface p-8 rounded-xl shadow-2xl w-full max-w-lg border border-gray-700">
                <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
                    <h3 className="text-xl font-semibold text-primary-blue">💳 PAYMENT OPTIONS</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition"><FaTimes className="text-2xl" /></button>
                </div>
                <p className="text-white text-lg mb-4">Total Payable: <span className="text-accent-green font-bold">${total.toFixed(2)}</span></p>
                <div className="flex justify-end mt-8">
                    <button onClick={onClose} className="px-6 py-2 bg-primary-blue text-white font-semibold rounded-lg hover:bg-opacity-90 transition shadow-md">OK</button>
                </div>
            </div>
        </div>
    );
};

// --- PDF Bill Content Component (For Print) ---
const BillContent = ({ items, total }) => (
    <div id="bill-content" className="p-8 bg-white text-black w-full max-w-md mx-auto print:block hidden">
        <h1 className="text-center text-xl font-bold mb-4">Manan's Sweet N Namkeen</h1>
        <p className="text-center text-sm mb-4">A/12, Shrenik Park, Opp. Jain Temple, Vadodara</p>
        <div className="border-t border-b border-gray-400 py-2 mb-4 text-sm flex justify-between">
            <span>Bill No.: 93 | Date: 14-12-2025</span>
            <span>Customer: Cash</span>
        </div>
        <table className="w-full text-sm border-collapse">
            <thead>
                <tr>
                    <th className="border-b border-gray-300 pb-1 text-left">Description</th>
                    <th className="border-b border-gray-300 pb-1 text-right">Qty</th>
                    <th className="border-b border-gray-300 pb-1 text-right">Rate</th>
                    <th className="border-b border-gray-300 pb-1 text-right">Amount</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td className="text-right">{item.qty}</td>
                        <td className="text-right">{item.rate.toFixed(2)}</td>
                        <td className="text-right">{(item.rate * item.qty).toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="border-t border-b border-black mt-4 pt-2 text-right text-lg font-bold">
            Net Amount: {total.toFixed(2)}
        </div>
        <p className="text-center text-xs mt-4">Thanks for your kind visit!</p>
    </div>
);


// --- Main POS Component ---
function POS() {
  const [items, setItems] = useState([
    { id: 1, name: 'Bhakarwadi 500Gm', qty: 2, rate: 120.00, tax: 5, total: 240.00 },
  ]);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const calculateTotal = () => items.reduce((sum, item) => sum + item.total, 0);
  
  // NOTE: For PDF export, you must install html2canvas and jspdf.
  const handlePrint = () => {
    // Check if the required libraries are installed/available
    // if (window.html2canvas && window.jsPDF) { 
    //   const input = document.getElementById('bill-content');
    //   html2canvas(input, { scale: 2 }).then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF('p', 'mm', [70, 100]); // Receipt size (approx)
    //     const width = pdf.internal.pageSize.getWidth();
    //     const height = (canvas.height * width) / canvas.width;
    //     pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    //     pdf.save("sweet_shop_bill.pdf");
    //     console.log("PDF Exported!");
    //   });
    // } else {
      setPaymentModalOpen(true);
      alert("PDF Export Feature Requires npm install html2canvas jspdf");
    // }
  };


  return (
    <div className="pos-view">
      <h2 className="text-3xl font-semibold mb-6">🛒 Point of Sale (POS)</h2>

      {/* Item Entry Bar */}
      <div className="flex gap-4 mb-6 p-4 bg-dark-surface rounded-xl border border-gray-700">
        <input type="text" placeholder="Scan Item / Barcode" className="grow bg-white border-gray-700 p-3 rounded-md" />
        <button className="bg-accent-green text-white px-5 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center">
          <FaPlus className="mr-2" /> Add
        </button>
      </div>

      {/* POS Item Table */}
      <div className="bg-dark-surface rounded-xl overflow-hidden shadow-lg border border-gray-700">
        <table className="min-w-full text-sm text-black">
          <thead className="bg-gray-700 text-gray-300 uppercase">
            <tr>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Qty</th>
              <th className="py-3 px-4 text-right">Rate</th>
              <th className="py-3 px-4 text-right">Total Amt</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-gray-800 hover:bg-gray-800 hover:text-white transition">
                <td className="py-3 px-4 font-medium">{item.name}</td>
                <td className="py-3 px-4">{item.qty}</td>
                <td className="py-3 px-4 text-right">${item.rate.toFixed(2)}</td>
                <td className="py-3 px-4 text-right font-semibold text-accent-green">${(item.total * 1.05).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* POS Footer (Totals and Buttons) */}
      <div className="flex justify-between items-center mt-6 p-4 bg-dark-surface rounded-xl shadow-inner border-t border-gray-700">
        <div className="text-xl font-bold">
          Net Bill: <span className="text-primary-blue">${calculateTotal().toFixed(2)}</span>
        </div>
        <div className="flex space-x-4">
          <button className="px-6 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-600 transition flex items-center">
            <FaSave className="mr-2" /> Save
          </button>
          <button 
            onClick={handlePrint} 
            className="px-6 py-2 bg-primary-blue text-black rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center shadow-lg"
          >
            <FaPrint className="mr-2" /> Print & PDF
          </button>
        </div>
      </div>

      <PaymentModal total={calculateTotal()} isOpen={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} />
      
      {/* Hidden component used only for PDF generation */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
          <BillContent items={items} total={calculateTotal()} />
      </div>

    </div>
  );
}

export default POS;