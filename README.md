# Grant Match - Government Grants Discovery Platform

**Get matched with government grants in 5 minutes. Save 20+ hours of hunting.**

---

## What We're Building

Indian startup founders waste 20+ hours searching fragmented government grant programs scattered across DSIR, DPIIT, StartupIndia, state schemes, and countless others.

**Grant Match** solves this with:
1. **One landing page** - Quick 5-min questionnaire
2. **Personalized matching** - Algorithm finds relevant grants based on sector/stage/location
3. **Direct links** - Apply immediately
4. **Accurate database** - 200+ verified government programs

---

## Current Status: MVP Ready (Feb 18, 2026)

### What's Built
✅ Landing page - Clean, conversion-focused design
✅ Grants database - 50 verified government programs
✅ Matching engine - Rule-based algorithm (sector/stage/location)
✅ API server - Express.js backend
✅ Ad strategy - Meta ads validation plan

### What's Not Built Yet
- Database expansion (currently 50, plan to expand to 200+)
- Payment processing (for ₹5000/month pro tier)
- Email reminders & deadline tracking
- PDF export & application guides
- Admin dashboard

---

## Architecture

```
landing-page.html
    ↓ (user fills questionnaire)
api-server.js (Express)
    ↓
matching-engine.js (algorithm)
    ↓ (returns top 10 grants)
grants-database-v1.csv (50 programs)
    ↓
User sees personalized grants + links
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Start server
npm start

# Open http://localhost:3000
```

---

## Database Schema

Each grant has:
- `name` - Grant name
- `sector` - Applicable sector (All, Fintech, DeepTech, etc.)
- `stage` - Applicable stage (Idea, Pre-Seed, Seed, Series A)
- `ticket_size_min/max` - Funding range in rupees
- `state` - State applicability
- `eligibility` - Short eligibility summary
- `deadline` - Application deadline (Annual, Quarterly, Rolling, Ongoing)
- `link` - Official application link
- `ministry` - Providing ministry

---

## Matching Algorithm

Scores each grant based on:
1. **Sector match** (+100 if exact, +50 if "All")
2. **Stage match** (+80 if exact, +50 if "All")
3. **State match** (+60 if exact, +0 if "All")
4. **Ticket size** (+40 if in range)

Returns top 10 grants sorted by score.

**Why this approach:** Simple, transparent, works without ML (faster iteration)

---

## Validation Plan: Meta Ads

**Budget:** ₹25,000 for 1 week
**Goal:** 500-1000 form submissions
**Success metric:** Cost per submission ₹25-50

### Ad Angles
1. Time savings: "Save 20+ hours of grant hunting"
2. Opportunity: "Missing ₹50L+ in government grants"
3. Social proof: "500+ startups already matched"

### What We Learn
- Does the problem actually exist? (CTR tells us)
- Which founder types are interested? (Demographic breakdown)
- Which grants matter most? (Click patterns)
- Is there willingness to pay? (Intent signals)

---

## Timeline

| Phase | Duration | Goal |
|-------|----------|------|
| Ads Validation | Week 1 | 500-1K founder profiles |
| Database Build | Week 2 | 200+ accurate programs |
| MVP Launch | Week 3 | Public beta |
| Customer Acquisition | Week 4 | 20-30 paying customers |

---

## Founders

- **codercat** - Co-founder, vision
- **sleepingbeauty** - Co-founder, execution

---

## Files

```
.
├── landing-page.html           # Landing page with questionnaire
├── api-server.js               # Express API server
├── matching-engine.js          # Grant matching algorithm
├── grants-database-v1.csv      # 50 verified grants
├── package.json                # Node dependencies
├── AD-STRATEGY.md              # Meta ads campaign plan
├── STRATEGY.md                 # Initial market research
├── EXECUTION-PLAN.md           # Full execution roadmap
└── README.md                   # This file
```

---

## Next Steps

1. **Deploy landing page** (Vercel or similar)
2. **Set up Meta ads** (test with 3 ad creatives)
3. **Monitor for 1 week** (collect data, optimize)
4. **Analyze results** (understand founder segments)
5. **Build full MVP** (based on what we learned)

---

## Business Model

**Free tier:** Basic grant matching (10-15 grants)
**Pro tier:** ₹5,000/month
- Unlimited grants
- Deadline reminders via email
- PDF export for bulk applications
- Direct links to all programs
- Application guides

---

## Notes

This is an MVP. The goal is validation, not perfection.

We're testing one simple hypothesis: **Indian startup founders will pay for a tool that saves them 20+ hours on grant discovery.**

If ads show demand, we build.
If ads fail, we pivot.

Let's go. 🚀

---

_Built with intention. Not another half-assed startup idea._
