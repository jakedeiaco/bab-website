# MEMORY.md - Long-Term Memory

## About Jake

- Full name: Jake Deiaco, 42, lives in Pacifica, CA
- Family: wife + two kids (Jacob, 12 and Talla, 7)
- Owns Bay Area Boxing in Belmont, CA

## Bay Area Boxing

- 5,000 sq ft boutique combat sports gym
- Disciplines: Boxing, Muay Thai Kickboxing, BJJ
- NOT a big box gym — serious, community-driven
- Target: adults 18-45, real training, not fitness theater
- Market: Bay Area (San Jose to SF), competing against big-budget gyms
- Edge: authenticity + community

## My Role

Vin — Director of Digital Content, Social Media, Online Visibility
Primary platforms: Instagram (priority), Facebook
Tone: authentic, athletic, credible, local. Think fighter, write influencer.
No corporate speak. No cringe motivational quotes.

## BAB Scheduler Project — LAUNCHED & STABLE (as of 2026-04-26)

- Built: Node.js + Express + SQLite app for class bookings
- Path: `/Users/openclaw/.openclaw/workspace/projects/bab-scheduler`
- **Live on Railway:** https://bab-scheduler-production-b000.up.railway.app
- **Staging (dev branch):** https://bab-scheduler-dev-staging.up.railway.app — NEVER push dev → main without Jake explicitly saying so
- **Custom domain:** https://schedule.bayareaboxing.net
- **GitHub:** https://github.com/jakedeiaco/bab-scheduler (auto-deploy on push to main)
- Railway project: bab-scheduler (project ID: c0619d2c-ead3-48e7-8371-27a696dd61b0)
- Railway account: bayareaboxing@gmail.com
- Admin password: bab1belmont | Staff password: DeskStaff2026

### Features (complete)
- Public schedule: mobile (single-day agenda) + desktop (weekly grid), no past navigation
- Member portal: register, login, book classes, cancel, view bookings, check-in settings, change password, forgot password (email reset)
- Booking: confirmation email, 24h + 1h reminders, waitlist with auto-promotion
- Calendar export: Both Google Calendar + Apple/Outlook (.ics) buttons on booking confirmations (member portal, admin portal, staff emails) — deployed 2026-04-26 ✅
- Google Calendar all-day event bug FIXED 2026-05-05: Android users were getting all-day events instead of timed classes. Root cause: local time string without UTC/Z suffix. Fix: convert Pacific→UTC with Z. Deployed ✅
- ICS timezone bug FIXED 2026-05-06: Floating datetimes had no timezone identifier → calendar apps interpreted times in device locale. Root cause: offset computed from current date instead of class date, causing DST boundary errors for future bookings. Fix: `gcFmt()` now uses class date, `buildIcsUrl()` uses `DTSTART;TZID=America/Los_Angeles` format for automatic DST handling. Deployed ✅
- Google Calendar all-day event bug (email) FIXED 2026-05-07: Same all-day bug resurfaced for Yasmine. Root cause: `email.js` `gcFmt()` used hardcoded `-0700` offset format — Google Calendar can't reliably parse offset format and falls back to all-day. Member portal (`index.html`) had been fixed to UTC+Z on May 5 but `email.js` never got the same fix. Fix: applied identical Pacific→UTC+Z conversion to `email.js`. ⚠️ RULE: Any `gcFmt()` change must be applied to BOTH `index.html` AND `email.js` — they are separate implementations of the same logic. Deployed ✅
- Duplicate booking prevention: "You're registered ✓" state on card, modal shows registered status
- Admin dashboard: member management, activate/freeze/cancel, class pack support, booking management, email blast, staff notes, check-in, force-book
- Admin calendar: sticky day headers (MON Apr 27, TUE Apr 28…) with dynamic JS offset calculation for pin position — deployed 2026-04-26 ✅
- Staff portal (/staff.html): calendar view + attendee list, password: DeskStaff2026, reschedule feature (⇄ Reschedule button on attendees) — deployed 2026-05-06 ✅
- Kiosk check-in: nickname + 4-digit PIN
- Membership tiers: Gold (unlimited + open gym), Silver (12/cycle), Bronze (8/cycle), Part-Time (4/cycle), Class Pack (punch card)
- Class pack: shows "X remaining" not usage/cycle; no billing cycle display
- Email: Brevo API (verified sender: schedule.bayareaboxing@gmail.com as "Bay Area Boxing")
- Activation email: fires automatically when member status set to active
- Resend buttons: registration email + activation email in admin profile
- Forgot password: /reset-password.html, 1-hour token, email reset link
- Admin password reset button in member profile
- Member stats badges: Upcoming/Attended/Cancelled/Cycle counts now timezone-aware (Pacific time) and include all confirmed bookings, not just kiosk check-ins — deployed 2026-04-26 ✅
- Sub-member/family accounts: Full workflow complete (tier badges, freeze/unfreeze/cancel, color-coded bookings, family section, admin delete) — shipped 2026-05-02 ✅
- Nightly backup: Google Drive → BAB-Scheduler-Backups/ at 2 AM (30-day retention) ✅
- Morning briefing: Telegram at 7:30 AM, includes backup run + production health ✅

### Header layout (all pages)
- Hamburger/nav LEFT, logo RIGHT — consistent across index, member, admin, staff
- Mobile hamburger nav on admin + staff pages

### Backup status
- Google Drive backups: running nightly at 2 AM ✅
- Last backup: 2026-04-24 07:30 AM
- Code backup: GitHub main branch, all commits pushed ✅

### Cron jobs
- Morning Briefing: 7:30 AM daily → Telegram ✅
- Nightly Backup: 2:00 AM daily → Google Drive ✅  
- End-of-Day Memory Log: 11:45 PM daily ✅
- Weekly Session Cleanup: 3:00 AM Sunday ✅

### Pending / future
- Member email change (not built)
- GA4 setup — post-website launch, fresh property created, ready to configure
- Copy refinements — Jake to specify which pages need wording updates (website live as of 2026-05-06)

### Mobile Schedule Page (April 13, 2026)
- **PWA decision (FINAL):** Shelved permanently. Service worker cached old API errors through deploys. Benefit (offline) doesn't outweigh risk. Home screen shortcut is simpler and safer.
- **Architecture:** Schedule is now public (no login wall). Root redirects to `/index.html`. Single-day mobile view with ← → arrows for navigation.
- **Deployed ~6:40 PM April 13** after fixing 6 root causes (service worker cache, redirect loop, competing DOM containers, breakpoint mismatch, nav overwrites, hidden render targets).
- **Reminder test pending (April 14 evening):** Jake booked two classes after 1-hour cutoff. 24-hour reminders should fire Tue 7:30–7:45 PM PT. If they arrive correctly, timezone fix is confirmed working.
- Timezone handling: All reminders now sent in member's local time (Pacific currently).

## Development Rules (BAB Scheduler)

**Always impact-check before deploying.** Before adding any feature:
1. What existing routes/functions does this touch?
2. Could this break login, booking, or member data?
3. Does this require a DB change (migration risk)?
4. Test the happy path AND the failure path mentally before committing.

If the answer to #2 or #3 is yes — review the affected code first, then build carefully.

### Critical Patterns (2026-04-26)

**Timezone handling:** Always calculate date-based logic in Pacific time, not UTC. Bug example: member portal stats badges used `new Date()` to calc "today", which was UTC. At 6:33 PM Pacific = Apr 27 UTC. Bookings on Apr 26 fell through — not upcoming (past in UTC) and not attended (no check-in) — but counted toward cycle usage. Fix: switch all date logic to Pacific (`Intl.DateTimeFormat` with 'America/Los_Angeles').

**Database wrapper vs raw instance:** In server.js, `db` is the wrapper module, `dbRaw` is better-sqlite3. For direct `.prepare()` calls, always use `dbRaw`. Bug example: `/api/admin/members/:id/freeze` called `db.prepare()` → instant 500. Fix: use `dbRaw.prepare()` instead.

**Attendance counting:** Changed definition of "attended" from "kiosk PIN check-in" to "confirmed booking on past date, regardless of kiosk scan". Most real members never use kiosk; this makes stats accurate.

### Admin UX Improvements (2026-04-28)

**Capacity Override (Extra Spots)** — Admin class modal now has `[−] X extra spots [+]` control. Per-day overrides stored in `class_capacity_overrides` table (date + classId). Member schedule reflects updated capacity in real-time. Floors at 0.

**Waitlist Visibility** — Admin class modal shows waitlist section below confirmed attendees, auto-hides if empty. Populated via server JOIN on bookings (status='waitlist').

**Clickable Member Names** — Registered members shown in red/underlined, clickable → opens member profile modal. Non-registered (walk-ins) shown in muted gray, not clickable. Server does JOIN to attach member_id to bookings. Member profile modal moved outside `view-members` div so it renders from any tab.

**Attendee Row Alignment** — Buttons (Attended/Reschedule/Cancel) now in single horizontal flex row per attendee. Fixed `<td>` display inconsistencies across browsers.

## Operating Preferences

**Fix first, report after** — When something breaks and I have access + can diagnose + can fix: do it immediately, THEN tell Jake what happened. Don't escalate problems I can resolve. He should wake up to solutions, not alerts.

**Example (2026-03-26):** WhatsApp gateway flapped 6 times throughout the day. After exhausting local fixes (restarts, state clear), I diagnosed it as server-side (consistent 60s cycle, 499/503 errors). Disabled the channel to restore stability, reported the issue to Jake with full context. System stayed operational. When support responds with a fix, I'll re-enable and re-link.

**Screenshots first, code second** — For any UI/UX bug, ask for a screenshot before writing a single line of code. A 2-second look at the screen beats 45 minutes of blind guessing. Jake is good at sending screenshots when asked.

See Autonomy Ladder below for what qualifies.

## Autonomy Ladder

### Tier 1 — Act immediately, report after
Speed matters, downside is low:
- Restart crashed services (Railway, scheduler)
- Rotate expired credentials/API keys I have access to
- Fix broken cron jobs or heartbeat issues
- Answer routine questions (gym hours, pricing, class schedule)
- Update workspace files and documentation
- Run scheduled reports

### Tier 2 — Act immediately, report with detail
Higher stakes — do it, but give Jake enough to audit:
- Deploy bug fixes or minor updates to the scheduler
- Make minor content updates to the website
- Send follow-up messages to leads/members (if Jake has pre-approved the tone/template)
- DNS changes via DreamHost API for known issues
- Triage and draft responses to support emails (send only if routine)

### Tier 3 — Prepare everything, wait for green light
Do the research/drafting/setup — don't execute until Jake says go:
- Any financial commitment (subscriptions, purchases, ads spend)
- Emails or posts going out publicly under BAB's name
- Structural changes to the scheduler (schema, major features)
- Anything involving member personal data
- Outreach to press, partners, or sponsors
- Anything irreversible that isn't clearly Tier 1/2

*This ladder expands over time as trust is earned. Start conservative.*

## Token Usage Preference
- Jake wants Haiku used for simple/routine tasks to save tokens
- Use Sonnet for: complex coding, deployments, SEO analysis, multi-step tasks
- Heartbeats already use Haiku ✅
- Default model change to Haiku pending Jake's confirmation

## Setup & Integration Blockers

### Done ✅
- Workspace reset on 2026-03-06, rebuilt from scratch
- tools.profile set to "full" to enable file/exec access
- WhatsApp linked (+16505208113)

### Pending ⚠️ (as of 2026-04-01)
- **Email (SMTP/Brevo):** ✅ WORKING — Brevo API key confirmed live 2026-04-01. Confirmations/reminders/resets all functional. Sent from schedule.bayareaboxing@gmail.com, staff notifications to same address.
- **Google Calendar API:** Not configured — blocks calendar visibility in heartbeat
- **Booking Data API:** Current endpoint returns HTML, need JSON API or direct DB access
- **Brave Search API:** Key not yet configured (web search pending)
- **Telegram:** ✅ LIVE — @BABVinBot connected 2026-04-08. Jake's Telegram ID: 8627883251. Primary mobile channel going forward.

## Session Log — 2026-03-30 (Monday)

**Member Portal UX Refinements (Deployed)**
- Converted purple inline nav links to hamburger dropdown (mobile-responsive, closes on outside click)
- Deployed hamburger across all screen sizes (desktop + mobile unified) for professional look
- Fixed logo image path (bab-logo.png → logo.png) and repositioned (header bar, right side)
- Added PIN state indicator: "PIN set — Click to edit" in green when member has already set a PIN
- All changes committed to git (dev + main in sync)
- **Status:** Member portal ready for beta testing; Jake beginning to share link with members

**Production Health (Multiple checks throughout day)**
- schedule.bayareaboxing.net consistently 200 OK (81ms avg response)
- www.bayareaboxing.net consistently 200 OK (1-4.7s avg)
- All endpoints operational, no incidents

**WhatsApp Stability Issue (Evening 9:20 PM)**
- Flapping issue returned (status 499 cycles every ~60s)
- Same pattern as 2026-03-26 outage — server-side instability from WhatsApp provider
- **Action:** Disabled WhatsApp channel to restore gateway stability
- Root cause: server-side, not local config
- **Replaced by Telegram** (2026-04-08) — WhatsApp left disabled, Telegram is now primary mobile channel

**Key Blockers Remain**
- Booking data API not accessible (returns HTML, needs JSON or direct DB query)
- Cannot pull revenue/booking metrics for heartbeat reports
- SMTP/Email still pending for automated class reminders and inbox visibility

## BAB Website Redesign (DEPLOYED — 2026-05-06)

**Project:** Modern single-page site to replace WordPress brochure
- **Local:** `/Users/openclaw/.openclaw/workspace/projects/bab-website/`
- **Tech:** HTML/CSS only (Bebas Neue + Inter), no frameworks
- **Live preview:** http://localhost:8090 (local Python server)
- **Status:** ✅ DEPLOYED May 6, 2026 @ 1 PM PT. Approved 2026-05-03 after 18-day design phase. Live on bayareaboxing.net.
- **Deployment:** DreamHost SFTP (pdx1-shared-a2-10.dreamhost.com) → all static files uploaded, WordPress `.htaccess` replaced with clean config

**Features:**
- Dark aesthetic (#0d0d0d bg, red #C0392B accents)
- Full-bleed hero with embedded professional gym photo (repositioned to top to avoid cropping heads)
- Programs section: 5 photo cards (Boxing, Muay Thai, BJJ, Strength, Kids)
- Schedule: **embedded iframe** from https://schedule.bayareaboxing.net — live, read-only, always accurate
- Pricing: Real prices ($99 lifetime enrollment, $199 unlimited, $179 12-class, $159 8-class, $139 4-class, drop-in available)
- Testimonials: 6 Google reviews in dark cards
- Contact form + social links (Instagram, Facebook)
- Responsive (5-col desktop, 3-col tablet, 2-col mobile pricing; mobile nav hamburger)

**CTA buttons:** "Try a Free Class Today" → links to https://www.bayareaboxing.net/#freeclass1 (guest liability workflow on old site)
**Tagline:** "Belmont's #1 studio for Boxing, Muay Thai Kickboxing, Brazilian Jiu-Jitsu and class-based fitness."

**Final updates (2026-05-03):**
- BayFit Boxing photo: New photoshoot image (women on bags, ring ropes, BAB branding) → img/class-2.jpg
- Duration: "1 hour" → "45 minutes"
- "Combat Boxing 101" → "Combat Boxing" (throughout)
- Hero: Added red attitude tagline "NOT A FRANCHISE. NOT A CARDIO CLASS. THE REAL THING."
- CTAs: 4 red bands spaced throughout (before/after programs, after pricing, after testimonials) — unique copy per CTA
- Reviews: Added count under testimonials: "⭐ 5.0 stars · 131 Google reviews — Belmont's highest-rated combat sports gym"
- Free class form: ✅ Tested end-to-end (email fires instantly)

**Competitive audit (2026-05-03):**
- vs furiafightclub.com: BAB A- (breadth, live schedule, pricing transparency, reviews) vs Furia B+ (attitude copy)
- BAB now matches Furia's CTA repetition + attitude messaging

**Status post-launch:** Website live, GA4 pending setup, copy refinements (Jake to specify)

**SEO additions (2026-05-05):** Open Graph, Twitter Card, Schema.org LocalBusiness JSON-LD, canonical URL, geo tags, favicon, sitemap.xml, robots.txt, hours in footer, copyright 2025→2026 ✅

**Hours confirmed:** Mon–Thu 6–7am & 12–9pm | Fri 6–7am & 12–8pm | Sat 8am–3pm | Sun 9am–2pm

**GA4:** No existing tracking found on old WordPress site — set up fresh GA4 property post-launch

**Staff section:** Jake's card = full-width featured, photo 300×340px. Other coaches = standard grid cards.

## BAB Scheduler DNS/Hosting Notes
- bayareaboxing.net DNS moved to Cloudflare (nameservers: courtney + graham.ns.cloudflare.com)
- DreamHost still hosts the main website — only DNS management moved to Cloudflare
- schedule.bayareaboxing.net CNAME → bab-scheduler-production-b000.up.railway.app (DNS Only, not proxied)
- Localtunnel is GONE — app runs on Railway, no local server needed
- To deploy updates: cd into project dir and run `railway up`

## Google Business Profile — Photo Drip (LIVE — 2026-05-05)

- Browser automation path (GBP API quota = 0, blocked by Google)
- Pete Columbo photoshoot: 500 photos in ~/Desktop/BAB-Pete-Photos/ (Bags/Ring/Team/Mat/Miscellaneous)
- First photo uploaded: Bags109.jpg (pending GBP review) ✅
- Cron: `gbp-photo-drip` fires every 2 days at 10 AM
  - Picks next photo, sends Telegram preview to Jake for approve/skip
  - On approve: runs projects/gbp-photo-drip/upload.js via Puppeteer (port 18800)
  - State: projects/gbp-photo-drip/state.json (currentIndex tracks queue position)
  - Queue: projects/gbp-photo-drip/photo-queue.txt (500 photos sorted)
- Chrome (openclaw managed browser, port 18800) must be running for uploads
- Hailey June Photography photos also on Drive — some already on GBP, skip for drip
- Old BAB Automation OAuth client replaced by BAB Automation 2 (Desktop app)
  - Client ID: 263865131373-mup9qlr9kg62sptgfi6rhjgeng5bgtb5.apps.googleusercontent.com
  - Tokens: credentials/google-tokens.json

## Google Business Profile API Setup (In Progress — 2026-05-03)

**Goal:** Automate photo drip to Google Business listing (every 2 days) + future ads management

**OAuth app created:**
- Google Cloud project: "BAB Google Automations"
- APIs enabled: My Business Business Information API + My Business Account Management API
- OAuth client: "BAB Automation" (Desktop app)
- Client ID: 263865131373-vbjmob7kc4af62c8j5uq13kh2frcihgs.apps.googleusercontent.com
- Client Secret: stored in workspace
- Test user: bayareaboxing@gmail.com

**OAuth flow status:** IN PROGRESS
- Initial OOB attempt: got code but exchange changed
- Second attempt: localhost:8765 redirect → waiting for Jake to complete auth on Mac Mini browser
- Next: store refresh token → get BAB location ID → build photo drip script (cron every 2 days)

**Facebook/Instagram:** Next phase — Jake will connect Meta Business Suite

## Known Production Issues (2026-04-25 to present)

**Transient Website Timeouts** (observed, pattern emerging)
- Sun Apr 25 @ 9:04 PM PT: website timed out, recovered on immediate retry
- Mon Apr 27 @ 8:34 AM PT: website timed out, recovered on immediate retry
- Pattern: Both recovered immediately; no sustained outages
- Hypothesis: Railway sleep/wake cycle or intermittent DNS resolution (Cloudflare)
- Monitoring: Heartbeat checks continue every 30 min. Alert threshold only if sustained >1 min or repeated 3+ times in 1 hour
- No customer impact observed; all reminders/emails sent successfully
