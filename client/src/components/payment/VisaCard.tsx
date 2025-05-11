
import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { PaymentMethodCardProps } from './types';

const VisaCard = (props: PaymentMethodCardProps) => (
  <PaymentMethodCard {...props} name="Visa Card">
    <div className="bg-[#1A1F71] text-white font-bold italic text-xl px-2 py-1 rounded">VISA</div>
  </PaymentMethodCard>
);

export default VisaCard;
