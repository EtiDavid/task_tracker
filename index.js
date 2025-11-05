require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();




//const matches = [
  //{ id: 1, home: 'Arsenal', away: 'Chelsea', score: '2-0' },
  //{ id: 2, home: 'Barcelona', away: 'PSG', score: '3-3' }
//];

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
   .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log('📦 Database:', mongoose.connection.name);
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Schema + Model
const matchSchema = new mongoose.Schema({
  home: String,
  away: String,
  score: String
});

const Match = mongoose.model('matches', matchSchema);

// Root route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Football API</h1><p>Try <a href="/matches">/matches</a> to see the data.</p>');
});

// Matches route
//app.get('/matches', (req, res) => {
  //res.json(matches);
//});
app.get('/matches', async (req, res) => {
  try {
    console.log('📡 Fetching matches from MongoDB...');
    const matches = await Match.find();
    res.json(matches);
  } catch (error) {
    console.error('❌ Error fetching matches:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).send('Not Found');



});
module.exports = app;

