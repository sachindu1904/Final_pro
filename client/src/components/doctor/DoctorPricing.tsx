
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, Info, AlertCircle, Video, User, Clock, FileText } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export interface DoctorPricingProps {
  doctor: {
    videoConsultationFee: number;
    inPersonFee: number;
  };
}

const DoctorPricing = ({ doctor }: DoctorPricingProps) => {
  const { toast } = useToast();
  const [fees, setFees] = useState({
    videoConsultation: doctor.videoConsultationFee,
    inPersonVisit: doctor.inPersonFee,
    followUp: 2500,
    prescription: 1000,
    emergencyAvailable: true,
    emergencyFee: 8000,
    autoApplyDiscount: false
  });

  const handleSavePricing = () => {
    toast({
      title: "Pricing updated",
      description: "Your pricing information has been successfully updated",
    });
  };
  
  const handleFeeChange = (type: string, value: string) => {
    setFees({
      ...fees,
      [type]: parseInt(value) || 0
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Pricing Management</h1>
      
      {/* Pricing Banner */}
      <Card className="border-l-4 border-blue-500">
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Transparent Pricing Policy</p>
              <p className="text-xs text-gray-600 mt-1">
                Patients will see: "Fees start at LKR {fees.videoConsultation}. Final treatment costs may vary based on your specific needs."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Pricing Form */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Set Your Fees
          </CardTitle>
          <CardDescription>
            Configure various consultation fees and options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Video Consultation */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Video className="h-4 w-4 mr-2 text-blue-600" />
              <Label htmlFor="video-fee">Video Consultation Fee (LKR)</Label>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <p className="text-sm">This is the standard fee for a video consultation session.</p>
                    <p className="text-xs text-gray-500">Recommended: LKR 3,000 - 6,000 based on your specialization.</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <div className="flex">
              <span className="flex items-center px-3 pointer-events-none bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                LKR
              </span>
              <Input 
                id="video-fee" 
                type="number" 
                className="rounded-l-none"
                value={fees.videoConsultation}
                onChange={(e) => handleFeeChange('videoConsultation', e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500">
              Patients will be charged this amount for each video consultation.
            </p>
          </div>
          
          {/* In-Person Visit */}
          <div className="space-y-2">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-green-600" />
              <Label htmlFor="visit-fee">In-Person Visit Fee (LKR)</Label>
            </div>
            <div className="flex">
              <span className="flex items-center px-3 pointer-events-none bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                LKR
              </span>
              <Input 
                id="visit-fee" 
                type="number"
                className="rounded-l-none" 
                value={fees.inPersonVisit}
                onChange={(e) => handleFeeChange('inPersonVisit', e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500">
              Fee for in-person visits at hospital or clinic.
            </p>
          </div>
          
          <Separator />
          
          {/* Additional Fee Types */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Additional Fee Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Follow Up */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-purple-600" />
                  <Label htmlFor="followup-fee">Follow-Up Fee (LKR)</Label>
                </div>
                <div className="flex">
                  <span className="flex items-center px-3 pointer-events-none bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                    LKR
                  </span>
                  <Input 
                    id="followup-fee" 
                    type="number" 
                    className="rounded-l-none"
                    value={fees.followUp}
                    onChange={(e) => handleFeeChange('followUp', e.target.value)}
                  />
                </div>
              </div>
              
              {/* Prescription */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-600" />
                  <Label htmlFor="prescription-fee">Prescription Only (LKR)</Label>
                </div>
                <div className="flex">
                  <span className="flex items-center px-3 pointer-events-none bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                    LKR
                  </span>
                  <Input 
                    id="prescription-fee" 
                    type="number" 
                    className="rounded-l-none"
                    value={fees.prescription}
                    onChange={(e) => handleFeeChange('prescription', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {/* Emergency Availability */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emergency-toggle" className="text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
                    Available for Emergencies
                  </Label>
                  <p className="text-xs text-gray-500 pl-6">
                    Allow patients to book urgent consultations
                  </p>
                </div>
                <Switch 
                  id="emergency-toggle" 
                  checked={fees.emergencyAvailable} 
                  onCheckedChange={(checked) => 
                    setFees({...fees, emergencyAvailable: checked})
                  }
                />
              </div>
              
              {fees.emergencyAvailable && (
                <div className="space-y-2 pl-6 mt-2">
                  <Label htmlFor="emergency-fee">Emergency Fee (LKR)</Label>
                  <div className="flex">
                    <span className="flex items-center px-3 pointer-events-none bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                      LKR
                    </span>
                    <Input 
                      id="emergency-fee" 
                      type="number" 
                      className="rounded-l-none"
                      value={fees.emergencyFee}
                      onChange={(e) => handleFeeChange('emergencyFee', e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Higher fee for urgent/after-hours consultations
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          
          {/* Pricing Preview */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-medium mb-3">Patient View - Price Preview</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Video Consultation:</span>
                <span className="font-semibold">LKR {fees.videoConsultation.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>In-Person Visit:</span>
                <span className="font-semibold">LKR {fees.inPersonVisit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Follow-Up:</span>
                <span className="font-semibold">LKR {fees.followUp.toLocaleString()}</span>
              </div>
              
              {fees.emergencyAvailable && (
                <div className="flex justify-between text-sm text-red-700">
                  <span>Emergency Consultation:</span>
                  <span className="font-semibold">LKR {fees.emergencyFee.toLocaleString()}</span>
                </div>
              )}
              
              <div className="text-xs mt-2 text-gray-500 italic">
                *Final treatment costs may vary based on specific treatment requirements
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-discount" className="text-sm">Auto-Apply Discount</Label>
                <p className="text-xs text-gray-500">
                  Automatically apply 20% discount for follow-up appointments
                </p>
              </div>
              <Switch 
                id="auto-discount" 
                checked={fees.autoApplyDiscount} 
                onCheckedChange={(checked) => 
                  setFees({...fees, autoApplyDiscount: checked})
                }
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline">Reset to Default</Button>
          <Button onClick={handleSavePricing}>Save Pricing</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DoctorPricing;
