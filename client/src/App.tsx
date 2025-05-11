import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { OrganizerProvider } from './contexts/OrganizerContext';
import { EventProvider } from './contexts/EventContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <OrganizerProvider>
          <EventProvider>
            <AppRoutes />
          </EventProvider>
        </OrganizerProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
