
import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { PaymentMethodCardProps } from './types';

const PayPalCard = (props: PaymentMethodCardProps) => (
  <PaymentMethodCard {...props} name="PayPal">
    <div className="text-[#003087] font-bold text-lg">Pay<span className="text-[#009cde]">Pal</span></div>
  </PaymentMethodCard>
);

export default PayPalCard;
