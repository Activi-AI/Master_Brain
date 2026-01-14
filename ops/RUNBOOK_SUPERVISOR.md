# RUNBOOK_SUPERVISOR

Zweck: Der Supervisor sorgt dafür, dass nichts verloren geht, alle Agenten sauber liefern,
und Master-Brain (Repo + Memory) konsistent bleibt.

Repo: master-brain (Single Source of Truth)
- Artefakte + Run-Reports: versioniert im Repo
- Quick Recall: Master-Brain Memory Events (optional/zusätzlich)

---

## 0) Definitionen

### Agenten (Beispiel)
- code-cli-01..04
- claude-cli-01..02

### Verpflichtender Abschluss pro Run
JEDER Run muss enden mit:
- runs/YYYY-MM-DD/<agent_name>/<run_id>.json
- runs/YYYY-MM-DD/<agent_name>/<run_id>.md
und anschließend:
- ./scripts/post_run.sh --agent "<agent_name>" --json "<path-to-report.json>"

Wenn ein Agent das nicht tut: Run gilt als NICHT ABGELIEFERT.

---

## 1) Supervisor Check: Per-Run (nach JEDEM Agent-Run)

### 1.1 Run-Report vorhanden?
- Existiert JSON + MD an der richtigen Stelle unter runs/?
- Ist run_id eindeutig?
- redactions_done == true?

### 1.2 Gate/Qualität
- Commit ist durchgegangen (quality gate OK)
- Keine Secrets in Diff:
  - Kein `.env` getrackt
  - Keine `sk-`, API-Keys, private keys etc.

### 1.3 Open Questions / Decisions
- open_questions[] im Report:
  - wurden als Abschnitt in ops/OPEN_QUESTIONS.md ergänzt?
- decisions[] im Report:
  - sind in ops/DECISIONS.md ergänzt oder referenziert (falls relevant)?

### 1.4 "Next Actions" erzeugt?
- next_actions[] im Report:
  - wurden in ops/TASKS.md übernommen oder als Issue/Task erfasst?

---

## 2) Tägliche Routine (Daily, 10 Minuten)

### 2.1 Abgabe-Check: Wer hat geliefert?
Prüfe, ob heute für jeden aktiven Agenten mindestens ein Run-Report existiert:

- runs/<today>/<agent>/

Wenn Agent aktiv war, aber kein Report existiert → nachhaken.

### 2.2 Open Questions triage
- ops/OPEN_QUESTIONS.md: neue Einträge von heute
- Für jeden Eintrag:
  - Owner festlegen (agent/human)
  - "verify-by" Datum setzen (z. B. +2 Tage)
  - Link/Quelle ergänzen

### 2.3 Risks prüfen
- ops/RISKS.md: neue oder geänderte Risiken
- Falls Risiko "hoch": Task erstellen + Mitigation einplanen

### 2.4 Change Log / Drift
- ops/CHANGELOG.md aktualisieren (wenn relevante Änderungen heute)
- Prüfen, ob Policies/Kb-Struktur eingehalten wurde

---

## 3) Wöchentliche Routine (Weekly, 30–60 Minuten)

### 3.1 Eval / Regression
- eval/regression_tests.yaml durchsehen:
  - neue Failure-Muster hinzufügen
- eval/scorecard.yaml:
  - Scorecard Kriterien anpassen, falls neue häufige Fehler auftauchen

### 3.2 KB Hygiene
- KB Docs: last_verified prüfen
- Vendor Doku niemals mischen:
  - kb/vendors/<vendor> bleibt vendor-only
  - kb/internal/ ist "unser" Stand

### 3.3 Costs/Scope
- Welche Workflows sind "zu schwer" oder zu viel Overhead?
- Welche Automatisierung lohnt als nächstes?

---

## 4) Vor Deploy (Release Gate)

### 4.1 Repo Gate
- Working tree clean
- Latest on main
- Quality Gate OK

### 4.2 Secrets/Configs
- .env bleibt untracked
- Server-Konfigs: keine Credentials in Repo

### 4.3 Server Security Gate (Minimal)
- Ports öffentlich: nur 22/80/443
- UFW aktiv
- Docker läuft

### 4.4 Rollback Plan
- Letzter funktionierender Commit SHA dokumentiert
- "Rollback steps" notiert (docker compose down + checkout SHA + up)

---

## 5) Incident / "Oh Shit" Checklist

### 5.1 Secret Leak Verdacht
- Sofort: Token/Key rotieren
- Commit revert / history prüfen
- Repo-Secret-Scan erneut laufen lassen
- Zugang einschränken (permissions.allow / GitHub settings)

### 5.2 Agent macht Quatsch / driftet
- eval/regression_tests.yaml um Fall ergänzen
- policy verschärfen
- run-report Pflicht durchsetzen

---

## 6) Minimal-Kommandos (Supervisor)

### Daily "wer hat geliefert?"
- grep / find unter runs/<date>/

### Secrets quick scan (repo)
```bash
# Sucht nach typischen Secret-Patterns (sk-, API keys, private keys)
git grep -nE "sk-|_API_KEY|BEGIN .* KEY" -- .
```

### Status
- git status
- git log -5 --oneline

---

## 7) Done Criteria (Woran erkennst du "unter Kontrolle"?)

- Jeder Agent liefert Run-Reports + post_run Ausführung
- OPEN_QUESTIONS wächst nur kontrolliert (mit Owner/Datum)
- Keine Secrets in Git
- Policies/KB-Struktur werden eingehalten
- Regression/Scorecard wird wöchentlich gepflegt
