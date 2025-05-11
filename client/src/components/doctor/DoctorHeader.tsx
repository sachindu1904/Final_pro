
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, Bell, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface DoctorHeaderProps {
  doctor: {
    name: string;
    photo: string;
    unreadMessages: number;
    isVerified: boolean;
  };
}

const DoctorHeader = ({ doctor }: DoctorHeaderProps) => {
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been successfully logged out",
    });
    // In a real app, this would handle authentication logout
    setTimeout(() => {
      window.location.href = '/medical';
    }, 1500);
  };
  
  return (
    <header className="bg-[#1A1F2C] text-white py-4 shadow-md">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/medical" className="font-bold text-xl flex items-center">
            <span className="text-[#4CAF50]">Eventuraa</span>
            <span className="text-white">.MD</span>
          </Link>
          {doctor.isVerified && (
            <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500 flex items-center">
              <ShieldCheck className="mr-1 h-3 w-3" />
              Verified Doctor
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="text-white">
              <Bell className="h-5 w-5" />
              {doctor.unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {doctor.unreadMessages}
                </span>
              )}
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8 border-2 border-[#4CAF50]">
              <AvatarImage src={doctor.photo} alt={doctor.name} />
              <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline text-sm font-medium">{doctor.name}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-red-900/20"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DoctorHeader;
