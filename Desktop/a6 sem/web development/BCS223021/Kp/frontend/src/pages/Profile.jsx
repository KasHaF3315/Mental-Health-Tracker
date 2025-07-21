import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Paper, Alert } from '@mui/material';
import { auth } from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await auth.getProfile();
        setProfile(response.data);
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to load profile' });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add update profile API call here
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile Settings
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              margin="normal"
              disabled
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Update Profile
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile; 