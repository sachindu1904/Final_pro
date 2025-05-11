import React from 'react';
import AuthForm from '../components/auth/AuthForm';

const SignUpPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Create Your Eventuraa Account</h1>
        <AuthForm type="register" redirectTo="/" />
      </div>
    </div>
  );
};

export default SignUpPage;
