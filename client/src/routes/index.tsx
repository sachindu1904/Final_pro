import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Public Pages
import Index from '../pages/Index';
import EventsList from '../components/events/EventsList';
import EventPage from '../pages/EventPage';
import MedicalPage from '../pages/MedicalPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import OrganizerLoginPage from '../pages/OrganizerLoginPage';
import OrganizerSignupPage from '../pages/OrganizerSignupPage';
import NotFound from '../pages/NotFound';

// Protected Pages
import OrganizerPortal from '../pages/OrganizerPortal';
import AdminPage from '../pages/Admin';
import AdminLogin from '../components/auth/AdminLogin';
import AdminRoutes from './AdminRoutes';

// Protected Route Component
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode;
  requiredRole?: 'user' | 'organizer' | 'admin';
}> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/events" element={<EventsList />} />
      <Route path="/events/:id" element={<EventPage />} />
      <Route path="/medical" element={<MedicalPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/organizer-login" element={<OrganizerLoginPage />} />
      <Route path="/organizer-signup" element={<OrganizerSignupPage />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Protected Routes */}
      <Route 
        path="/organizer-portal/*" 
        element={
          <ProtectedRoute requiredRole="organizer">
            <OrganizerPortal />
          </ProtectedRoute>
        } 
      />
      
      {/* Admin Routes with AdminPage as parent */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        } 
      >
        <Route path="*" element={<AdminRoutes />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 