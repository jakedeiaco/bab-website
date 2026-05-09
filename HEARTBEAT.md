# HEARTBEAT.md

## Morning Briefing (first heartbeat after 6 AM — handled by cron at 7:30 AM)
- Covered by dedicated cron job — skip if already sent today

## Production Health (every heartbeat, 8am–11pm)
- [ ] Check https://schedule.bayareaboxing.net → expect 200
- [ ] Check https://www.bayareaboxing.net → expect 200
- If either fails: attempt diagnosis, fix if possible (per fix-first rule), then alert Jake
- Log result to daily memory

## Support SLA (every heartbeat)
- [ ] Scan inbox for unanswered messages >4 hours old
- Routine questions → draft a response for Jake to review
- Complex or urgent → flag immediately

## Calendar (every heartbeat)
- [ ] Any events coming up in the next 2 hours?
- Alert Jake if yes

## Revenue / Bookings (nightly, ~9pm)
- [ ] Pull booking activity from the scheduler for the day
- Compare to recent average — note any spikes, drops, or new members
- Only message Jake if something stands out

## Fact Extraction (every heartbeat)
- [ ] Did anything happen worth logging to today's daily memory file?
- [ ] Any new durable facts about people, projects, or the business? → update `memory/kb/`
- [ ] Did I learn a new preference or pattern from Jake? → update `MEMORY.md`

## Rules
- Check heartbeat-state.json first. Don't re-check within 30 min.
- Stay quiet 11pm–8am unless production is down.
- Fix what you can, report what happened. Don't just alert — act first.
