
import React from 'react';

const UnionPayForm = () => {
  return (
    <div className="mt-6 border rounded-md p-4 bg-white">
      <div className="mb-4 flex items-center">
        <div className="text-[#00447c] font-bold text-base border border-[#00447c] px-1 py-0.5 rounded mr-2">
          UnionPay
        </div>
        <h4 className="font-medium">Card Details</h4>
      </div>
      
      <div className="bg-blue-50 p-3 rounded mb-4 border border-blue-100">
        <p className="text-sm text-blue-800 flex items-start">
          <svg className="h-5 w-5 mr-2 mt-0.5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          All UnionPay cards are accepted. No additional fees for international transactions.
        </p>
      </div>
    </div>
  );
};

export default UnionPayForm;
