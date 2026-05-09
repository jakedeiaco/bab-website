# Knowledge Graph — Projects & Infrastructure

## BAB Scheduler
- **URL:** https://schedule.bayareaboxing.net
- **Stack:** Node.js + Express + SQLite
- **Hosted:** Railway (project: bab-scheduler, ID: c0619d2c-ead3-48e7-8371-27a696dd61b0)
- **Account:** bayareaboxing@gmail.com
- **Local path:** /Users/openclaw/.openclaw/workspace/projects/bab-scheduler
- **Features:** Class schedule, booking, cancellation, waitlist, member portal, admin dashboard
- **Membership tiers:** Gold (unlimited), Silver (12/cycle), Bronze (8/cycle), Part-time (4/cycle)
- **Pending:** SMTP email setup, admin password, class management UI

## BAB Website
- **URL:** https://www.bayareaboxing.net
- **Registrar:** GoDaddy (domain only)
- **DNS/Hosting:** DreamHost
- **DreamHost API key:** K85XBRRZWVG3ZUYJ (full access)

## Social Media
- **Instagram:** @bayareaboxing (priority platform)
- **Facebook:** facebook.com/BayAreaBoxing (2.2K followers, 4.9 stars)
- **Google:** 5.0 stars / 131 reviews

## Infrastructure Notes
- Railway auth: browserless login (UUID API token does NOT work with CLI)
- DNS changes go through DreamHost API
- Custom domain CNAME: schedule.bayareaboxing.net → bab-scheduler-production-b000.up.railway.app
