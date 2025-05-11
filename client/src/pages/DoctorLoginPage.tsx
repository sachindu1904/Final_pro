import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, CreditCard, Shield, Info, User, ShieldCheck } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from '@/lib/axios';

const DoctorLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form validation errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [regNumberError, setRegNumberError] = useState('');
  const [generalError, setGeneralError] = useState('');
  
  const [currentTab, setCurrentTab] = useState('login');

  const resetErrors = () => {
    setEmailError('');
    setPasswordError('');
    setRegNumberError('');
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();
    
    // Form validation
    let hasError = false;
    
    if (!emailOrPhone) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(emailOrPhone)) {
      hasError = true;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }
    
    if (hasError) return;
    
    setIsLoading(true);
    
    try {
      // API call to backend
      const response = await api.post('/auth/signin', {
        email: emailOrPhone,
        password
      });
      
      if (response.data.success) {
        const userData = response.data.user;
        
        // Check if user is a doctor
        if (userData.role !== 'doctor') {
          setGeneralError('This account is not registered as a doctor');
          toast.error('This account is not registered as a doctor');
          setIsLoading(false);
          return;
        }
        
        // Store token in localStorage or sessionStorage based on rememberMe
        if (rememberMe) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('user', JSON.stringify(userData));
        }
        
        toast.success('Successfully logged in!');
        navigate('/doctor-portal');
      } else {
        setGeneralError(response.data.message || 'Authentication failed');
        toast.error(response.data.message || 'Authentication failed');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      if (error.response) {
        // Server responded with error
        const { status, data } = error.response;
        
        if (status === 401) {
          setPasswordError('Invalid email or password');
          toast.error('Invalid email or password');
        } else if (status === 429) {
          setGeneralError('Too many login attempts. Please try again later.');
          toast.error('Too many login attempts. Please try again later.');
        } else {
          setGeneralError('Authentication failed. Please try again.');
          toast.error('Authentication failed. Please try again.');
        }
      } else if (error.request) {
        setGeneralError('Network error. Please check your internet connection.');
        toast.error('Network error. Please check your internet connection.');
      } else {
        setGeneralError('An unexpected error occurred. Please try again.');
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();
    
    // Form validation
    let hasError = false;
    
    if (!regNumber) {
      setRegNumberError('SLMC Registration Number is required');
      hasError = true;
    }
    
    if (!emailOrPhone) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(emailOrPhone)) {
      hasError = true;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      hasError = true;
    }
    
    if (hasError) return;
    
    setIsLoading(true);
    
    try {
      // API call to backend
      console.log('Attempting to call API at: /auth/doctor/signup');
      const response = await api.post('/auth/doctor/signup', {
        name: 'Dr. ' + regNumber.split(' ').pop(),
        email: emailOrPhone,
        password,
        regNumber,
        specialization: 'General Practice',
        qualification: 'MBBS',
        hospital: 'General Hospital'
      });
      
      if (response.data.success) {
        // Store token
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast.success('Doctor account created! You\'ll need to complete your profile.');
        navigate('/doctor-portal');
      } else {
        setGeneralError(response.data.message || 'Registration failed');
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Doctor signup error:', error);
      console.error('Request that failed:', {
        url: '/auth/doctor/signup',
        data: {
          name: 'Dr. ' + regNumber.split(' ').pop(),
          email: emailOrPhone,
          regNumber,
          // Don't log password for security
        }
      });
      
      if (error.response) {
        // Server responded with error
        const { status, data } = error.response;
        console.error(`Server responded with status ${status}:`, data);
        
        if (status === 400) {
          if (data.message.includes('already exists')) {
            if (data.message.includes('email')) {
              setEmailError('This email is already registered');
              toast.error('This email is already registered');
            } else if (data.message.includes('registration')) {
              setRegNumberError('This registration number is already registered');
              toast.error('This registration number is already registered');
            } else {
              setGeneralError(data.message);
              toast.error(data.message);
            }
          } else {
            setGeneralError(data.message || 'Registration failed');
            toast.error(data.message || 'Registration failed');
          }
        } else if (status === 422) {
          // Validation error
          const validationErrors = data.errors || [];
          
          validationErrors.forEach((err: any) => {
            if (err.param === 'email') setEmailError(err.msg);
            if (err.param === 'password') setPasswordError(err.msg);
            if (err.param === 'regNumber') setRegNumberError(err.msg);
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
        setGeneralError('Network error. Please check your internet connection.');
        toast.error('Network error. Please check your internet connection.');
      } else {
        setGeneralError('An unexpected error occurred. Please try again.');
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/lovable-uploads/dcfedfbc-2e9f-48f3-a0ae-3dc9746486c2.png')",
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1A1F2C]/70" />
      
      <div className="container-custom py-6 flex justify-between items-center relative z-10">
        <Link to="/medical" className="text-2xl font-bold text-white inline-flex">
          <span className="text-[#4CAF50]">Eventuraa</span>
          <span className="text-white">.MD</span>
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4 py-10 relative z-10">
        <Card className="w-full max-w-md shadow-xl border-gray-100 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <div className="bg-[#4CAF50]/10 p-3 rounded-full">
                <User className="h-6 w-6 text-[#4CAF50]" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 font-display">Doctor Portal</CardTitle>
            <CardDescription className="text-gray-600">
              Access your doctor dashboard, patient communications, and more
            </CardDescription>
            {generalError && (
              <div className="p-3 mt-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span>{generalError}</span>
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            <Tabs 
              defaultValue="login" 
              value={currentTab}
              onValueChange={setCurrentTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emailOrPhone">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        id="emailOrPhone" 
                        type="text" 
                        placeholder="e.g., doctor@email.com" 
                        className={`pl-10 ${emailError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        value={emailOrPhone}
                        onChange={(e) => {
                          setEmailOrPhone(e.target.value);
                          if (e.target.value === '') {
                            setEmailError('');
                          }
                        }}
                        onBlur={() => validateEmail(emailOrPhone)}
                        autoFocus
                      />
                      {emailError && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                          <Info className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-sm text-[#4CAF50] hover:text-green-700 hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
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
                          if (e.target.value !== '') {
                            setPasswordError('');
                          }
                        }}
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {passwordError && <p className="text-xs text-red-500 mt-1">{passwordError}</p>}
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox 
                      id="remember-me" 
                      checked={rememberMe} 
                      onCheckedChange={(checked) => setRememberMe(!!checked)}
                    />
                    <label 
                      htmlFor="remember-me"
                      className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Keep me logged in for 30 days
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#4CAF50] hover:bg-[#3d8b40] text-white font-medium" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </div>
                    ) : "Login to Doctor Portal"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="regNumber">SLMC Registration Number</Label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        id="regNumber" 
                        type="text" 
                        placeholder="e.g., SLMC 45632" 
                        className={`pl-10 ${regNumberError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        value={regNumber}
                        onChange={(e) => {
                          setRegNumber(e.target.value);
                          if (e.target.value !== '') setRegNumberError('');
                        }}
                      />
                    </div>
                    {regNumberError ? (
                      <p className="text-xs text-red-500 mt-1">{regNumberError}</p>
                    ) : (
                      <p className="text-xs text-gray-500">
                        Your SLMC number will be verified during registration
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="e.g., doctor@email.com" 
                        className={`pl-10 ${emailError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        value={emailOrPhone}
                        onChange={(e) => {
                          setEmailOrPhone(e.target.value);
                          if (e.target.value === '') setEmailError('');
                        }}
                        onBlur={() => validateEmail(emailOrPhone)}
                      />
                    </div>
                    {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Create Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input 
                        id="signup-password" 
                        type={showPassword ? "text" : "password"}  
                        placeholder="••••••••" 
                        className={`pl-10 ${passwordError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (e.target.value !== '') setPasswordError('');
                        }}
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
                      <p className="text-xs text-gray-500">
                        Must be at least 8 characters with a number and special character
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="terms" required />
                    <label 
                      htmlFor="terms"
                      className="text-sm text-gray-600"
                    >
                      I agree to the <a href="#" className="text-[#4CAF50] hover:underline">Terms of Service</a> and <a href="#" className="text-[#4CAF50] hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#4CAF50] hover:bg-[#3d8b40] text-white font-medium" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </div>
                    ) : "Create Doctor Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-6 text-xs text-gray-500 pt-4">
              <div className="flex items-center justify-center gap-1.5">
                <Shield className="h-3 w-3" />
                <span>Secure Login</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3 w-3" />
                <span>SLMC Verified Only</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Lock className="h-3 w-3" />
                <span>Medical Data Encrypted</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DoctorLoginPage;
