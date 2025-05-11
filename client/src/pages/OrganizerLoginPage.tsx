import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, Calendar, Ticket, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import api from '@/lib/axios';

const OrganizerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const resetErrors = () => {
    setEmailError('');
    setPasswordError('');
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
    
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      hasError = true;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }
    
    if (hasError) return;
    
    setIsLoading(true);
    
    try {
      // API call to backend for signin
      const response = await api.post('/auth/signin', {
        email,
        password
      });
      
      if (response.data.success) {
        const userData = response.data.user;
        
        // Check if user is an organizer
        if (userData.role !== 'organizer') {
          setGeneralError('This account is not registered as an organizer');
          toast.error('This account is not registered as an organizer');
          setIsLoading(false);
          return;
        }
        
        // Store token and user data
        if (rememberMe) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('user', JSON.stringify(userData));
        }
        
        toast.success('Successfully logged in!');
        navigate('/organizer-portal');
      } else {
        setGeneralError(response.data.message || 'Authentication failed');
        toast.error(response.data.message || 'Authentication failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.response) {
        // Server responded with error
        const { status, data } = error.response;
        
        if (status === 401) {
          // Invalid credentials
          setPasswordError('Invalid email or password');
          toast.error('Invalid email or password');
        } else if (status === 400) {
          // Bad request
          setGeneralError(data.message || 'Invalid request');
          toast.error(data.message || 'Invalid request');
        } else {
          // Other server errors
          setGeneralError('Authentication failed. Please try again.');
      toast.error('Authentication failed. Please try again.');
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80')",
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="container mx-auto py-6 flex justify-between items-center relative z-10">
        <Link to="/" className="text-2xl font-bold text-white inline-flex">
          Eventuraa.lk
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4 py-10 relative z-10">
        <Card className="w-full max-w-md shadow-xl border-gray-100 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <div className="h-16 w-16 rounded-full bg-[#7E69AB] flex items-center justify-center">
                <Ticket className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 font-display">Event Organizer Login</CardTitle>
            <CardDescription className="text-gray-600">
              Access your event management dashboard
            </CardDescription>
            {generalError && (
              <div className="p-3 mt-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>{generalError}</span>
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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
                    autoFocus
                  />
                </div>
                {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-[#7E69AB] hover:text-purple-700 hover:underline">
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
                  Keep me logged in
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#7E69AB] hover:bg-[#6E59A5] text-white font-medium" 
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
                ) : "Login as Organizer"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-gray-600">
              Don't have an organizer account yet?{" "}
              <Link to="/organizer-signup" className="text-[#7E69AB] hover:text-[#6E59A5] hover:underline font-medium">
                Apply Now
              </Link>
            </div>
            
            <div className="text-xs text-gray-500">
              By logging in, you agree to our <Link to="/terms" className="underline">Terms of Service</Link> for event organizers
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OrganizerLoginPage;
