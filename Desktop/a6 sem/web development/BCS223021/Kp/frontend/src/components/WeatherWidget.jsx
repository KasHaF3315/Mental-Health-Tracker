import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    temperature: 25,
    icon: '🌤️',
    description: 'Partly Cloudy'
  });

  const updateWeather = () => {
    const temperature = Math.floor(Math.random() * 15) + 20;
    const weatherIcons = ['☀️', '🌤️', '⛅', '🌥️', '☁️'];
    const weatherDesc = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Mild', 'Warm'];
    
    setWeather({
      temperature,
      icon: weatherIcons[Math.floor(Math.random() * weatherIcons.length)],
      description: weatherDesc[Math.floor(Math.random() * weatherDesc.length)]
    });
  };

  useEffect(() => {
    updateWeather();
    const interval = setInterval(updateWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 300, mx: 'auto', my: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
        <Typography variant="h2" component="div">
          {weather.icon}
        </Typography>
        <Typography variant="h4" component="div">
          {weather.temperature}°C
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {weather.description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default WeatherWidget; 