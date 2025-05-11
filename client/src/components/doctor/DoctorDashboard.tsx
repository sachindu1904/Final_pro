
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Video, Edit, DollarSign, FileText, User, ShieldCheck } from 'lucide-react';

export interface DoctorDashboardProps {
  doctor: {
    name: string;
    appointmentsToday: number;
    urgentAppointments: number;
    unreadMessages: number;
    experience: number;
    videoConsultationFee: number;
    specialization: string;
    regNo: string;
  };
}

const DoctorDashboard = ({ doctor }: DoctorDashboardProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-blue-700">
              <Calendar className="h-5 w-5 mr-2 text-blue-500" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{doctor.appointmentsToday} 
              {doctor.urgentAppointments > 0 && 
                <span className="text-sm font-normal text-red-500 ml-2">
                  ({doctor.urgentAppointments} urgent)
                </span>
              }
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              View Schedule
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-green-700">
              <MessageSquare className="h-5 w-5 mr-2 text-green-500" />
              Unread Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{doctor.unreadMessages}</p>
            <Button variant="outline" size="sm" className="mt-2">
              View Messages
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-purple-700">
              <Video className="h-5 w-5 mr-2 text-purple-500" />
              Video Consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0 <span className="text-sm font-normal text-gray-500">today</span></p>
            <Button variant="outline" size="sm" className="mt-2">
              Start Consultation
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Action Shortcuts */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
            <Edit className="h-5 w-5 mb-1" />
            <span>Edit Profile</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
            <DollarSign className="h-5 w-5 mb-1" />
            <span>Update Fees</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
            <Video className="h-5 w-5 mb-1" />
            <span>Start Consultation</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center">
            <FileText className="h-5 w-5 mb-1" />
            <span>Manage Prescriptions</span>
          </Button>
        </div>
      </div>
      
      {/* Doctor Profile Summary */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Profile Summary
          </CardTitle>
          <CardDescription>
            This is how patients see your profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-3 min-w-max">
              <div className="text-sm font-medium text-gray-500">Specialization:</div>
              <div className="font-medium">{doctor.specialization}</div>
            </div>
            
            <div className="flex items-center gap-3 min-w-max">
              <div className="text-sm font-medium text-gray-500">Experience:</div>
              <div className="font-medium">{doctor.experience} years</div>
            </div>
            
            <div className="flex items-center gap-3 min-w-max">
              <div className="text-sm font-medium text-gray-500">SLMC Reg No:</div>
              <div className="font-medium">{doctor.regNo}</div>
              <ShieldCheck className="h-4 w-4 text-green-500" />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-gray-500">Video Consultation:</div>
            <div className="font-medium">LKR {doctor.videoConsultationFee}</div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              Preview Public Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;
