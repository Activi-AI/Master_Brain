# FORENSISCHES BRAIN-AUDIT — BERICHT

**Datum:** 2026-01-19
**Auditor:** Claude (READ-ONLY Audit)
**Status:** ⚠️ FRAGMENTIERUNG BESTÄTIGT

---

## 1. EVIDENCE TABLE

| Artefakt | Pfad / Remote | HEAD Commit | Datum | Remote Status |
|----------|---------------|-------------|-------|---------------|
| **Master_Brain (activi-dev-repos)** | `~/activi-dev-repos/Master_Brain` → `Activi-AI/Master_Brain` | `bf40e7f` | 2026-01-15 09:30 | ⚠️ **1 UNPUSHED COMMIT** auf `feature/legacy-merge` |
| **Master_Brain (brain-work)** | `~/brain-work/Master_Brain` → `Activi-AI/Master_Brain` | `c95b578` | 2026-01-15 00:03 | ❌ **ORPHAN** - Remote divergiert, Branch "entfernt" |
| **OLD_BRAIN** | `~/OLD_BRAIN_2026-01-13` | `861e60a` | 2026-01-13 22:59 | ❌ **KEIN REMOTE** - lokal-only |
| **The-Brain** | `~/activi-dev-repos/The-Brain` | `63383d5` | 2025-12-31 16:03 | ❌ **KEIN REMOTE** - lokal-only |
| **amp-brain** | `~/activi-dev-repos/amp-brain` → `dsactivi-2/amp-brain` | `37e43bd` | 2026-01-01 02:33 | ✅ Synchron (lokale uncommitted changes) |
| **brain-core** | `~/activi-dev-repos/brain-core` → `dsactivi-2/brain-core` | `6cbb0df` | 2026-01-01 02:51 | ✅ Synchron |

---

## 2. GITHUB REPO-INVENTAR

### Activi-AI Organisation (1 Repo)
| Repo | Visibility | Default Branch | Last Push |
|------|------------|----------------|-----------|
| `Activi-AI/Master_Brain` | PUBLIC | main | 2026-01-15 08:30 |

### dsactivi-2 Account — Brain-relevante Repos (4 Repos)
| Repo | Visibility | Default Branch | Last Push |
|------|------------|----------------|-----------|
| `dsactivi-2/master-brain` | PRIVATE | main | 2026-01-14 01:23 |
| `dsactivi-2/amp-brain` | PRIVATE | main | 2026-01-01 01:33 |
| `dsactivi-2/brain-core` | PRIVATE | main | 2026-01-01 05:32 |
| `dsactivi-2/mcp-server` | PRIVATE | main | 2025-12-31 22:41 |

---

## 3. COMMIT-HASH CROSS-REFERENCE

```
Activi-AI/Master_Brain (main):     af63462 ← GitHub HEAD
  └── dsactivi-2/master-brain:     771beec ← VERALTET (fehlen 4+ commits)

~/activi-dev-repos/Master_Brain:   bf40e7f ← AHEAD of origin/main (unpushed)
~/brain-work/Master_Brain:         c95b578 ← ORPHAN (existiert nicht auf GitHub)
~/OLD_BRAIN:                       861e60a ← LOKAL-ONLY
~/The-Brain:                       63383d5 ← LOKAL-ONLY
```

### Commit-Historie Overlap-Analyse
| Commit | Activi-AI/Master_Brain | dsactivi-2/master-brain |
|--------|------------------------|-------------------------|
| `771beec` Bootstrap | ✅ | ✅ (HEAD) |
| `13e3b8b` npm fix | ✅ | ✅ |
| `5b12920` Docker | ✅ | ✅ |
| `39fbeda` CI workflow | ✅ | ❌ FEHLT |
| `78a3b63` CI fix | ✅ | ❌ FEHLT |
| `af63462` Policies | ✅ (HEAD) | ❌ FEHLT |

**Finding:** `dsactivi-2/master-brain` ist 4 Commits hinter `Activi-AI/Master_Brain`!

---

## 4. DIRECTORY SIZE & CONTENT-ANALYSE

| Repo | Größe | Inhalt-Typ |
|------|-------|------------|
| brain-work/Master_Brain | 264K | Minimal (capabilities, docs, ops) |
| amp-brain | 948K | Dokumentation/Protokolle |
| OLD_BRAIN | 4.4M | KB+Memory+Tools (Makefile-basiert) |
| activi-dev-repos/Master_Brain | 4.8M | Vollständig (inkl. OLD_BRAIN merge) |
| brain-core | 50M | Node.js Library (mit node_modules) |
| The-Brain | 68M | MCP Server (TypeScript, dist, node_modules) |

### Unique Content pro Repo:
- **OLD_BRAIN:** `inbox/`, `kb/`, `memory/`, `tools/`, `playbooks/`, `Makefile` ← Legacy-Struktur
- **The-Brain:** `src/`, `dist/`, TypeScript MCP Server ← Eigenständiges Projekt
- **brain-work/Master_Brain:** `capabilities.yml`, `ops/`, `scripts/` ← Minimales MVP
- **amp-brain:** Dokumentation, CLAUDE.md, Protokolle ← Wissensdatenbank

---

## 5. SERVER-AUDIT STATUS

| Server | Status | Befund |
|--------|--------|--------|
| 49.13.117.223 | ❌ **SSH DENIED** | Alle getesteten Keys abgelehnt |

### Getestete SSH-Keys (alle fehlgeschlagen):
- `~/.ssh/id_ed25519_cloudagents`
- `~/.ssh/hetzner_new_2025`
- `~/.ssh/hetzner_key`
- `~/.ssh/activi_cloud_agent`
- `~/.ssh/cloud_agents_ed25519`

---

## 6. AUTOR-ANALYSE

| Account/Alias | Commit-Anzahl | Repos |
|---------------|---------------|-------|
| `devshift-stack <ds@activi.io>` | 29 | Master_Brain, amp-brain |
| `dsactivi <ds@activi.io>` | 6 | amp-brain |
| `dsactivi-2 <dsactivi@gmail.com>` | 2 | amp-brain |
| `Den_is <ds.selmanovic@gmail.com>` | 1 | amp-brain |
| `DS Selmanovic <dsselmanovic@Mac-DS8877.local>` | 1 | amp-brain |

**Finding:** 5 verschiedene Git-Identitäten, alle scheinen derselbe User zu sein.

---

## 7. HYPOTHESEN & BEFUNDE

### ✅ BESTÄTIGT: Fragmentierung vorhanden

| Hypothese | Status | Beleg |
|-----------|--------|-------|
| Mehrere lokale Kopien existieren | ✅ JA | 2x Master_Brain lokal (`activi-dev-repos` + `brain-work`) |
| Lokal-only Repos ohne Remote | ✅ JA | `OLD_BRAIN`, `The-Brain` haben kein Remote |
| GitHub-Repos divergieren | ✅ JA | `dsactivi-2/master-brain` 4 Commits hinter `Activi-AI/Master_Brain` |
| Unpushed Commits existieren | ✅ JA | `feature/legacy-merge` Branch nicht gepusht |
| Server-Code nicht prüfbar | ⚠️ UNBEKANNT | SSH-Zugriff fehlgeschlagen |

### 🔴 KRITISCHE FINDINGS

1. **ORPHAN REPO:** `~/brain-work/Master_Brain` ist komplett losgelöst — Commit `c95b578` existiert NICHT auf GitHub
2. **SYNC-LÜCKE:** `dsactivi-2/master-brain` fehlen 4 Commits die in `Activi-AI/Master_Brain` sind
3. **LOKAL-ONLY CONTENT:** `OLD_BRAIN` und `The-Brain` haben keine Backups
4. **UNPUSHED WORK:** Branch `feature/legacy-merge` mit wichtigem Merge-Commit nicht gepusht

---

## 8. OFFENE FRAGEN (Owner muss beantworten)

| # | Frage | Warum wichtig |
|---|-------|---------------|
| 1 | Welches Master_Brain ist das "echte"? | 2 lokale Kopien mit unterschiedlichen Commits |
| 2 | Soll `dsactivi-2/master-brain` weitergepflegt werden oder ist `Activi-AI/Master_Brain` das neue Canonical? | Aktuell 4 Commits Divergenz |
| 3 | Was passiert mit `OLD_BRAIN` und `The-Brain`? | Lokal-only = Datenverlust-Risiko |
| 4 | Ist `brain-work/Master_Brain` obsolet? | Commit existiert nicht auf GitHub |
| 5 | Welcher SSH-Key funktioniert für 49.13.117.223? | Server-Audit nicht möglich |
| 6 | Läuft auf dem Server Code aus welchem Repo? | Unbekannt, ob Image oder Volume-Mount |
| 7 | Soll `feature/legacy-merge` gemerged werden? | Enthält OLD_BRAIN content |

---

## 9. EMPFOHLENER KONSOLIDIERUNGSPLAN

### Phase 1: Canonical Repo definieren
1. Entscheiden: `Activi-AI/Master_Brain` ODER `dsactivi-2/master-brain`?
2. Das andere Repo archivieren oder löschen

### Phase 2: Lokale Bereinigung
1. `~/brain-work/Master_Brain` → DELETE (orphan, obsolet)
2. `~/activi-dev-repos/Master_Brain` → Push `feature/legacy-merge` oder merge to main
3. `OLD_BRAIN` → Inhalte bereits in `feature/legacy-merge` gemerged? Falls ja: DELETE
4. `The-Brain` → Zu welchem Repo gehört das? Eigenes Projekt oder Teil von Brain?

### Phase 3: GitHub Sync
```bash
# Falls Activi-AI canonical:
cd ~/activi-dev-repos/Master_Brain
git push origin feature/legacy-merge
# Dann PR erstellen und mergen

# dsactivi-2/master-brain archivieren:
gh repo archive dsactivi-2/master-brain
```

### Phase 4: Server-Audit nachholen
- SSH-Key für 49.13.117.223 ermitteln
- Prüfen ob Server aus Git oder Docker-Image läuft
- Falls Git: Remote auf Canonical Repo zeigen lassen

### Phase 5: Git-Identity vereinheitlichen
```bash
git config --global user.name "devshift-stack"
git config --global user.email "ds@activi.io"
```

---

## 10. ZUSAMMENFASSUNG

| Metrik | Wert |
|--------|------|
| Lokale Brain-Repos | 6 |
| Davon mit Remote | 4 |
| Davon lokal-only | 2 |
| GitHub Repos (Brain-relevant) | 5 |
| Divergierende Repos | 2 |
| Unpushed Commits | 1 |
| Orphan Repos | 1 |
| Server-Zugriff | ❌ BLOCKIERT |
| **Fragmentierungs-Level** | **HOCH** |

**Verdict:** Die Brain-Infrastruktur ist fragmentiert über 2 GitHub-Accounts (Activi-AI, dsactivi-2), 6 lokale Verzeichnisse, und mindestens 1 Server. Konsolidierung dringend empfohlen.

---

*Audit durchgeführt: 2026-01-19*
