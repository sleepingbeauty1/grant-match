#!/usr/bin/env node

/**
 * Grant Matching Engine
 * Takes founder profile and returns relevant grants
 */

const fs = require('fs');
const path = require('path');

// Load grants database
const grantsData = fs.readFileSync(path.join(__dirname, 'grants-database-v1.csv'), 'utf8');
const grantLines = grantsData.split('\n').slice(1); // Skip header

const grants = grantLines
  .filter(line => line.trim())
  .map(line => {
    const [id, name, sector, stage, min_size, max_size, state, description, eligibility, deadline, link, ministry] = line.split(',');
    return {
      id: parseInt(id),
      name,
      sector,
      stage,
      min_ticket: parseInt(min_size),
      max_ticket: parseInt(max_size),
      state,
      description,
      eligibility,
      deadline,
      link,
      ministry
    };
  });

/**
 * Score a grant based on founder profile
 */
function scoreGrant(grant, founder) {
  let score = 0;
  
  // Exact sector match: +100 points
  if (grant.sector === 'All' || grant.sector === founder.sector) {
    score += 100;
  }
  
  // Exact stage match: +80 points
  if (grant.stage === 'All' || grant.stage === founder.stage) {
    score += 80;
  }
  
  // State match: +60 points
  if (grant.state === 'All' || grant.state === founder.state) {
    score += 60;
  }
  
  // Ticket size in range: +40 points (estimated ₹50L average)
  const founderTicketNeed = 5000000; // Default assumption
  if (founderTicketNeed >= grant.min_ticket && founderTicketNeed <= grant.max_ticket) {
    score += 40;
  }
  
  return score;
}

/**
 * Find matching grants for a founder
 */
function findMatchingGrants(founder, topN = 10) {
  const scored = grants.map(grant => ({
    ...grant,
    score: scoreGrant(grant, founder)
  }));
  
  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
  
  // Return top N
  return scored.slice(0, topN).map(grant => ({
    id: grant.id,
    name: grant.name,
    description: grant.description,
    eligibility: grant.eligibility,
    deadline: grant.deadline,
    link: grant.link,
    match_score: grant.score
  }));
}

/**
 * Main matching logic
 */
function matchGrants(founderProfile) {
  const founder = {
    sector: founderProfile.sector || 'Other',
    stage: founderProfile.stage || 'Seed',
    state: founderProfile.state || 'All'
  };
  
  const matches = findMatchingGrants(founder, 10);
  
  return {
    founder_profile: founder,
    total_grants: grants.length,
    matching_grants: matches,
    generated_at: new Date().toISOString()
  };
}

// Export for use as module
module.exports = { matchGrants, findMatchingGrants };

// Test if run directly
if (require.main === module) {
  const testProfile = {
    sector: 'fintech',
    stage: 'Seed',
    state: 'Maharashtra'
  };
  
  const results = matchGrants(testProfile);
  console.log(JSON.stringify(results, null, 2));
}
