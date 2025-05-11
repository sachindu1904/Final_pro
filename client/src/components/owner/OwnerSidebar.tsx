
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, BarChart2, Home, MessageSquare, FileText, Settings, LogOut, Image, Percent } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';

type OwnerType = {
  name: string;
  business: string;
  email: string;
  phone: string;
  profileImage: string;
  verified: boolean;
  memberSince: string;
  currentEarnings: number;
  pendingPayouts: number;
  commissionRate: number;
};

interface OwnerSidebarProps {
  owner: OwnerType;
}

const OwnerSidebar: React.FC<OwnerSidebarProps> = ({ owner }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast.success('Successfully logged out');
    navigate('/');
  };

  const menuItems = [
    { icon: <Home className="w-5 h-5" />, text: 'Dashboard', path: '/hidden-gems-owner-portal' },
    { icon: <Image className="w-5 h-5" />, text: 'Manage Listings', path: '/hidden-gems-owner-portal/listings' },
    { icon: <Percent className="w-5 h-5" />, text: 'Special Offers', path: '/hidden-gems-owner-portal/promotions' },
    { icon: <MessageSquare className="w-5 h-5" />, text: 'Reviews', path: '/hidden-gems-owner-portal/reviews' },
    { icon: <BarChart2 className="w-5 h-5" />, text: 'Performance', path: '/hidden-gems-owner-portal/analytics' },
    { icon: <FileText className="w-5 h-5" />, text: 'Resources', path: '/hidden-gems-owner-portal/resources' },
    { icon: <Settings className="w-5 h-5" />, text: 'Settings', path: '/hidden-gems-owner-portal/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen hidden md:flex flex-col">
      <div className="p-4 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-eventuraa-purple">Hidden Gems</h1>
          <p className="text-xs text-gray-500">Owner Portal</p>
        </div>
      </div>

      <Separator />

      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="relative">
            <img
              src={owner.profileImage}
              alt={owner.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-eventuraa-purple"
            />
            {owner.verified && (
              <span className="absolute bottom-0 right-0 bg-green-500 p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </div>
          <div>
            <p className="font-medium text-sm">{owner.name}</p>
            <p className="text-xs text-gray-500">{owner.business}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-xs text-gray-500">Commission Rate:</span>
            <span className="text-xs font-medium">{owner.commissionRate}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Member since:</span>
            <span className="text-xs">{owner.memberSince}</span>
          </div>
        </div>
      </div>

      <Separator />
      
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="px-3 space-y-1">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'bg-eventuraa-softPurple text-eventuraa-purple font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              end={index === 0}
            >
              {item.icon}
              <span className="ml-3">{item.text}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4">
        <div className="bg-eventuraa-yellow p-3 rounded-md mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-orange-500 mr-2" />
              <div>
                <p className="text-xs font-medium">Gem of the Month</p>
                <p className="text-xs text-gray-600">4 reviews to qualify!</p>
              </div>
            </div>
          </div>
        </div>
        
        <Button
          variant="outline"
          className="w-full text-gray-700 flex items-center justify-center"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default OwnerSidebar;
