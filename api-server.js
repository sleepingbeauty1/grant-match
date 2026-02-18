const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { matchGrants } = require('./matching-engine');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Store submissions (in-memory for MVP, will use database later)
const submissions = [];

/**
 * POST /api/match-grants
 * Takes founder profile and returns matching grants
 */
app.post('/api/match-grants', (req, res) => {
  try {
    const { sector, stage, state, email } = req.body;
    
    // Validate input
    if (!sector || !stage || !state || !email) {
      return res.status(400).json({
        error: 'Missing required fields: sector, stage, state, email'
      });
    }
    
    // Store submission
    const submission = {
      id: Date.now(),
      email,
      sector,
      stage,
      state,
      submitted_at: new Date().toISOString(),
      ip: req.ip
    };
    submissions.push(submission);
    
    // Get matching grants
    const results = matchGrants({ sector, stage, state });
    
    // Save submission to file
    const submissionsFile = path.join(__dirname, 'submissions.jsonl');
    fs.appendFileSync(submissionsFile, JSON.stringify(submission) + '\n');
    
    res.json({
      success: true,
      message: 'Grants matched successfully',
      data: results
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Failed to process request',
      message: error.message
    });
  }
});

/**
 * GET /api/submissions
 * Get all submissions (admin only - no auth for MVP)
 */
app.get('/api/submissions', (req, res) => {
  res.json({
    total: submissions.length,
    submissions: submissions
  });
});

/**
 * GET /
 * Serve landing page
 */
app.get('/', (req, res) => {
  const landingPage = fs.readFileSync(path.join(__dirname, 'landing-page.html'), 'utf8');
  res.send(landingPage);
});

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Grant matching API running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} to view landing page`);
});
