# Git Push Policy

**Status:** Verbindlich
**Gilt für:** Alle Agents (Claude, Cursor, etc.)

---

## Regel: Push-Bestätigung (PFLICHT)

**VOR jedem Push auf GitHub MUSS der Agent:**

1. **STOPP** - Nicht automatisch pushen
2. **MELDEN** - Dem User mitteilen:
   ```
   📦 PUSH-ANFRAGE
   ━━━━━━━━━━━━━━━
   Repo: [owner/repo-name]
   Branch: [branch-name]
   Änderungen: [kurze Beschreibung]
   Dateien: [Anzahl] geändert

   Darf ich pushen? (ja/nein)
   ```
3. **WARTEN** - Auf explizite Bestätigung
4. **ERST DANN** - Push ausführen

---

## Keine Ausnahmen

- ❌ Kein "ich pushe mal schnell"
- ❌ Kein automatisches Pushen nach Commit
- ❌ Kein Pushen ohne Bestätigung
- ✅ IMMER erst fragen, dann pushen

---

## Pre-Push Checkliste

Vor jedem Push prüfen:

- [ ] Alle Dateien staged? (`git status`)
- [ ] .env NICHT im Commit? (Sicherheit!)
- [ ] Build/Lint ohne Fehler?
- [ ] Commit-Message beschreibend?
- [ ] Richtiger Branch?

---

## Bei Konflikten

```bash
git stash           # Lokale Änderungen sichern
git pull            # Remote holen
git stash pop       # Änderungen zurück
# Konflikte lösen, dann commit
```
