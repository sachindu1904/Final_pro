
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OwnerSidebar from '@/components/owner/OwnerSidebar';
import OwnerDashboard from '@/components/owner/OwnerDashboard';
import ListingManagement from '@/components/owner/ListingManagement';
import CreatePromotion from '@/components/owner/CreatePromotion';
import ReviewManagement from '@/components/owner/ReviewManagement';
import PerformanceAnalytics from '@/components/owner/PerformanceAnalytics';

const HiddenGemsOwnerPortal: React.FC = () => {
  // In a real app, we would check authentication here
  const ownerData = {
    name: "Chaminda Perera",
    business: "Ella Forest Retreat",
    email: "chaminda@ellaretreat.lk",
    phone: "+94 77 123 4567",
    profileImage: "https://randomuser.me/api/portraits/men/42.jpg",
    verified: true,
    memberSince: "2023",
    currentEarnings: 12500,
    pendingPayouts: 8000,
    commissionRate: 7.5
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OwnerSidebar owner={ownerData} />
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<OwnerDashboard owner={ownerData} />} />
            <Route path="/listings" element={<ListingManagement />} />
            <Route path="/promotions" element={<CreatePromotion />} />
            <Route path="/reviews" element={<ReviewManagement />} />
            <Route path="/analytics" element={<PerformanceAnalytics />} />
            <Route path="*" element={<Navigate to="/hidden-gems-owner-portal" />} />
          </Routes>
        </div>
        
        <footer className="py-6 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Eventuraa.lk - Hidden Gems Owner Portal
        </footer>
      </div>
    </div>
  );
};

export default HiddenGemsOwnerPortal;
