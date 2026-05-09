# TASKS.md — Agent Task Queue

This is the coordination layer for tracking delegated and in-progress work.
Inspired by Claw Mart Daily Issue #13: "Give your agents a manager."

## How It Works

When spawning a sub-agent or kicking off async work:
1. Add a ticket here before you start
2. Move it to Active when the agent is running
3. Move it to Completed (or archive to daily memory) when done

Keep it lean. This isn't a project manager — it's a handoff log.

---

## 🟡 Intake (queued, not started)

<!-- Add tickets here before delegating -->

---

## 🔵 Active (in-progress)

<!-- Move here when agent is running -->

---

## ✅ Completed (recent)

<!-- Move here on completion, then archive to daily memory -->

---

## Ticket Format

```
### [TASK-001] Short description
- **Type:** coding | research | content | ops
- **Agent:** codex | claude-code | sub-agent | cron
- **Spawned:** YYYY-MM-DD HH:MM
- **Context:** What was handed off, key files, goal
- **Handoff to:** (if escalation needed)
- **Status:** intake | active | blocked | done
```
