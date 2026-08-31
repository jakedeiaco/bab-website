# BAB Connect (Staff Messenger) — Project Context

> This file is maintained by Vin (AI assistant) and updated after significant changes.
> It is the human-readable source of truth for current project state.

Last updated: 2026-08-30

---

## Current Status: LIVE

- **Production:** https://backend-production-074f.up.railway.app
- **Custom domain:** https://connect.bayareaboxing.net
- **Went live:** 2026-08-11
- **Admin login:** jake / bab1belmont

---

## What It Does

Staff-only internal messenger for Bay Area Boxing.

- Staff Wall: posts, reactions, comments, media
- Real-time DMs via Socket.io
- Admin panel: create and manage staff accounts

---

## Open Items

| Item | Status |
|------|--------|
| Read receipts for DMs | Not built |
| Push notifications | Planned for native app phase |
| Native Android APK | Pending — web must stabilize first |
| App Store submission | After Android beta |

---

## Mobile Strategy (decided 2026-08-13)

BAB Connect is the **first** BAB project going native — but not yet.

Order of operations:
1. Keep iterating on web app
2. When Jake is satisfied → build APK → staff Android beta
3. Then App Store submission

**Do NOT rush to APK.** Web iterations come first.
Push notifications are planned for the native version.
Apple Dev Account is paid and App Store Connect API is set up (Key ID: HAFCRUG7QK).

---

## Stack

- Node.js + Express + Socket.io + SQLite
- Railway (auto-deploy via API token)
- Railway project: ff34ff69-6a22-44eb-88fe-12b853e97d23
