import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import { auth } from '../services/api';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await auth.getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {profile?.name || 'Explorer'}!
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Your Profile
                </Typography>
                <Typography>Email: {profile?.email}</Typography>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Adventures
                </Typography>
                <Typography color="text.secondary">
                  No adventures planned yet. Start planning your next quest!
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Plan New Adventure
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Find Routes
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary">
                      Join Community
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="info">
                      Download Maps
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 