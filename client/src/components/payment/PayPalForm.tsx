
import React from 'react';

const PayPalForm = () => {
  return (
    <div className="mt-6 border rounded-md p-6 bg-white text-center">
      <div className="text-[#003087] font-bold text-2xl mb-4">Pay<span className="text-[#009cde]">Pal</span></div>
      <p className="text-gray-600 mb-6">Click the button below to securely pay with PayPal.</p>
      <button className="bg-[#0070ba] hover:bg-[#003087] text-white py-3 px-6 rounded-md w-full transition-colors">
        Continue to PayPal
      </button>
      <p className="mt-4 text-sm text-gray-500">You will be redirected to PayPal to complete your payment securely.</p>
    </div>
  );
};

export default PayPalForm;
