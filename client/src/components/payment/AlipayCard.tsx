
import React from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { PaymentMethodCardProps } from './types';

const AlipayCard = (props: PaymentMethodCardProps) => (
  <PaymentMethodCard {...props} name="Alipay">
    <div className="text-[#00a0e9] font-bold text-base">
      Alipay
    </div>
  </PaymentMethodCard>
);

export default AlipayCard;
