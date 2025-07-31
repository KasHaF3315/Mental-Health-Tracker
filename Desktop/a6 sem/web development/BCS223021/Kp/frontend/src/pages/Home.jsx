import React, { useState } from 'react';
import { Container, Typography, Box, Button, CardMedia, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WeatherWidget from '../components/WeatherWidget';
import LocationExplorer from '../components/LocationExplorer';

// Import images
import heroImage from '../assets/a.jpeg';
import routeImage from '../assets/b.jpeg';
import offlineImage from '../assets/c.jpeg';
import communityImage from '../assets/d.jpeg';

const Home = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);

  const cities = ['Islamabad', 'Lahore', 'Karachi'];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container sx={{ flex: 1 }}>
        {/* Hero Section */}
        <Box sx={{ mt: 8, textAlign: 'center', position: 'relative' }}>
          <CardMedia
            component="img"
            height="400"
            image={heroImage}
            alt="Adventure Hero"
            sx={{
              objectFit: 'cover',
              borderRadius: 2,
              mb: 4
            }}
          />
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to QuestMate
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Your adventure planner companion
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mt: 4 }}
          >
            Get Started
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ mt: 8, mb: 8, p: 4, backgroundColor: '#e1bee7', borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Adventure Features
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Everything you need to explore the world with confidence
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: { xs: 'block', md: 'flex' },
              gap: 4,
              alignItems: 'stretch',
              width: '100%',
            }}
          >
            {/* Smart Route Planning */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                minHeight: 260,
                boxShadow: 3,
                backgroundImage: `url(${routeImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: { xs: 4, md: 0 },
              }}
            >
              {/* Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(106, 13, 173, 0.7)',
                  zIndex: 1,
                }}
              />
              {/* Content */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  color: 'white',
                  p: 4,
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <Box sx={{ fontSize: 40, mb: 1 }}>📍</Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Smart Route Planning
                </Typography>
                <Typography>
                  AI-powered itinerary builder suggests optimal routes based on your interests, fitness level, and time constraints.
                </Typography>
              </Box>
            </Box>
            {/* Offline Navigation */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                minHeight: 260,
                boxShadow: 3,
                backgroundImage: `url(${offlineImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: { xs: 4, md: 0 },
              }}
            >
              {/* Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(106, 13, 173, 0.7)',
                  zIndex: 1,
                }}
              />
              {/* Content */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  color: 'white',
                  p: 4,
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <Box sx={{ fontSize: 40, mb: 1 }}>📡</Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Offline Navigation
                </Typography>
                <Typography>
                  Download detailed topographic maps and navigate without cell service in the most remote locations.
                </Typography>
              </Box>
            </Box>
            {/* Explorer Community */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                minHeight: 260,
                boxShadow: 3,
                backgroundImage: `url(${communityImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(106, 13, 173, 0.7)',
                  zIndex: 1,
                }}
              />
              {/* Content */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  color: 'white',
                  p: 4,
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <Box sx={{ fontSize: 40, mb: 1 }}>👥</Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Explorer Community
                </Typography>
                <Typography>
                  Connect with local guides and fellow adventurers to discover hidden gems and secret spots.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Why Choose QuestMate Section */}
        <Box sx={{
          maxWidth: 1100,
          mx: 'auto',
          my: 6,
          p: { xs: 2, md: 6 },
          background: '#fff',
          borderRadius: 4,
          boxShadow: 2,
          border: '3px solid #9c27b0',
        }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                Why Choose <span style={{ color: '#6a0dad' }}>QuestMate</span>?
              </Typography>
              <Typography sx={{ mb: 3 }}>
                QuestMate makes every journey smarter, faster, and more enjoyable.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                Top Features:
              </Typography>
              <ul style={{ fontSize: '1.1rem', margin: 0, paddingLeft: 20 }}>
                <li><span style={{ color: '#6a0dad', fontWeight: 'bold' }}>Live traffic updates</span></li>
                <li>AI-powered route optimization</li>
                <li>Support for multiple languages</li>
              </ul>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                Steps to Get Started:
              </Typography>
              <ol style={{ fontSize: '1.1rem', margin: 0, paddingLeft: 20 }}>
                <li>Download the app</li>
                <li>Set your destination</li>
                <li>Enjoy your optimized route</li>
              </ol>
            </Box>
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Weather Widget */}
          <Grid item xs={12} md={4}>
            <WeatherWidget />
          </Grid>

          {/* Location Explorer */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Explore Locations
                </Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                  {cities.map((city) => (
                    <Button
                      key={city}
                      variant="contained"
                      color="primary"
                      onClick={() => setSelectedCity(city)}
                    >
                      {city}
                    </Button>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <LocationExplorer
          open={!!selectedCity}
          onClose={() => setSelectedCity(null)}
          city={selectedCity}
        />
      </Container>

      {/* Footer (outside Container, full width, fills bottom space) */}
      <Box sx={{ width: '100%', background: 'transparent', py: 5, mt: 8, flexShrink: 0 }} component="footer">
        <Box sx={{
          width: '100%',
          background: '#4a148c',
          borderRadius: 0,
          px: { xs: 2, md: 8 },
          py: { xs: 3, md: 5 },
          color: 'white',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'flex-start', gap: 4, maxWidth: 1200, mx: 'auto' }}>
            <Box>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'white', fontSize: 22 }}>Contact Us</Typography>
              <Typography sx={{ fontSize: 16, mb: 0.5, color: 'white' }}>ABC@gmail.com</Typography>
              <Typography sx={{ fontSize: 16, color: 'white' }}>12345678</Typography>
            </Box>
            <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'white', fontSize: 22 }}>Quick Links</Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                <li><a href="/" style={{ color: 'white', textDecoration: 'underline', fontSize: 16 }}>Home</a></li>
                <li><a href="/features" style={{ color: 'white', textDecoration: 'underline', fontSize: 16 }}>Features</a></li>
                <li><a href="/contact" style={{ color: 'white', textDecoration: 'underline', fontSize: 16 }}>Contact</a></li>
              </Box>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography sx={{ fontSize: 15, color: 'white' }}>&copy; 2023 QuestMate. All rights reserved.</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home; 