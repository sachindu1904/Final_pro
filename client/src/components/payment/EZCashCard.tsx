
import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { PaymentMethodCardProps } from './types';

const EZCashCard = (props: PaymentMethodCardProps) => (
  <PaymentMethodCard {...props} name="Mobile Money">
    <div className="text-red-600 font-bold text-lg">eZ Cash</div>
  </PaymentMethodCard>
);

export default EZCashCard;
