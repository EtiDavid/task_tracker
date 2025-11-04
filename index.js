const express = require('express');
const app = express();


const matches = [
  { id: 1, home: 'Arsenal', away: 'Chelsea', score: '2-1' },
  { id: 2, home: 'Barcelona', away: 'PSG', score: '3-3' }
];

// Root route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Football API</h1><p>Try <a href="/matches">/matches</a> to see the data.</p>');
});

// Matches route
app.get('/matches', (req, res) => {
  res.json(matches);
});

// Start server
//app.listen(PORT, () => {
  //console.log(`Server running on http://localhost:${PORT}`);
//});

module.exports = app;

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

