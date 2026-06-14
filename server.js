// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Mock tracking data representing a ride in Chennai.
// The 4th coordinate is a deliberate route deviation to trigger the alert!
const mockRideData = [
  { time: '00:00', lat: 12.8231, lng: 80.0442, status: 'safe', message: 'Route verified' },
  { time: '00:03', lat: 12.8500, lng: 80.0600, status: 'safe', message: 'On track' },
  { time: '00:06', lat: 12.9000, lng: 80.0800, status: 'safe', message: 'On track' },
  { time: '00:09', lat: 12.9500, lng: 80.1500, status: 'deviation', message: 'UNEXPECTED DETOUR' }, // The Trigger!
  { time: '00:12', lat: 12.9600, lng: 80.1600, status: 'danger', message: 'USER UNRESPONSIVE' }
];

let currentIndex = 0;

// This endpoint serves the live location
app.get('/api/live-tracking', (req, res) => {
  const currentStatus = mockRideData[currentIndex];
  
  // Advance the index for the next ping, but stop at the end
  if (currentIndex < mockRideData.length - 1) {
      currentIndex++;
  }

  res.json(currentStatus);
});

// Reset endpoint so you can re-record your demo easily
app.get('/api/reset', (req, res) => {
    currentIndex = 0;
    res.send({ message: 'Simulation reset' });
});

app.listen(5000, () => console.log('Aura tracking engine running on port 5000'));