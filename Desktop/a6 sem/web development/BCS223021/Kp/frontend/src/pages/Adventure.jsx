import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Chip,
  Rating,
  Divider
} from '@mui/material';
import heroImage from '../assets/a.jpeg';

const Adventure = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const adventureDetails = {
    title: 'Mountain Trail Expedition',
    location: 'Rocky Mountains, Colorado',
    difficulty: 'Moderate',
    duration: '3 days',
    distance: '25 miles',
    elevation: '2,500 ft',
    description: 'Experience the breathtaking beauty of the Rocky Mountains on this three-day expedition. This trail offers stunning views, diverse wildlife, and challenging terrain perfect for intermediate hikers.',
    highlights: [
      'Scenic mountain views',
      'Wildlife spotting opportunities',
      'Crystal clear lakes',
      'Ancient pine forests'
    ],
    requirements: [
      'Hiking boots',
      'Waterproof jacket',
      'Tent',
      'Sleeping bag',
      'First aid kit'
    ]
  };

  const handleSubmitReview = () => {
    // Here you would typically send the review to your backend
    console.log('Review submitted:', { rating, comment });
    setRating(0);
    setComment('');
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <CardMedia
          component="img"
          height="400"
          image={heroImage}
          alt={adventureDetails.title}
          sx={{
            borderRadius: 2,
            mb: 4
          }}
        />

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" gutterBottom>
              {adventureDetails.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {adventureDetails.location}
            </Typography>

            <Box sx={{ my: 3 }}>
              <Typography variant="h5" gutterBottom>
                Overview
              </Typography>
              <Typography paragraph>
                {adventureDetails.description}
              </Typography>
            </Box>

            <Box sx={{ my: 3 }}>
              <Typography variant="h5" gutterBottom>
                Highlights
              </Typography>
              <Grid container spacing={2} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
                {adventureDetails.highlights.map((highlight, index) => (
                  <Grid item key={index}>
                    <Chip label={highlight} color="primary" />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ my: 3 }}>
              <Typography variant="h5" gutterBottom>
                Requirements
              </Typography>
              <Grid container spacing={1}>
                {adventureDetails.requirements.map((item, index) => (
                  <Grid item key={index}>
                    <Chip label={item} variant="outlined" />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ my: 3 }}>
              <Typography variant="h5" gutterBottom>
                Leave a Review
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  size="large"
                />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleSubmitReview}
                disabled={!rating || !comment}
              >
                Submit Review
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Adventure Details
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" paragraph>
                    <strong>Difficulty:</strong> {adventureDetails.difficulty}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Duration:</strong> {adventureDetails.duration}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Distance:</strong> {adventureDetails.distance}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Elevation Gain:</strong> {adventureDetails.elevation}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Book This Adventure
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Adventure; 