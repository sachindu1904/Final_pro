export interface Company {
  _id: string;
  name: string;
  registrationNumber: string;
  businessType: 'sole_proprietorship' | 'partnership' | 'private_limited' | 'public_limited';
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  contactEmail: string;
  contactPhone: string;
  website?: string;
  logo?: string;
  description?: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
} 