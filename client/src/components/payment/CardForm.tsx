
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form } from '@/components/ui/form';

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be at least 16 digits'),
  cardHolder: z.string().min(3, 'Please enter card holder name'),
  expiryDate: z.string().min(5, 'Please enter a valid expiry date (MM/YY)'),
  cvv: z.string().min(3, 'CVV must be at least 3 digits'),
});

interface CardFormProps {
  logo: React.ReactNode;
}

const CardForm = ({ logo }: CardFormProps) => {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const formatCardNumber = (value: string) => {
    // Remove spaces and non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length >= 3) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    } else if (digits.length === 2) {
      return `${digits}/`;
    }
    
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    form.setValue('cardNumber', formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    form.setValue('expiryDate', formatted);
  };

  return (
    <div className="mt-6 border rounded-md p-4 bg-white">
      <h4 className="font-medium mb-4 flex items-center">
        {logo}
        Card Details
      </h4>
      
      <Form {...form}>
        <form className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={form.watch('cardNumber')}
                onChange={handleCardNumberChange}
                maxLength={19}
                className="mt-1"
              />
              {form.formState.errors.cardNumber && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.cardNumber.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="cardHolder">Cardholder Name</Label>
              <Input
                id="cardHolder"
                placeholder="John Smith"
                {...form.register('cardHolder')}
                className="mt-1"
              />
              {form.formState.errors.cardHolder && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.cardHolder.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={form.watch('expiryDate')}
                  onChange={handleExpiryDateChange}
                  maxLength={5}
                  className="mt-1"
                />
                {form.formState.errors.expiryDate && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.expiryDate.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  maxLength={4}
                  {...form.register('cvv')}
                  className="mt-1"
                />
                {form.formState.errors.cvv && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.cvv.message}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span className="text-sm text-gray-600">Your payment is secured with SSL encryption</span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CardForm;
