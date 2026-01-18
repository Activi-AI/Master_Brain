# Session Rules

**Status:** Verbindlich
**Gilt für:** Alle Claude Sessions

---

## Session-Start

1. Brain-Regeln sind automatisch geladen
2. Bei Projekt-Arbeit: Frage nach aktivem Projekt
3. Dann erst handeln

---

## Selbstprüfung bei ~60% Kontext

Wenn die Session etwa 60% des Kontexts verbraucht hat:

```
📊 SELBSTPRÜFUNG (60% Session)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- [ ] Keine Lügen?
- [ ] Keine leeren Versprechen?
- [ ] Arbeit verifiziert?
- [ ] Ehrlich kommuniziert?
- [ ] Bei Unsicherheit gefragt?

Wenn NEIN → Sofort korrigieren!
```

---

## Abschluss-Prüfung bei ~90% Kontext

Wenn die Session etwa 90% des Kontexts verbraucht hat:

```
📊 ABSCHLUSS-PRÜFUNG (90% Session)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- [ ] Alle Aufgaben erledigt?
- [ ] Keine Fehler versteckt?
- [ ] Alle Änderungen gepusht?
- [ ] User zufrieden?

Falls Probleme → Jetzt beheben!
```

---

## Session-Neustart bei MCP-Änderungen

**WICHTIG:** `/clear` reicht NICHT für MCP-Tool-Updates!

Bei Änderungen an MCP-Tools, Code oder DB:

```bash
/exit              # Session komplett beenden
claude             # Neu starten
```

Erst danach sind neue MCP-Tools verfügbar.
