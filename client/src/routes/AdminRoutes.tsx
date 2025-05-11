import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminEvents from '../pages/admin/AdminEvents';
import EventReview from '../pages/admin/EventReview';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/events/pending" element={<AdminEvents />} />
      <Route path="/events/:id" element={<EventReview />} />
    </Routes>
  );
};

export default AdminRoutes; 