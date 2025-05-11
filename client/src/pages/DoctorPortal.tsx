
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  ShieldCheck, 
  Calendar, 
  MessageSquare, 
  Edit, 
  DollarSign, 
  Video, 
  Phone, 
  Mail, 
  Lock,
  Star,
  FileText,
  Settings,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DoctorDashboard from '@/components/doctor/DoctorDashboard';
import DoctorProfile from '@/components/doctor/DoctorProfile';
import DoctorPricing from '@/components/doctor/DoctorPricing';
import PatientCommunication from '@/components/doctor/PatientCommunication';
import DoctorSettings from '@/components/doctor/DoctorSettings';
import DoctorHeader from '@/components/doctor/DoctorHeader';

const DoctorPortal = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock doctor data
  const doctorData = {
    name: "Dr. Anusha Perera",
    qualification: "MBBS, MD",
    specialization: "Cardiologist",
    hospital: "Provincial General Hospital, Colombo",
    regNo: "SLMC 45632",
    experience: 15,
    photo: "/lovable-uploads/c0345ab3-5c66-4001-8dca-4164369fc2cf.png",
    appointmentsToday: 5,
    urgentAppointments: 2,
    unreadMessages: 3,
    languages: ["English", "Sinhala", "Tamil"],
    videoConsultationFee: 4000,
    inPersonFee: 5000,
    isVerified: true
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorHeader doctor={doctorData} />
      
      <div className="container-custom py-6">
        <Tabs 
          defaultValue="dashboard" 
          value={currentTab} 
          onValueChange={setCurrentTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Patients</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Pricing</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="dashboard">
              <DoctorDashboard doctor={doctorData} />
            </TabsContent>
            
            <TabsContent value="profile">
              <DoctorProfile doctor={doctorData} />
            </TabsContent>
            
            <TabsContent value="patients">
              <PatientCommunication doctor={doctorData} />
            </TabsContent>
            
            <TabsContent value="pricing">
              <DoctorPricing doctor={doctorData} />
            </TabsContent>
            
            <TabsContent value="settings">
              <DoctorSettings doctor={doctorData} />
            </TabsContent>
          </div>
        </Tabs>
        
        {/* Legal Disclaimers */}
        <div className="mt-10 text-xs text-gray-500 border-t pt-4">
          <p className="mb-2 flex items-center">
            <Info className="h-3 w-3 mr-1" /> 
            <strong>Telemedicine Legal Disclaimer:</strong> All consultations must comply with the Sri Lanka Medical Council guidelines for telemedicine practice.
          </p>
          <p>Patient data is protected under Sri Lankan data protection regulations. Use of this portal constitutes agreement to maintain patient confidentiality and adhere to medical ethics guidelines.</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorPortal;
