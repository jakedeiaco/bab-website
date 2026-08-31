# BAB Website — Project Context

> This file is maintained by Vin (AI assistant) and updated after significant changes.
> It is the human-readable source of truth for current project state.

Last updated: 2026-08-30

---

## Current Status: LIVE

- **URL:** https://www.bayareaboxing.net
- **Hosting:** DreamHost (SFTP: pdx1-shared-a2-10.dreamhost.com / bayareaboxing)
- **DNS:** Cloudflare
- **Last updated:** 2026-06-09

---

## Pages

| Page | Description |
|------|-------------|
| index.html | Homepage — main SEO landing page |
| muay-thai.html | Muay Thai landing page |
| about.html | About + coaches |
| free-class.html | Lead capture (2-step form + waiver) |
| facility.html | Facility page |

---

## SEO Status

- **"boxing classes near me":** Position 8.7 (June 2026) — overdue for recheck
- **GA4:** G-S476D3DJPE — live, confirmed working
- **UTM tagging:** Active on GMB + Instagram bio
- All schema (LocalBusiness, FAQ, AboutPage) deployed

---

## Open Items

| Item | Priority | Notes |
|------|----------|-------|
| GSC OAuth re-auth | Medium | Missing webmasters.readonly scope |
| Google Places API key | Medium | Needed for dynamic review count (save to credentials/google-places-key.txt) |
| Citations cleanup | Medium | Tapology + CMac.ws phone wrong — Jake login required |
| New directory listings | Low | Bing, Nextdoor, ClassPass, Mindbody, Thumbtack not yet claimed |
| Position recheck | Overdue | Was due 2026-07-03 |

---

## Stack

- Pure HTML/CSS (Bebas Neue + Inter fonts)
- No frameworks — edit files directly and SFTP to DreamHost
- Deploy: `sftp bayareaboxing@pdx1-shared-a2-10.dreamhost.com`
