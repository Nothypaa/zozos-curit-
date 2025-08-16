# Schema-GMB Alignment & Montpellier SEO Optimization Plan

## 🎯 Strategic Objective
Achieve perfect schema-GMB alignment to rank #1 for "vidéosurveillance Montpellier" and dominate local search results in Hérault.

---

## 📊 Current Status Analysis

### ✅ Strengths Identified
- Comprehensive LocalBusiness schema implementation
- Consistent NAP (Name, Address) across all pages
- Strong service-specific content structure
- Good geographic targeting (Montpellier, Hérault)

### 🚨 Critical Issues Found
1. **Phone Format Inconsistency**: Schema uses `+33767563926` vs planned GMB `07 67 56 39 26`
2. **Missing Business Hours**: No `openingHoursSpecification` in schema
3. **Incomplete Address Data**: `addressRegion: "Hérault"` missing from service pages
4. **No GMB Listing**: Business not found in Google Maps/Business Profile
5. **Missing Social Signals**: No `sameAs` properties for social media

---

## 🚀 Phase 1: Critical Schema Standardization (Priority 1)

### Task 1.1: Fix Phone Number Format Across All Pages
**Target Files:**
- `/index.html` (lines 74, 214, 1345, 1371, 1390)
- `/services/videosurveillance.html` (lines 57, 111, 505, 529, 548)
- `/services/videosurveillance-entrepot.html` (lines 58, 70, 96)
- `/contact.html` (lines 90, 161, 196, 229, 490)
- `/blog.html` (lines 85, 193, 228, 365)
- `/faq.html` (lines 100, 135, 168)

**Action Required:**
```json
// Current (inconsistent):
"telephone": "+33767563926"

// Change to (standardized):
"telephone": "+33 7 67 56 39 26"
```

**HTML Links Update:**
```html
<!-- Current: -->
<a href="tel:+33767563926" ...>07 67 56 39 26</a>

<!-- Change to: -->
<a href="tel:+33767563926" ...>+33 7 67 56 39 26</a>
```

### Task 1.2: Add Missing addressRegion to All LocalBusiness Schemas
**Target Files:**
- `/services/videosurveillance.html` (line 58-64)
- `/services/videosurveillance-entrepot.html` (line 59-65)
- `/index.html` (lines 81-88, 156-162, 169-175)

**Action Required:**
```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "1 place charles de gaulle",
  "addressLocality": "Castelnau-le-Lez",
  "addressRegion": "Hérault",  // ← ADD THIS LINE
  "postalCode": "34170",
  "addressCountry": "FR"
}
```

### Task 1.3: Add Business Hours to All LocalBusiness Schemas
**Target Files:** All pages with LocalBusiness schema

**Action Required:**
```json
// Add this property to every LocalBusiness schema:
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00"
  }
],
"openingHours": "Mo-Fr 08:00-18:00"
```

### Task 1.4: Add Social Media and Maps Integration
**Target Files:** All pages with LocalBusiness schema

**Action Required:**
```json
// Add these properties to every LocalBusiness schema:
"sameAs": [
  "https://www.facebook.com/p/ZOZO-Sécurité-100086879220798/",
  "https://fr.linkedin.com/in/zozo-sécurité-81a301253",
  "https://www.instagram.com/zozo_securite/"
],
"hasMap": "https://maps.google.com/?q=1+place+charles+de+gaulle,34170+Castelnau-le-Lez",
"logo": "https://www.zozosecurite.fr/images/zozosécuritélogo.jpg"
```

---

## 🏢 Phase 2: Google My Business Creation & Optimization (Priority 1)

### Task 2.1: Create/Claim GMB Listing
**Business Information (EXACT match with schema):**
```
Business Name: ZOZO Sécurité
Address: 1 place charles de gaulle, 34170 Castelnau-le-Lez, France
Phone: +33 7 67 56 39 26
Website: https://www.zozosecurite.fr
Email: contact@zozosecurite.fr
```

**Business Categories:**
- **Primary**: "Security System Service"
- **Secondary**: "Security Guard Service", "Burglar Alarm Store", "CCTV Installer"

### Task 2.2: Service Area Configuration
**Primary Service Areas:**
- Montpellier (3 km radius)
- Castelnau-le-Lez (5 km radius)

**Secondary Service Areas:**
- Hérault (entire department)
- Specific cities: Béziers, Sète, Lunel, Nîmes

**Radius Setting:** 50 km from Castelnau-le-Lez

### Task 2.3: GMB Photo Upload Strategy
**Upload Order (15-20 photos total):**
1. **Logo** (profile photo)
2. **Storefront/Office** (if applicable)
3. **Team Photos** (3-4 images)
4. **Equipment Photos**:
   - Caméras IP Hikvision
   - DVR/NVR systems
   - Installation tools
5. **Installation Examples**:
   - Before/after shots
   - Different building types
   - Montpellier/Hérault locations
6. **Vehicle/Branding** (2-3 photos)

### Task 2.4: GMB Posts Strategy
**Weekly Content Schedule:**
- **Monday**: Service spotlight
- **Wednesday**: Local installation showcase
- **Friday**: Security tips for Montpellier businesses

---

## 📍 Phase 3: Montpellier-Specific Content Optimization (Priority 2)

### Task 3.1: Create Montpellier Landing Page
**File**: `/montpellier-videosurveillance.html`

**Target Keywords:**
- Primary: "vidéosurveillance Montpellier"
- Secondary: "installation caméra Montpellier"
- Long-tail: "système sécurité entreprise Montpellier"

**Content Structure:**
```html
<h1>Installation Vidéosurveillance Montpellier - Expert Sécurité Hérault</h1>

<!-- LocalBusiness Schema specific to Montpellier -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ZOZO Sécurité - Montpellier",
  "description": "Expert installation vidéosurveillance Montpellier. +500 installations dans l'Hérault. Intervention rapide, devis gratuit.",
  // ... complete schema with all Phase 1 improvements
  "areaServed": [
    {
      "@type": "City",
      "name": "Montpellier",
      "sameAs": "https://fr.wikipedia.org/wiki/Montpellier"
    }
  ]
}
</script>
```

### Task 3.2: Enhance Existing Pages with Montpellier Keywords
**Files to Update:**
- `/index.html`: Add "Montpellier" to meta description
- `/services/videosurveillance.html`: Include Montpellier case studies
- `/contact.html`: Emphasize Montpellier service area

### Task 3.3: Create Location-Specific Service Pages
**New Pages to Create:**
1. `/services/videosurveillance-commerce-montpellier.html`
2. `/services/videosurveillance-entreprise-herault.html`
3. `/services/maintenance-cameras-montpellier.html`

---

## 🔗 Phase 4: Local Citation & Authority Building (Priority 2)

### Task 4.1: Local Business Directory Submissions
**Priority Directories (NAP must be identical):**
1. **Pages Jaunes** (pagesjaunes.fr)
2. **Yelp France** (yelp.fr)
3. **Google Business Profile** (primary)
4. **Waze Local** (waze.com)
5. **Apple Maps Connect**
6. **Bing Places for Business**

**Submission Data Template:**
```
Name: ZOZO Sécurité
Address: 1 place charles de gaulle, 34170 Castelnau-le-Lez
Phone: +33 7 67 56 39 26
Website: https://www.zozosecurite.fr
Categories: Sécurité électronique, Installation vidéosurveillance, Système alarme
Description: Installation systèmes vidéosurveillance Montpellier et Hérault. +500 installations, équipe certifiée, intervention 24h/7j.
```

### Task 4.2: Local Partnership Content
**Content Strategy:**
- Partner with Montpellier business associations
- Guest posts on local business blogs
- Collaborations with complementary services (electricians, security firms)

---

## 📈 Phase 5: Review Generation & Reputation Management (Priority 3)

### Task 5.1: Review Campaign Launch
**Target**: 15-20 reviews in 60 days

**Strategy:**
1. **Week 1-2**: Contact last 10 satisfied customers
2. **Week 3-4**: Email campaign to database with review incentive
3. **Week 5-6**: Follow-up with new customers post-installation

**Email Template:**
```
Subject: Votre installation ZOZO Sécurité - Partagez votre expérience

Bonjour [Name],

Votre système de vidéosurveillance fonctionne-t-il à votre satisfaction ?

Si c'est le cas, pourriez-vous partager votre expérience sur Google ?
Cela aide d'autres entreprises de Montpellier à nous faire confiance.

[Direct Google Review Link]

Merci pour votre confiance,
L'équipe ZOZO Sécurité
```

### Task 5.2: Review Response Strategy
**Response Templates:**

**Positive Reviews:**
```
Merci [Name] pour votre confiance ! 
Nous sommes ravis que votre installation à [Location] réponde à vos attentes.
L'équipe ZOZO Sécurité reste à votre disposition pour toute maintenance.
```

**Negative Reviews:**
```
Bonjour [Name],
Nous prenons très au sérieux votre retour. 
Pouvez-vous nous contacter au +33 7 67 56 39 26 pour résoudre ce problème ?
Nous nous engageons à améliorer continuellement nos services à Montpellier.
```

---

## 🔍 Phase 6: Technical SEO & Schema Validation (Priority 2)

### Task 6.1: Schema Markup Testing
**Tools to Use:**
1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Google Search Console**: Monitor rich snippets performance

**Testing Checklist:**
- [ ] All LocalBusiness schemas validate
- [ ] No schema errors detected
- [ ] Rich snippets appear in search results
- [ ] Business information consistent across tools

### Task 6.2: Google Search Console Optimization
**Setup Required:**
1. Verify website ownership
2. Submit updated sitemap.xml
3. Monitor "Local Business" rich results
4. Track Montpellier keyword performance

---

## 📊 Phase 7: Monitoring & Performance Tracking (Ongoing)

### Task 7.1: Local SEO KPIs
**Weekly Tracking:**
- Google My Business insights
- Local search rankings for target keywords
- Website traffic from Montpellier area
- Phone calls generated from search

**Monthly Analysis:**
- Competitor GMB performance
- Review sentiment analysis
- Schema markup performance in search results

### Task 7.2: Keyword Ranking Targets

**Primary Keywords (Target Position 1-3):**
- "vidéosurveillance Montpellier"
- "installation caméra Montpellier"
- "système sécurité Hérault"

**Secondary Keywords (Target Position 1-5):**
- "caméra surveillance Castelnau-le-Lez"
- "vidéosurveillance entreprise Montpellier"
- "installation alarme Hérault"

**Long-tail Keywords (Target Position 1-10):**
- "devis gratuit vidéosurveillance Montpellier"
- "expert caméra sécurité Hérault"
- "maintenance système surveillance Montpellier"

---

## ⚡ Quick Wins Implementation Order

### Week 1 (Immediate Impact):
1. ✅ Fix phone number format across all schemas
2. ✅ Add missing addressRegion to all schemas
3. ✅ Create Google My Business listing
4. ✅ Upload GMB photos

### Week 2 (Foundation Building):
1. ✅ Add business hours to all schemas
2. ✅ Add social media sameAs properties
3. ✅ Submit to major local directories
4. ✅ Launch review generation campaign

### Week 3-4 (Content & Authority):
1. ✅ Create Montpellier landing page
2. ✅ Optimize existing pages for local keywords
3. ✅ Set up Google Search Console monitoring
4. ✅ Begin local partnership outreach

---

## 💡 Pro Tips for Maximum Impact

### Schema Best Practices:
- Keep all LocalBusiness schemas identical across pages
- Use specific business categories over generic ones
- Include complete address information including region
- Add opening hours even if they change seasonally

### GMB Optimization:
- Post fresh content weekly
- Respond to all reviews within 24 hours
- Use local keywords in GMB posts
- Upload new photos monthly

### Local SEO Strategy:
- Create separate landing pages for each major service area
- Include local landmarks and neighborhoods in content
- Build relationships with other Montpellier businesses
- Monitor and respond to local business mentions

---

## 🎯 Expected Results Timeline

**2-4 Weeks:**
- Google My Business appears in local search
- Schema rich snippets start showing
- Local directory listings go live

**1-2 Months:**
- Local pack rankings improve significantly
- Organic traffic from Montpellier increases 40-60%
- Phone calls from local search double

**3-6 Months:**
- Rank #1-3 for primary local keywords
- Become dominant local player in Hérault
- Generate 20+ qualified leads monthly from local search

---

*Last Updated: August 16, 2025*
*Next Review: Weekly during implementation, then monthly*