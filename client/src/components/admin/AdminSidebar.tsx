import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Settings, LogOut } from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
        ${isActive
          ? 'bg-primary text-white' 
          : 'text-gray-600 hover:text-primary hover:bg-gray-100'
        }
      `}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </NavLink>
  );
};

const AdminSidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">Eventuraa Admin</h1>
        <p className="text-sm text-gray-500">Management Portal</p>
      </div>
      
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          <SidebarLink 
            to="/admin" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
          />
          <SidebarLink 
            to="/admin/events/pending" 
            icon={<Calendar size={20} />} 
            label="Pending Events" 
          />
          <SidebarLink 
            to="/admin/users" 
            icon={<Users size={20} />} 
            label="Users" 
          />
          <SidebarLink 
            to="/admin/settings" 
            icon={<Settings size={20} />} 
            label="Settings" 
          />
        </div>
      </div>
      
      <div className="p-4 border-t">
        <button
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={() => {
            // Implement logout logic
            console.log('Logout clicked');
          }}
        >
          <LogOut size={18} className="mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar; 