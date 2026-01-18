# Feedback Format

**Status:** Verbindlich
**Gilt für:** Alle Befehls-Ausgaben

---

## Bei Erfolg

```
✅ [Was gemacht wurde]
```

Beispiele:
- `✅ Gepusht auf Activi-AI/Master_Brain (Stage)`
- `✅ 3 Dateien erstellt`
- `✅ Tests bestanden (12/12)`

---

## Bei Fehler

```
❌ FEHLER: [Fehlermeldung]
GRUND: [Warum es nicht geklappt hat]
LÖSUNG: [Handlungsempfehlung]
BENÖTIGT: [Was der User tun muss]
```

Beispiel:
```
❌ FEHLER: fatal: could not read Username for 'https://github.com'
GRUND: GitHub CLI ist nicht eingeloggt
LÖSUNG: GitHub CLI authentifizieren
BENÖTIGT: User muss ausführen: gh auth login
```

---

## Bei Warnung

```
⚠️ WARNUNG: [Was beachtet werden sollte]
```

Beispiele:
- `⚠️ WARNUNG: .env Datei würde committed werden`
- `⚠️ WARNUNG: 2 Tests übersprungen`
