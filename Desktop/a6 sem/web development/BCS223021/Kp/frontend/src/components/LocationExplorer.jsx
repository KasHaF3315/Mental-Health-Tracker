import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Typography,
  Box
} from '@mui/material';

const locationData = {
  'Islamabad': {
    attractions: ['Margalla Hills', 'Faisal Mosque', 'Daman-e-Koh', 'Pakistan Monument', 'Lok Virsa Museum'],
    bestTime: 'October to April',
    description: 'Islamabad offers a perfect blend of natural beauty and modern architecture.'
  },
  'Lahore': {
    attractions: ['Badshahi Mosque', 'Lahore Fort', 'Food Street', 'Shalimar Gardens', 'Walled City'],
    bestTime: 'October to March',
    description: 'Experience the rich cultural heritage and delicious cuisine of Lahore.'
  },
  'Karachi': {
    attractions: ['Clifton Beach', 'Port Grand', 'Mohatta Palace', 'Quaid\'s Mausoleum', 'Empress Market'],
    bestTime: 'November to February',
    description: 'Discover the vibrant city life and beautiful beaches of Karachi.'
  }
};

const LocationExplorer = ({ open, onClose, city }) => {
  const cityData = locationData[city];

  if (!cityData) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{city}</DialogTitle>
      <DialogContent>
        <Typography paragraph>{cityData.description}</Typography>
        
        <Typography variant="h6" gutterBottom>Top Attractions:</Typography>
        <List>
          {cityData.attractions.map((attraction, index) => (
            <ListItem key={index}>
              <ListItemText primary={attraction} />
            </ListItem>
          ))}
        </List>
        
        <Box mt={2}>
          <Typography variant="subtitle1">
            <strong>Best Time to Visit:</strong> {cityData.bestTime}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LocationExplorer; 