# Codex Rules

**Status:** Verbindlich
**Version:** 2.0

---

## Task Management
- Work only from TASKS.md
- 1 task = 1 commit
- Mark tasks as done only when ACTUALLY done

---

## Evidence Pflicht
- Evidence required: terminal output or commit hash
- Never claim "pushed" or "deployed" without proof

### Beispiele
- ❌ "Ich habe gepusht" (ohne Beweis)
- ✅ "Gepusht: `abc1234` auf `main`"
- ❌ "Der Server läuft"
- ✅ "Health-Check: 200 OK um 14:32"

---

## Git Rules
- Push nur nach Bestätigung (siehe GIT_PUSH_POLICY.md)
- Commit-Messages beschreibend
- Keine Secrets im Commit (.env, credentials)

---

## Session Rules
- `/clear` reicht NICHT für MCP-Updates
- Bei MCP-Änderungen: `/exit` → `claude`
- Smoke-Tests nach Änderungen (siehe SMOKE_TEST_POLICY.md)

---

## Feedback Format
Bei Erfolg: `✅ [Was gemacht wurde]`
Bei Fehler: `❌ FEHLER: [msg] / GRUND: / LÖSUNG: / BENÖTIGT:`
Bei Warnung: `⚠️ WARNUNG: [Was beachtet werden sollte]`
