
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Calendar, LayoutDashboard, FileText, BarChart, Settings, Plus, Menu, X } from 'lucide-react';

interface OrganizerSidebarProps {
  organizer: {
    name: string;
    company: string;
    email: string;
    phone: string;
    profileImage: string;
    verified: boolean;
    memberSince: string;
  };
}

const OrganizerSidebar: React.FC<OrganizerSidebarProps> = ({ organizer }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path || 
      (path !== '/organizer-portal' && location.pathname.startsWith(path));
  };

  const navItems = [
    { 
      path: '/organizer-portal', 
      label: 'Dashboard', 
      icon: <LayoutDashboard size={20} /> 
    },
    { 
      path: '/organizer-portal/events', 
      label: 'My Events', 
      icon: <Calendar size={20} />
    },
    { 
      path: '/organizer-portal/analytics', 
      label: 'Analytics', 
      icon: <BarChart size={20} />
    },
    { 
      path: '/organizer-portal/events/new', 
      label: 'Create Event', 
      icon: <Plus size={20} />,
      highlight: true
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden" 
          onClick={() => setCollapsed(true)}
        />
      )}
      
      <aside 
        className={`
          ${collapsed ? "w-[80px] -translate-x-full lg:translate-x-0" : "w-[280px]"}
          fixed left-0 top-0 z-30 h-full border-r border-gray-200 bg-white transition-all duration-300 lg:static
        `}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <div className="flex items-center">
              <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mr-2" />
              <span className="font-bold text-lg">Organizer</span>
            </div>
          )}
          {collapsed && (
            <img src="/favicon.ico" alt="Logo" className="h-8 w-8 mx-auto" />
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setCollapsed(true)}
          >
            <X size={20} />
          </Button>
        </div>
        
        {/* User profile section */}
        <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="relative">
              <img 
                src={organizer.profileImage} 
                alt={organizer.name}
                className="h-10 w-10 rounded-full object-cover mr-3"
              />
              {organizer.verified && (
                <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{organizer.name}</div>
                <div className="text-sm text-gray-500 truncate">{organizer.company}</div>
              </div>
            )}
          </div>
          
          {!collapsed && (
            <div className="mt-3 flex items-center text-xs text-gray-500">
              <span>Member since {organizer.memberSince}</span>
              {organizer.verified && (
                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">Verified</Badge>
              )}
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-2 mt-2">
          {navItems.map((item) => (
            <Tooltip key={item.path} delayDuration={0}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-2 px-3 py-2 rounded-md text-sm 
                    ${isActiveRoute(item.path) ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"}
                    ${item.highlight && !isActiveRoute(item.path) ? "border border-dashed border-purple-300" : ""}
                    ${collapsed ? "justify-center" : ""}
                  `}
                >
                  <span>{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>
        
        {/* Settings and Collapse button */}
        <div className="absolute bottom-8 left-0 right-0 px-2">
          {!collapsed && (
            <NavLink
              to="/organizer-portal/settings"
              className={({ isActive }) => `
                flex items-center gap-2 px-3 py-2 rounded-md text-sm mb-4
                ${isActive ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              <Settings size={20} />
              <span>Settings</span>
            </NavLink>
          )}
          
          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center gap-2 justify-center lg:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu size={16} />
            {!collapsed && <span>Collapse</span>}
          </Button>
        </div>
      </aside>
      
      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className={`
          fixed bottom-6 right-6 z-30 rounded-full shadow-lg lg:hidden
          ${!collapsed ? "hidden" : ""}
        `}
        onClick={() => setCollapsed(false)}
      >
        <Menu size={20} />
      </Button>
    </>
  );
};

export default OrganizerSidebar;
