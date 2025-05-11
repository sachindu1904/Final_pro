
import React from 'react';

const AlipayForm = () => {
  return (
    <div className="mt-6 border rounded-md p-6 bg-white text-center">
      <div className="text-[#00a0e9] font-bold text-2xl mb-4">Alipay</div>
      <div className="border-4 border-gray-200 inline-block p-4 mx-auto mb-6">
        <div className="bg-gray-200 w-48 h-48 flex items-center justify-center">
          QR Code
        </div>
      </div>
      <p className="text-gray-600">Scan the QR code with the Alipay app to complete your payment.</p>
      <p className="mt-4 text-sm text-gray-500">For assistance, please contact our support team.</p>
    </div>
  );
};

export default AlipayForm;
