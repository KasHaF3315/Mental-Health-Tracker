import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import routeImage from '../assets/b.jpeg';
import offlineImage from '../assets/c.jpeg';
import communityImage from '../assets/d.jpeg';

const Features = () => {
  const features = [
    {
      title: 'Smart Route Planning',
      description: 'Our AI-powered system analyzes your preferences, fitness level, and time constraints to create the perfect adventure route. Get personalized recommendations based on your interests and previous adventures.',
      image: routeImage,
      details: [
        'AI-powered route optimization',
        'Personalized recommendations',
        'Real-time weather integration',
        'Difficulty level adjustment'
      ]
    },
    {
      title: 'Offline Navigation',
      description: 'Never worry about losing your way, even without internet connection. Download detailed maps and navigate through the most remote locations with confidence.',
      image: offlineImage,
      details: [
        'Offline map downloads',
        'GPS tracking',
        'Terrain analysis',
        'Emergency location sharing'
      ]
    },
    {
      title: 'Explorer Community',
      description: 'Connect with fellow adventurers, share experiences, and discover hidden gems. Join local groups, participate in events, and make new friends who share your passion for exploration.',
      image: communityImage,
      details: [
        'Community forums',
        'Event organization',
        'Experience sharing',
        'Local guide connections'
      ]
    }
  ];

  return (
    <Container>
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Features
        </Typography>
        <Typography variant="h5" color="text.secondary" align="center" paragraph>
          Everything you need for your next adventure
        </Typography>
      </Box>

      {features.map((feature, index) => (
        <Box key={index} sx={{ mb: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={feature.image}
                alt={feature.title}
                sx={{
                  height: 400,
                  borderRadius: 2,
                  objectFit: 'cover'
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {feature.description}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {feature.details.map((detail, idx) => (
                  <Typography key={idx} variant="body1" sx={{ mb: 1 }}>
                    • {detail}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default Features; 