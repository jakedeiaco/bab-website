# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Access Inventory

Don't claim you lack access. Check here first, then just try it.

| Tool / Service | Status | Notes |
|---|---|---|
| `railway` CLI | ✅ | Logged in as bayareaboxing@gmail.com |
| Railway API Token | ✅ | `42d11610-1b46-45b5-a2c6-a890d8943fb9` — use via GraphQL API for deploys when CLI auth expires |
| GitHub Token | ✅ | `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` — repo scope, jakedeiaco account |
| `node` / `npm` | ✅ | /opt/homebrew/bin/node |
| `python3` | ✅ | /usr/bin/python3 |
| `lt` (localtunnel) | ✅ | /opt/homebrew/bin/lt |
| Brave Search API | ✅ | Key in openclaw.json |
| DreamHost API | ✅ | Key: K85XBRRZWVG3ZUYJ (DNS management) |
| WhatsApp | ✅ | Linked to +16505208113 via openclaw |
| Anthropic (Claude) | ✅ | Via openclaw auth |
| Google Drive | ✅ | Mounted at ~/Library/CloudStorage/GoogleDrive-bayareaboxing@gmail.com |
| `gh` (GitHub CLI) | ❌ | Not installed |
| Stripe CLI | ❌ | Not installed |
| Email / SMTP | ❌ | Not configured yet |

---

## Tool Selection Guide (Dynamic Workflow)

When picking a tool, think: *when* to use it, not just *what* it does.

| Tool | When | Cost | Reliability |
|------|------|------|-------------|
| `memory_search` | Any question about past work, prefs, decisions | low | high |
| `web_search` | Current events, prices, public info | low | medium |
| `web_fetch` | Read a specific URL | low | medium |
| `browser` | JS-rendered pages, login flows, UI automation | medium | high |
| `exec` | Shell tasks, file ops, running apps | medium | high |
| `sessions_spawn` | Multi-file coding tasks, iterative dev, PR review | high | high |
| `cron` | Exact-time reminders, isolated scheduled tasks | low | high |
| `image` | Only if image wasn't already in the user's message | low | high |

**Rule:** Use the cheapest tool that reliably gets the job done.

---

## Models

- **Default (conversations):** `anthropic/claude-sonnet-4-6` (alias: `sonnet`)
- **Heartbeats:** `anthropic/claude-haiku-4-5` (alias: `haiku`) — lighter, cheaper
- Use alias in cron: `openclaw cron add --model haiku ...`

### Local Models (Cost Optimization)

LMStudio not yet installed — opportunity to cut API costs significantly.

**When to use local models:**
- High-volume/repetitive tasks (log parsing, data processing, code generation)
- Dev/testing — don't pay to debug prompts
- Sensitive data that shouldn't leave the machine

**Keep cloud models for:** complex reasoning, novel problems, best-quality output

**Setup (10 min):**
1. Download LMStudio → https://lmstudio.ai
2. Pull `Qwen2.5-Coder-32B-Instruct` (24GB RAM) or `14B` version (16GB)
3. Start local server in LMStudio
4. Point OpenClaw at it: `base_url: http://localhost:1234/v1`

**Hardware note:** Mac mini (Apple Silicon) uses unified memory — 24-36GB models should run well depending on config. Verify RAM with `About This Mac`.

**Hybrid approach:** Local model for bulk work, cloud for hard problems. Estimated savings: ~70% on API costs.

## Claude Code (ACP)

- Claude Code binary: `/opt/homebrew/bin/claude` — v2.1.71 ✅ installed
- Status: **needs login** — run `claude` in terminal to authenticate
- ACP plugin (`acpx`): **disabled** — needs enabling in config once Claude Code is logged in
- Once set up: I can spawn Claude Code as a coding sub-agent for file edits, refactors, and dev tasks

## Google Drive

- Mounted at: `~/Library/CloudStorage/GoogleDrive-bayareaboxing@gmail.com/My Drive/`
- Account: bayareaboxing@gmail.com

## Apps Script (Google Docs automation)

- Script project ID for BAB calendar doc: `1o5FAyrAzKXPPntNV9yjF8jqu55HIniAkuzrT_YKqP_zpjOZt7VZVjbW7`
- Trick for injecting code: use Monaco editor API via browser evaluate

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
