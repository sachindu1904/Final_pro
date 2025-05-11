import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrganizer } from '../contexts/OrganizerContext';
import { useEvent } from '../contexts/EventContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Button,
  Avatar,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  Event as EventIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Business as BusinessIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import CreateEvent from '../components/organizer/CreateEvent';
import EditEvent from '../components/organizer/EditEvent';
import { Event } from '../types/event';
import { Organizer } from '../types/organizer';
import { Company } from '../types/company';

const OrganizerPortal: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { organizer, loading: organizerLoading, error: organizerError } = useOrganizer();
  const { events, loading: eventsLoading, error: eventsError } = useEvent();
  const { theme } = useTheme();
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (organizerLoading || eventsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (organizerError || eventsError) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">
          {organizerError || eventsError}
        </Alert>
      </Container>
    );
  }

  if (!organizer) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="warning">
          Please complete your organizer profile to access the portal.
        </Alert>
      </Container>
    );
  }

  const handleCreateEvent = () => {
    setShowCreateEvent(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
  };

  const handleCloseCreateEvent = () => {
    setShowCreateEvent(false);
  };

  const handleCloseEditEvent = () => {
    setEditingEvent(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Organizer Profile Section */}
      <Card sx={{ mb: 4, backgroundColor: theme.palette.background.paper }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                src={organizer.profilePicture}
                alt={`${organizer.firstName} ${organizer.lastName}`}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                {organizer.firstName} {organizer.lastName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {organizer.position}
              </Typography>
              <Typography variant="body1">
                {organizer.bio}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Company Information Section */}
      <Card sx={{ mb: 4, backgroundColor: theme.palette.background.paper }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                src={organizer.company.logo}
                alt={organizer.company.name}
                sx={{ width: 80, height: 80 }}
              >
                <BusinessIcon />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" gutterBottom>
                {organizer.company.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {organizer.company.businessType}
              </Typography>
              <Typography variant="body2">
                {organizer.company.address.street}, {organizer.company.address.city}
              </Typography>
              <Typography variant="body2">
                {organizer.company.contactEmail} | {organizer.company.contactPhone}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Events Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Your Events
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateEvent}
        >
          Create Event
        </Button>
      </Box>

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {event.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.location}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditEvent(event)}
                >
                  Edit Event
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Event Modal */}
      {showCreateEvent && (
        <CreateEvent
          open={showCreateEvent}
          onClose={handleCloseCreateEvent}
        />
      )}

      {/* Edit Event Modal */}
      {editingEvent && (
        <EditEvent
          open={!!editingEvent}
          onClose={handleCloseEditEvent}
          event={editingEvent}
        />
      )}
    </Container>
  );
};

export default OrganizerPortal;
