
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EZCashForm = () => {
  return (
    <div className="mt-6 border rounded-md p-6 bg-white">
      <div className="text-red-600 font-bold text-2xl mb-4 text-center">eZ Cash</div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input
            id="mobileNumber"
            placeholder="+94 7XX XXX XXX"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="pin">PIN</Label>
          <Input
            id="pin"
            type="password"
            placeholder="Enter your PIN"
            className="mt-1"
          />
        </div>
        <p className="text-sm text-gray-500">You will receive a verification code on your phone to complete the payment.</p>
      </div>
    </div>
  );
};

export default EZCashForm;
