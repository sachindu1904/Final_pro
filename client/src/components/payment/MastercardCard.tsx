
import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { PaymentMethodCardProps } from './types';

const MastercardCard = (props: PaymentMethodCardProps) => (
  <PaymentMethodCard {...props} name="Mastercard">
    <div className="flex items-center">
      <div className="w-6 h-6 bg-red-500 rounded-full opacity-80 mr-[-8px]"></div>
      <div className="w-6 h-6 bg-yellow-500 rounded-full opacity-80"></div>
    </div>
  </PaymentMethodCard>
);

export default MastercardCard;
