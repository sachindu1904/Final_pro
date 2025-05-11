
export type PaymentMethod = 'visa' | 'mastercard' | 'paypal' | 'ezCash' | 'unionpay' | 'alipay';

export interface PaymentMethodCardProps {
  isSelected: boolean;
  onClick: () => void;
  name: string;
}
