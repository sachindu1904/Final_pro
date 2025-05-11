
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, ShieldCheck, CreditCard, AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from '@/hooks/use-toast';

const MedicalServices = () => {
  const { toast } = useToast();
  const [showDoctorFaces, setShowDoctorFaces] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);

  const handleQuickExit = () => {
    toast({
      title: "Exiting medical services",
      description: "Redirecting to a neutral page...",
    });
    // In a real app, this would redirect to a neutral page
    setTimeout(() => {
      window.location.href = '/hotels';
    }, 1500);
  };

  const toggleDoctorVisibility = () => {
    setShowDoctorFaces(prev => !prev);
    toast({
      title: showDoctorFaces ? "Doctor faces blurred" : "Doctor faces visible",
      description: showDoctorFaces ? "Privacy mode activated" : "Privacy mode deactivated",
      variant: showDoctorFaces ? "default" : "default",
    });
  };

  const showPrivacyInfo = () => {
    setShowPrivacyPopup(true);
    setTimeout(() => setShowPrivacyPopup(false), 5000);
  };

  return (
    <section id="medical" className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container-custom">
        {/* Quick Exit Button */}
        <div className="absolute top-4 right-4 z-50">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleQuickExit}
                  className="bg-white/80 hover:bg-white rounded-full"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick exit (redirects to hotels)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="text-center mb-12">
          <h2 className="section-title">Confidential Medical Services</h2>
          <div className="flex items-center justify-center mb-2">
            <ShieldCheck className="text-blue-600 mr-2" />
            <p className="text-blue-700 font-medium">
              Privacy-First Healthcare for Tourists
            </p>
          </div>
          <p className="section-subtitle max-w-2xl mx-auto">
            Discreet medical support with transparent pricing. All consultations are confidential 
            and follow strict data protection protocols.
          </p>
          
          {/* Privacy Controls */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleDoctorVisibility}
              className="text-xs flex items-center border-blue-300"
            >
              {showDoctorFaces ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
              {showDoctorFaces ? "Blur Doctor Faces" : "Show Doctor Faces"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={showPrivacyInfo}
              className="text-xs flex items-center border-blue-300"
            >
              <Shield className="h-3 w-3 mr-1" />
              Privacy Policy
            </Button>
          </div>
          
          {/* Privacy Policy Popup */}
          {showPrivacyPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50" onClick={() => setShowPrivacyPopup(false)}>
              <div className="bg-white p-6 rounded-lg max-w-md" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold mb-2">Our Privacy Commitment</h3>
                <ul className="list-disc pl-5 space-y-2 mb-4 text-sm text-left">
                  <li>All medical data is encrypted end-to-end</li>
                  <li>Doctor-patient confidentiality is strictly enforced</li>
                  <li>Optional anonymous consultations available</li>
                  <li>You can request data deletion at any time</li>
                </ul>
                <Button onClick={() => setShowPrivacyPopup(false)}>Close</Button>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Transparency Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-10 text-center">
          <p className="font-medium text-blue-800">
            Channeling Fee Only
          </p>
          <p className="text-sm text-blue-600 max-w-2xl mx-auto">
            Doctors charge LKR 2,500-5,000 for the initial consultation. 
            Final treatment costs may vary based on your specific needs.
          </p>
          <div className="flex items-center justify-center mt-2">
            <AlertCircle className="h-4 w-4 text-blue-600 mr-1" />
            <span className="text-xs text-blue-600">View full pricing policy</span>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-12">
          <h3 className="text-xl font-medium text-center mb-6">Select Your Health Need</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <CategoryCard 
              title="General Health" 
              description="Common illnesses, check-ups, and non-specific concerns"
              isSelected={selectedCategory === 'general'}
              onClick={() => setSelectedCategory('general')}
            />
            <CategoryCard 
              title="Mental Wellness" 
              description="Stress, anxiety, depression, and counseling services"
              isSelected={selectedCategory === 'mental'}
              onClick={() => setSelectedCategory('mental')}
            />
            <CategoryCard 
              title="Substance Advice" 
              description="Confidential support for substance-related concerns"
              isSelected={selectedCategory === 'substance'}
              onClick={() => setSelectedCategory('substance')}
            />
            <CategoryCard 
              title="Infections" 
              description="Treatment for various types of infections"
              isSelected={selectedCategory === 'infections'}
              onClick={() => setSelectedCategory('infections')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Discreet Consultation Card */}
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl font-bold text-blue-800">Discreet Consultation</CardTitle>
                <div className="bg-blue-100 p-1 rounded-full">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <CardDescription className="text-blue-600">
                Private online consultation with discretion
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <PrivacyFeature text="No personal details required" />
                <PrivacyFeature text="End-to-end encrypted video calls" />
                <PrivacyFeature text="Anonymous payment options" />
                <PrivacyFeature text="Medical history auto-deletion" />
              </ul>
              
              <div className="mt-6 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-center font-medium text-blue-700">Channeling Fee</p>
                <p className="text-center text-xl font-bold text-blue-900">LKR 3,500</p>
                <p className="text-xs text-center text-blue-500 mt-1">Consultation only</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-2">
                Book Private Consultation
              </Button>
              <p className="text-xs text-center text-gray-500">
                Your booking will appear as "EVENTURAA HEALTH*CONSULT" on statements
              </p>
            </CardFooter>
          </Card>

          {/* Anonymous Doctor Visit Card */}
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl font-bold text-blue-800">Doctor Visit</CardTitle>
                <div className="bg-blue-100 p-1 rounded-full">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <CardDescription className="text-blue-600">
                Discreet in-person visit to your location
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <PrivacyFeature text="Doctor comes to your hotel/apartment" />
                <PrivacyFeature text="Discreet arrival (no medical markings)" />
                <PrivacyFeature text="Pay with cash for extra privacy" />
                <PrivacyFeature text="No records on hotel bill" />
              </ul>
              
              <div className="mt-6 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-center font-medium text-blue-700">Channeling Fee</p>
                <p className="text-center text-xl font-bold text-blue-900">LKR 5,000</p>
                <p className="text-xs text-center text-blue-500 mt-1">Consultation only</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-2">
                Request Discreet Visit
              </Button>
              <p className="text-xs text-center text-gray-500">
                Average arrival time: 30-45 minutes
              </p>
            </CardFooter>
          </Card>

          {/* Confidential Pharmacy Card */}
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl font-bold text-blue-800">Private Pharmacy</CardTitle>
                <div className="bg-blue-100 p-1 rounded-full">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <CardDescription className="text-blue-600">
                Discreet medication delivery service
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <PrivacyFeature text="Plain packaging with no labels" />
                <PrivacyFeature text="Delivered directly to your room" />
                <PrivacyFeature text="Multiple payment methods" />
                <PrivacyFeature text="Verified authentic medications" />
              </ul>
              
              <div className="mt-6 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-center font-medium text-blue-700">Service Fee</p>
                <p className="text-center text-xl font-bold text-blue-900">LKR 1,000</p>
                <p className="text-xs text-center text-blue-500 mt-1">+ medication costs</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-2">
                Order Medication
              </Button>
              <p className="text-xs text-center text-gray-500">
                Requires valid prescription (can be obtained from our doctors)
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Payment Methods Section */}
        <div className="mt-10 pt-8 border-t border-blue-200">
          <h3 className="text-xl font-medium text-center mb-6">Discreet Payment Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Credit Card Payment */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Credit/Debit Cards</h4>
                <CreditCard className="h-5 w-5 text-gray-500" />
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">Statement shows:</p>
                <p className="text-sm font-medium p-1 bg-gray-100 rounded">EVENTURAA HEALTH*CONSULT</p>
              </div>
              <p className="text-xs text-gray-500">
                Secure payments with PCI-DSS compliance and SSL encryption
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-600">Processing fee: 0%</span>
                <Button variant="outline" size="sm">Select</Button>
              </div>
            </div>
            
            {/* PayPal Payment */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">PayPal</h4>
                <div className="text-blue-600 font-bold text-sm">Pay<span className="text-blue-800">Pal</span></div>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">Purchase shows as:</p>
                <p className="text-sm font-medium p-1 bg-gray-100 rounded">EVENTURAA SRI LANKA</p>
              </div>
              <p className="text-xs text-gray-500">
                Extra layer of privacy - card details not shared with Eventuraa
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-600">Processing fee: 0.5%</span>
                <Button variant="outline" size="sm">Select</Button>
              </div>
            </div>
            
            {/* Cash Payment */}
            <div className="bg-white p-6 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Cash Payment</h4>
                <div className="text-green-600 font-bold text-lg">$</div>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">Maximum privacy:</p>
                <p className="text-sm font-medium p-1 bg-gray-100 rounded">No digital record of payment</p>
              </div>
              <p className="text-xs text-gray-500">
                Pay directly to the doctor/pharmacy - no digital trail
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-600">Processing fee: 0%</span>
                <Button variant="outline" size="sm" className="border-blue-500 text-blue-500">Recommended</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust and Security Footer */}
        <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-4">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold">Our Privacy Commitment</h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl text-center">
              Your health information is protected by strict confidentiality measures and advanced encryption.
              We prioritize your privacy at every step of your medical journey.
            </p>
            
            {/* Security Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              <SecurityBadge title="End-to-End Encryption" />
              <SecurityBadge title="No Medical Data Stored" />
              <SecurityBadge title="GDPR Compliant" />
              <SecurityBadge title="Zero Tracking" />
            </div>
            
            <p className="text-xs text-gray-500 mt-8 text-center max-w-xl">
              If you have concerns about privacy or confidentiality, please contact our dedicated privacy officer at 
              <span className="font-medium"> privacy@eventuraa.lk</span> for assistance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper Components
const SecurityBadge = ({ title }) => (
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
      <Shield className="h-6 w-6 text-blue-600" />
    </div>
    <span className="text-xs text-gray-700 text-center">{title}</span>
  </div>
);

const PrivacyFeature = ({ text }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-0.5">
      <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
        <ShieldCheck className="h-3 w-3 text-blue-600" />
      </div>
    </div>
    <span className="ml-2 text-sm text-gray-700">{text}</span>
  </div>
);

const CategoryCard = ({ title, description, isSelected, onClick }) => (
  <div 
    className={`p-4 rounded-lg border cursor-pointer transition-all ${
      isSelected 
        ? 'border-blue-500 bg-blue-50 shadow' 
        : 'border-gray-200 bg-white hover:border-blue-300'
    }`}
    onClick={onClick}
  >
    <h4 className={`font-medium mb-1 ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
      {title}
    </h4>
    <p className="text-xs text-gray-600">{description}</p>
  </div>
);

export default MedicalServices;
