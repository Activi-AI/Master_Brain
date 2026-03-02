# FOLGE-PROTOKOLL: Crime-Killer

**Projekt:** Crime-Killer
**Typ:** Sicherheitsbehörden-Tool
**Letzte Aktualisierung:** 2025-12-14
**Status:** 🆕 NEU - Konzeptphase

---

## 🎯 Projektziel

Tool für Sicherheitsbehörden um gesuchte Kriminelle zu:
- **SUCHEN** - über Social Media und Kommunikationskanäle
- **VERFOLGEN** - Aktivitäten tracken
- **FINDEN** - Standort/Identität ermitteln

---

## 📍 Projekt-Ordner

```
~/activi-dev-repos/
├── amp-security-lab/        ← Security-Forschung (existiert)
└── crime-killer/            ← Neues Repo (noch zu erstellen)
```

---

## 🔧 Geplante Features

| Feature | Beschreibung | Status |
|---------|--------------|--------|
| Social Media Scanner | Suche über alle Plattformen | 📋 Konzept |
| Kommunikations-Tracker | Messenger, Email, etc. | 📋 Konzept |
| Gesichtserkennung | Bild-Matching | 📋 Konzept |
| Beziehungs-Graph | Netzwerk-Analyse | 📋 Konzept |
| Behörden-Dashboard | Übersicht für Ermittler | 📋 Konzept |

---

## 💻 TECHNOLOGIE-STACK (festgelegt 2025-12-14)

| Bereich | Technologie | Grund |
|---------|-------------|-------|
| **Backend** | Python (FastAPI) | Beste Scraping-Libraries, AI/ML Support |
| **Frontend Web** | React / Next.js | Schnell, Live-Updates |
| **Desktop** | Electron | 1 Codebase für Web+Desktop |
| **Mobile** | React Native | 1 Codebase für iOS+Android |
| **Datenbank** | PostgreSQL + Redis | Stabil + Echtzeit-Cache |
| **Gesichtserkennung** | DeepFace / InsightFace | Open Source, sehr genau |
| **Scraping** | Selenium + Playwright | Alle Plattformen |
| **Echtzeit** | WebSockets | Live-Updates/Alarme |
| **Queue** | Celery + RabbitMQ | Hintergrund-Jobs |

---

## 🛡️ Rechtliche Anforderungen

- NUR für autorisierte Behörden
- Datenschutz-konform (GDPR wo anwendbar)
- Audit-Log für alle Suchen
- Zugriffskontrolle

---

## 📋 Nächste Schritte

1. [x] Anforderungen definieren ✅
2. [x] Technologie-Stack festlegen ✅
3. [ ] GitHub Repo erstellen
4. [ ] MVP planen

---

## 📝 ANFORDERUNGEN (definiert 2025-12-14)

### Zielgruppe
- **Angebot:** Alle Sicherheitsbehörden weltweit
- **Aktueller Auftraggeber:** Bosnische FUP (Federalna Uprava Policije)
- **Status:** Auftrag + Genehmigung vorhanden ✅

### Suchquellen (ALLE)
- Social Media: Facebook, Instagram, TikTok, LinkedIn, X/Twitter, etc.
- Messenger: WhatsApp, Viber, Telegram, Signal, etc.
- Email
- Darknet
- Telefon
- Alle verfügbaren öffentlichen/zugänglichen Quellen

### Suchmethoden
- Name
- Bild/Gesichtserkennung
- Telefonnummer
- Email
- Netzwerk/Verbindungen
- **Auto-Discovery:** System findet automatisch weitere Accounts/Mails/Nummern
  - Bei sicherer Zuordnung → Automatisch hinzufügen
  - Bei hoher Wahrscheinlichkeit → Operator fragen: "Soll ich hinzufügen?"

### Output
- Report/PDF Export
- Live-Dashboard mit Echtzeit-Updates
- Alarm-System bei neuer Aktivität
- Benachrichtigungen an Operator

### Zugang
- Web-App (Browser)
- Desktop-App (Windows/Mac)
- Mobile App (iOS/Android)
- Login-System mit Rollen (Admin, Operator, Viewer)

---

## 💡 Ideen / Input von activi-dev

_Weitere Ideen hier dokumentieren_

---

## 🔗 Relevante Threads

| Datum | Thread-ID | Beschreibung |
|-------|-----------|--------------|
| 2025-12-14 | T-019b1c9d-f1ca-70a3-9416-df44e502a634 | Protokoll-Erstellung, Projekt-Start |

---

**Zurück zu:** GRUNDPROTOKOLL.md
