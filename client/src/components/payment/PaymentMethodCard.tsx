
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import { PaymentMethodCardProps } from './types';

interface Props extends PaymentMethodCardProps {
  children: ReactNode;
}

const PaymentMethodCard = ({ isSelected, onClick, name, children }: Props) => (
  <div 
    className={cn(
      "border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all relative",
      isSelected 
        ? "border-[#1A3A63] bg-blue-50" 
        : "border-gray-200 hover:border-gray-300"
    )}
    onClick={onClick}
  >
    <div className="h-10 w-full flex items-center justify-center">
      {children}
    </div>
    <span className="text-sm mt-2">{name}</span>
    {isSelected && (
      <CheckCircle className="h-5 w-5 text-green-500 absolute top-2 right-2" />
    )}
  </div>
);

export default PaymentMethodCard;
