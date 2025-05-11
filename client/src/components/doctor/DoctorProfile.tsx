
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FileText, Upload, User, ShieldCheck, Languages, Award, CheckCircle, Hospital } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';

export interface DoctorProfileProps {
  doctor: {
    name: string;
    photo: string;
    qualification: string;
    specialization: string;
    hospital: string;
    regNo: string;
    experience: number;
    languages: string[];
    isVerified: boolean;
  };
}

const DoctorProfile = ({ doctor }: DoctorProfileProps) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: doctor.name,
    qualification: doctor.qualification,
    specialization: doctor.specialization,
    hospital: doctor.hospital,
    experience: doctor.experience,
    languages: doctor.languages,
    bio: "Experienced cardiologist specializing in preventive cardiology and management of complex cardiac conditions. I prioritize patient education and holistic care approaches.",
    hideLastName: false,
    allowEmergencyContacts: true,
    specialties: ["Cardiac Prevention", "Heart Failure Management", "Interventional Cardiology"]
  });
  
  const handleProfileUpdate = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
    setEditMode(false);
  };
  
  const toggleEdit = () => {
    setEditMode(!editMode);
  };
  
  const handlePhotoUpload = () => {
    toast({
      title: "Upload photo",
      description: "Photo upload functionality would be implemented here",
    });
  };
  
  const handleCertificateUpload = () => {
    toast({
      title: "Upload certificate",
      description: "Certificate upload functionality would be implemented here",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Profile Management</h1>
        <Button 
          onClick={toggleEdit}
          variant={editMode ? "default" : "outline"}
        >
          {editMode ? "Cancel Edit" : "Edit Profile"}
        </Button>
      </div>
      
      {/* Bio & Credentials */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Bio & Credentials
          </CardTitle>
          <CardDescription>
            Manage your professional information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-blue-100">
                <AvatarImage src={doctor.photo} alt={doctor.name} />
                <AvatarFallback className="text-2xl">{doctor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {doctor.isVerified && (
                <div className="absolute -top-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                </div>
              )}
              {editMode && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs"
                  onClick={handlePhotoUpload}
                >
                  Upload
                </Button>
              )}
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    defaultValue={profileData.name} 
                    disabled={!editMode} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="regNo">SLMC Registration Number</Label>
                  <div className="flex">
                    <Input 
                      id="regNo" 
                      defaultValue={doctor.regNo} 
                      disabled={true} 
                      className="rounded-r-none"
                    />
                    <div className="bg-green-100 text-green-700 border border-l-0 border-green-200 rounded-r-md px-3 flex items-center text-sm">
                      <ShieldCheck className="h-4 w-4 mr-1" /> Verified
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualifications</Label>
                  <Input 
                    id="qualification" 
                    defaultValue={profileData.qualification} 
                    disabled={!editMode} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  {editMode ? (
                    <Select defaultValue={profileData.specialization}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                        <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                        <SelectItem value="Psychiatrist">Psychiatrist</SelectItem>
                        <SelectItem value="General Physician">General Physician</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input 
                      id="specialization" 
                      defaultValue={profileData.specialization} 
                      disabled={true} 
                    />
                  )}
                </div>
              </div>
              
              {editMode && (
                <div className="flex items-center">
                  <Button variant="outline" size="sm" onClick={handleCertificateUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Certificate
                  </Button>
                  <span className="text-xs text-gray-500 ml-2">(PDF, max 5MB)</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Hospital */}
          <div className="space-y-2">
            <Label htmlFor="hospital" className="flex items-center">
              <Hospital className="h-4 w-4 mr-2" />
              Hospital / Clinic
            </Label>
            <Input 
              id="hospital" 
              defaultValue={profileData.hospital} 
              disabled={!editMode} 
            />
          </div>
          
          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Professional Bio
            </Label>
            <Textarea 
              id="bio" 
              defaultValue={profileData.bio} 
              disabled={!editMode} 
              rows={4}
            />
            {editMode && (
              <p className="text-xs text-gray-500">
                Write a professional description about yourself and your practice (300 characters max).
              </p>
            )}
          </div>
          
          {/* Specialties */}
          <div className="space-y-2">
            <Label htmlFor="specialties" className="flex items-center">
              <Award className="h-4 w-4 mr-2" />
              Specialties
            </Label>
            {editMode ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {profileData.specialties.map((specialty, index) => (
                  <div key={index} className="flex items-center">
                    <Input defaultValue={specialty} className="text-sm" />
                  </div>
                ))}
                <Button variant="outline" size="sm" className="mt-2 w-full md:w-auto">
                  + Add Specialty
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.specialties.map((specialty, index) => (
                  <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 text-sm rounded-full">
                    {specialty}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Languages */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <Languages className="h-4 w-4 mr-2" />
              Languages Spoken
            </Label>
            {editMode ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["English", "Sinhala", "Tamil"].map((lang) => (
                  <div key={lang} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id={`lang-${lang}`} 
                      defaultChecked={profileData.languages.includes(lang)}
                      className="h-4 w-4"
                    />
                    <label htmlFor={`lang-${lang}`}>{lang}</label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.languages.map((lang, index) => (
                  <div key={index} className="bg-gray-100 px-3 py-1 text-sm rounded-full">
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Privacy Settings */}
          {editMode && (
            <div className="space-y-4 pt-2 border-t">
              <h3 className="text-sm font-medium text-gray-700">Privacy Options</h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="hide-lastname" className="text-sm">Hide Last Name</Label>
                  <p className="text-xs text-gray-500">Show only as "Dr. Anusha P."</p>
                </div>
                <Switch 
                  id="hide-lastname" 
                  checked={profileData.hideLastName} 
                  onCheckedChange={(checked) => 
                    setProfileData({...profileData, hideLastName: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emergency-contacts" className="text-sm">Allow Emergency Contacts</Label>
                  <p className="text-xs text-gray-500">Patients can contact you outside scheduled hours</p>
                </div>
                <Switch 
                  id="emergency-contacts" 
                  checked={profileData.allowEmergencyContacts} 
                  onCheckedChange={(checked) => 
                    setProfileData({...profileData, allowEmergencyContacts: checked})
                  }
                />
              </div>
            </div>
          )}
        </CardContent>
        
        {editMode && (
          <CardFooter className="border-t pt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
            <Button onClick={handleProfileUpdate}>Save Changes</Button>
          </CardFooter>
        )}
      </Card>
      
      {/* SLMC Verification Status */}
      <Card>
        <CardHeader className="bg-green-50">
          <CardTitle className="text-green-700 flex items-center text-lg">
            <ShieldCheck className="h-5 w-5 mr-2" />
            SLMC Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <p className="font-medium flex items-center text-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Your medical credentials have been verified
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Last verified on January 15, 2023
              </p>
            </div>
            <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
              View Verification Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfile;
