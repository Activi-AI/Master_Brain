# Smoke Test Policy

**Status:** Verbindlich
**Gilt für:** Nach jeder Änderung an Code/MCP/DB

---

## Grundregel

> Bei JEDER Änderung an Code, MCP-Tools, DB oder Server:
> **Session neu starten + Smoke-Tests ausführen**

---

## Pflicht-Smoke-Test (MCP Tools)

Nach jedem Neustart diese Tools testen:

1. `ops_stats` - Liefert Statistiken?
2. `ops_events` (limit=5) - Liefert Events?
3. `ops_tasks_history` (limit=5) - Liefert Tasks?

### Erwartung

| Kriterium | Check |
|-----------|-------|
| JSON kommt zurück | ✅ |
| Zeitstempel plausibel | ✅ |
| Kein Fehler | ✅ |

→ **System OK**

---

## Bei Fehlschlag

1. **NICHT weitermachen**
2. Session neu starten (`/exit` → `claude`)
3. Erneut testen
4. Erst danach debuggen

---

## Auto-Debug Script (PFLICHT)

Jedes Repo MUSS `auto-debug.sh` enthalten.

### Wann ausführen?

- VOR jedem Deploy
- NACH jedem Deploy
- Bei Problemen sofort

### Was prüft es?

| Check | Beschreibung |
|-------|--------------|
| PM2 Prozesse | Laufen alle Services? |
| Port-Belegung | Richtige Ports belegt? |
| Backend Health | Antwortet die API? |
| Datenbank | Läuft DB? |
| Logs | Fehler in Logs? |
| System | RAM, CPU, Disk |

### Ergebnis lesen

```
✓ PASS = Alles OK
! WARN = Warnung, prüfen
✗ FAIL = Problem, muss gefixt werden
```
