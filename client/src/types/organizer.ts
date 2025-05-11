import { Company } from './company';

export interface Organizer {
  _id: string;
  user: string;
  company: Company;
  firstName: string;
  lastName: string;
  position: string;
  phoneNumber: string;
  profilePicture?: string;
  bio?: string;
  isVerified: boolean;
  verificationDocuments?: string[];
  createdAt: string;
  updatedAt: string;
} 