
import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { PaymentMethodCardProps } from './types';

const UnionPayCard = (props: PaymentMethodCardProps) => (
  <PaymentMethodCard {...props} name="China Union Pay">
    <div className="text-[#00447c] font-bold text-base border border-[#00447c] px-1 py-0.5 rounded">
      UnionPay
    </div>
  </PaymentMethodCard>
);

export default UnionPayCard;
