
import React from 'react';
import { PaymentMethod } from './payment/types';
import VisaCard from './payment/VisaCard';
import MastercardCard from './payment/MastercardCard';
import PayPalCard from './payment/PayPalCard';
import EZCashCard from './payment/EZCashCard';
import UnionPayCard from './payment/UnionPayCard';
import AlipayCard from './payment/AlipayCard';
import CardForm from './payment/CardForm';
import PayPalForm from './payment/PayPalForm';
import EZCashForm from './payment/EZCashForm';
import AlipayForm from './payment/AlipayForm';
import UnionPayForm from './payment/UnionPayForm';

interface PaymentMethodSelectorProps {
  onPaymentMethodSelect: (method: PaymentMethod) => void;
  selectedMethod: PaymentMethod;
}

const PaymentMethodSelector = ({ 
  onPaymentMethodSelect, 
  selectedMethod 
}: PaymentMethodSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <VisaCard
          isSelected={selectedMethod === 'visa'} 
          onClick={() => onPaymentMethodSelect('visa')}
        />
        
        <MastercardCard
          isSelected={selectedMethod === 'mastercard'} 
          onClick={() => onPaymentMethodSelect('mastercard')}
        />
        
        <PayPalCard
          isSelected={selectedMethod === 'paypal'} 
          onClick={() => onPaymentMethodSelect('paypal')}
        />
        
        <EZCashCard
          isSelected={selectedMethod === 'ezCash'} 
          onClick={() => onPaymentMethodSelect('ezCash')}
        />
        
        <UnionPayCard
          isSelected={selectedMethod === 'unionpay'} 
          onClick={() => onPaymentMethodSelect('unionpay')}
        />
        
        <AlipayCard
          isSelected={selectedMethod === 'alipay'} 
          onClick={() => onPaymentMethodSelect('alipay')}
        />
      </div>
      
      {(selectedMethod === 'visa' || selectedMethod === 'mastercard' || selectedMethod === 'unionpay') && (
        <CardForm 
          logo={
            selectedMethod === 'visa' ? (
              <div className="bg-[#1A1F71] text-white font-bold italic text-xl px-2 py-1 rounded mr-2">VISA</div>
            ) : selectedMethod === 'mastercard' ? (
              <div className="flex items-center mr-2">
                <div className="w-6 h-6 bg-red-500 rounded-full opacity-80 mr-[-8px]"></div>
                <div className="w-6 h-6 bg-yellow-500 rounded-full opacity-80"></div>
              </div>
            ) : (
              <div className="text-[#00447c] font-bold text-base border border-[#00447c] px-1 py-0.5 rounded mr-2">
                UnionPay
              </div>
            )
          }
        />
      )}
      
      {selectedMethod === 'paypal' && <PayPalForm />}
      {selectedMethod === 'ezCash' && <EZCashForm />}
      {selectedMethod === 'alipay' && <AlipayForm />}
      {selectedMethod === 'unionpay' && <UnionPayForm />}
    </div>
  );
};

export default PaymentMethodSelector;
