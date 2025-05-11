import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, User, Mail, Lock, Briefcase, AlertCircle, Phone, Globe } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import api from '@/lib/axios';
import { Textarea } from '@/components/ui/textarea';

const OrganizerSignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTos, setAgreeTos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form validation errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [tosError, setTosError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const resetErrors = () => {
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setCompanyError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setTosError('');
    setGeneralError('');
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value) && value !== '') {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePhone = (value: string) => {
    // Phone is optional, but if provided must match format
    if (value && value.trim() !== '') {
      const phoneRegex = /^\+94\s\d{2}\s\d{3}\s\d{4}$/;
      if (!phoneRegex.test(value)) {
        setPhoneError('Phone number must be in format: +94 XX XXX XXXX');
        return false;
      }
    }
    setPhoneError('');
    return true;
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validatePasswordMatch = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();
    
    // Form validation
    let hasError = false;
    
    if (!name.trim()) {
      setNameError('Name is required');
      hasError = true;
    }
    
    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      hasError = true;
    }
    
    if (phone.trim() !== '' && !validatePhone(phone)) {
      hasError = true;
    }
    
    if (!company.trim()) {
      setCompanyError('Company name is required');
      hasError = true;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (!validatePassword(password)) {
      hasError = true;
    }
    
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      hasError = true;
    } else if (!validatePasswordMatch()) {
      hasError = true;
    }
    
    if (!agreeTos) {
      setTosError('You must agree to the Terms of Service');
      hasError = true;
    }
    
    if (hasError) return;
    
    setIsLoading(true);
    
    try {
      // API call to backend
      const response = await api.post('/auth/organizer/signup', {
        name,
        email,
        phone: phone.trim() ? phone : undefined, // Only send if provided
        password,
        company,
        description,
        website
      });
      
      if (response.data.success) {
        // Store token in sessionStorage by default for new users
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast.success('Organizer account created successfully!');
        navigate('/organizer-portal');
      } else {
        setGeneralError(response.data.message || 'Registration failed');
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      
      if (error.response) {
        // Server responded with error
        const { status, data } = error.response;
        
        if (status === 400) {
          // Validation errors or user already exists
          if (data.message.includes('already exists') || data.message.includes('already registered')) {
            setEmailError('This email is already registered');
            toast.error('This email is already registered');
          } else if (data.message) {
            setGeneralError(data.message);
            toast.error(data.message);
          }
        } else if (status === 422) {
          // Validation error
          const validationErrors = data.errors || [];
          
          validationErrors.forEach((err: any) => {
            if (err.param === 'name') setNameError(err.msg);
            if (err.param === 'email') setEmailError(err.msg);
            if (err.param === 'phone') setPhoneError(err.msg);
            if (err.param === 'company') setCompanyError(err.msg);
            if (err.param === 'password') setPasswordError(err.msg);
          });
          
          if (validationErrors.length > 0) {
            toast.error('Please correct the errors in the form');
          }
        } else {
          // Other server errors
          setGeneralError('Registration failed. Please try again.');
          toast.error('Registration failed. Please try again.');
        }
      } else if (error.request) {
        // No response received from server
        setGeneralError('Network error. Please check your internet connection.');
        toast.error('Network error. Please check your internet connection.');
      } else {
        // Error setting up request
        setGeneralError('An unexpected error occurred. Please try again.');
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col">
      <div className="container-custom py-6">
        <Link to="/" className="text-2xl font-bold text-gray-800 inline-flex">
          Eventuraa
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <Card className="w-full max-w-xl shadow-xl border-gray-100">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <div className="h-16 w-16 rounded-full bg-[#7E69AB]/10 flex items-center justify-center">
                <Briefcase className="h-8 w-8 text-[#7E69AB]" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Event Organizer Application</CardTitle>
            <CardDescription className="text-gray-600">
              Register as an event organizer to publish and manage events
            </CardDescription>
            {generalError && (
              <div className="p-3 mt-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>{generalError}</span>
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="John Doe" 
                      className={`pl-10 ${nameError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (e.target.value !== '') setNameError('');
                      }}
                    />
                  </div>
                  {nameError && <p className="text-xs text-red-500 mt-1">{nameError}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input 
                      id="company" 
                      type="text" 
                      placeholder="Your Event Company" 
                      className={`pl-10 ${companyError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      value={company}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        if (e.target.value !== '') setCompanyError('');
                      }}
                    />
                  </div>
                  {companyError && <p className="text-xs text-red-500 mt-1">{companyError}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className={`pl-10 ${emailError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value === '') setEmailError('');
                      }}
                      onBlur={() => validateEmail(email)}
                    />
                  </div>
                  {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input 
                      id="phone" 
                      type="text" 
                      placeholder="+94 XX XXX XXXX" 
                      className={`pl-10 ${phoneError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (e.target.value === '') setPhoneError('');
                      }}
                      onBlur={() => validatePhone(phone)}
                    />
                  </div>
                  {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input 
                    id="website" 
                    type="url" 
                    placeholder="https://www.yourcompany.com" 
                    className="pl-10"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Tell us about your company and the types of events you organize..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      className={`pl-10 ${passwordError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (e.target.value !== '') setPasswordError('');
                      }}
                      onBlur={() => validatePassword(password)}
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {passwordError ? (
                    <p className="text-xs text-red-500 mt-1">{passwordError}</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 8 characters long
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input 
                      id="confirmPassword" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      className={`pl-10 ${confirmPasswordError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (e.target.value !== '') setConfirmPasswordError('');
                      }}
                      onBlur={validatePasswordMatch}
                    />
                  </div>
                  {confirmPasswordError && <p className="text-xs text-red-500 mt-1">{confirmPasswordError}</p>}
                </div>
              </div>
              
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeTos} 
                  onCheckedChange={(checked) => {
                    setAgreeTos(!!checked);
                    if (checked) setTosError('');
                  }}
                  className={tosError ? 'border-red-500 text-red-500' : ''}
                />
                <label 
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-tight"
                >
                  I agree to the <Link to="/terms" className="text-purple-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link> for event organizers. I understand my application will be reviewed before approval.
                </label>
              </div>
              {tosError && <p className="text-xs text-red-500 mt-1">{tosError}</p>}
              
              <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-3 text-sm mt-4">
                <p><strong>Note:</strong> Your application will be reviewed by our team. This verification process usually takes 1-3 business days.</p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Application...
                  </div>
                ) : "Submit Organizer Application"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-gray-600">
              Already have an organizer account?{" "}
              <Link to="/organizer-login" className="text-purple-600 hover:text-purple-800 hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OrganizerSignupPage; 