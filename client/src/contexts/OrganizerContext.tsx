import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Organizer } from '../types/organizer';
import axios from 'axios';

interface OrganizerContextType {
  organizer: Organizer | null;
  loading: boolean;
  error: string | null;
  refreshOrganizer: () => Promise<void>;
}

const OrganizerContext = createContext<OrganizerContextType | undefined>(undefined);

export const OrganizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [organizer, setOrganizer] = useState<Organizer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizer = async () => {
    if (!user) {
      setOrganizer(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/api/organizers/me`);
      setOrganizer(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch organizer data');
      setOrganizer(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizer();
  }, [user]);

  const refreshOrganizer = async () => {
    await fetchOrganizer();
  };

  return (
    <OrganizerContext.Provider value={{ organizer, loading, error, refreshOrganizer }}>
      {children}
    </OrganizerContext.Provider>
  );
};

export const useOrganizer = () => {
  const context = useContext(OrganizerContext);
  if (context === undefined) {
    throw new Error('useOrganizer must be used within an OrganizerProvider');
  }
  return context;
}; 