# Experience Management Strategy

## Current Situation
You have 4 experiences now, but as you accumulate more hackathons, speaking engagements, and events, you'll need a strategy to keep your portfolio focused and impactful.

## Recommended Approach

### 1. **Categorize Your Experiences**
Add a `category` field to your experience data:
- `featured` - Most impressive/recent achievements (show on homepage)
- `hackathon` - Hackathon participations
- `speaking` - Speaking engagements and talks
- `leadership` - Leadership roles and positions
- `volunteer` - Community service and volunteering
- `award` - Awards and recognitions

### 2. **Priority System**
Add a `priority` field (1-5) to rank experiences:
- Priority 1: Major achievements (hackathon wins, keynote speeches)
- Priority 2: Significant roles (team lead, organizer)
- Priority 3: Regular participation (attendee, volunteer)
- Priority 4-5: Archive (keep for records but don't display)

### 3. **Display Strategy**

#### Homepage (Current Section)
- Show only **top 4-6 featured experiences**
- Filter by `featured: true` or `priority: 1-2`
- Focus on most recent and impactful

#### Dedicated Experience Page (Future)
Create `/experience` page with:
- **Timeline view** - All experiences chronologically
- **Category filters** - Filter by type (hackathon, speaking, etc.)
- **Search functionality** - Search by title, company, or description
- **Expandable cards** - Click to see full details

### 4. **Data Structure Update**

```json
{
  "title": "Hack The Flood 2025",
  "company": "Computer Professionals' Union",
  "period": "December 6, 2025",
  "role": "Backend & AI Engineer",
  "description": "Built a 'Hybrid Brain' architect.",
  "type": "Hackathon",
  "category": "hackathon",
  "priority": 1,
  "featured": true,
  "tags": ["AI", "Backend", "Python", "Winner"],
  "achievements": [
    "Won 1st place",
    "Built AI-powered system",
    "Collaborated with 4-person team"
  ],
  "links": {
    "project": "https://github.com/...",
    "certificate": "https://...",
    "demo": "https://..."
  }
}
```

### 5. **Maintenance Schedule**

**Quarterly Review (Every 3 months):**
- Review all experiences
- Update priorities based on relevance
- Archive outdated items (priority 4-5)
- Add new achievements

**Annual Cleanup:**
- Remove experiences older than 3 years (unless major achievements)
- Update featured experiences
- Refresh descriptions

### 6. **Rules of Thumb**

**Homepage Display:**
- Maximum 6 experiences
- Only show last 2 years
- Focus on diversity (mix of hackathons, leadership, speaking)

**When to Archive:**
- Participation-only events after 1 year
- Minor roles after 2 years
- Keep major wins/awards indefinitely

**What to Feature:**
- Competition wins (1st-3rd place)
- Speaking engagements (especially keynotes)
- Leadership positions (team lead, organizer)
- Significant projects with measurable impact

### 7. **Scalability Options**

**Option A: Separate Pages**
```
/experience - Full timeline
/experience/hackathons - Hackathon-specific
/experience/speaking - Speaking engagements
/experience/leadership - Leadership roles
```

**Option B: Tabbed Interface**
Single `/experience` page with tabs for each category

**Option C: Filterable Timeline**
Single page with filters and search (recommended for now)

### 8. **Implementation Priority**

**Phase 1 (Now):**
- ✅ Add Experience link to header
- Add `featured` boolean to experience.json
- Filter homepage to show only featured experiences

**Phase 2 (When you have 10+ experiences):**
- Create dedicated `/experience` page
- Add category and priority fields
- Implement filtering

**Phase 3 (When you have 20+ experiences):**
- Add search functionality
- Implement pagination
- Create category-specific pages

## Example: Updated experience.json

```json
[
  {
    "title": "Hack The Flood 2025",
    "company": "Computer Professionals' Union",
    "period": "December 6, 2025",
    "role": "Backend & AI Engineer",
    "description": "Built a 'Hybrid Brain' architect that won 1st place.",
    "type": "Hackathon",
    "category": "hackathon",
    "priority": 1,
    "featured": true,
    "tags": ["AI", "Backend", "Python", "Winner"],
    "achievements": [
      "🏆 Won 1st place out of 50+ teams",
      "Built AI-powered flood monitoring system",
      "Integrated satellite imagery with ML models"
    ]
  },
  {
    "title": "Tech Talk: Building RAG Systems",
    "company": "AWS Learning Club",
    "period": "March 15, 2026",
    "role": "Speaker",
    "description": "Delivered technical talk on RAG architecture to 100+ students.",
    "type": "Speaking",
    "category": "speaking",
    "priority": 2,
    "featured": true,
    "tags": ["AI", "RAG", "Public Speaking"]
  }
]
```

## Quick Decision Matrix

| Scenario | Action |
|----------|--------|
| Won a hackathon | Priority 1, Featured ✅ |
| Participated in hackathon | Priority 3, Not featured |
| Keynote speaker | Priority 1, Featured ✅ |
| Panel participant | Priority 2, Maybe featured |
| Team lead role | Priority 1-2, Featured ✅ |
| Team member | Priority 3, Not featured |
| Award/Recognition | Priority 1, Featured ✅ |
| Workshop attendee | Priority 4, Archive after 6 months |

## Conclusion

Start simple with the featured flag, then scale up as needed. The key is to keep your homepage focused on your best work while maintaining a complete record elsewhere.
