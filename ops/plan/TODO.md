# TODO Plan

## Phase 1 (Option 1) - Patch Workflow
- Patch workflow skeleton erstellen. Status: done (code exists, untested)
- Prompt-Bibliothek als Dateien. Status: done (code exists, untested)
- Patch Apply + Verify Skripte. Status: done (code exists, untested)
- Report Export. Status: done (report created, untested)
- Output-Issue: python3 stdout/stderr liefert in dieser Umgebung keine Ausgabe. Status: open

## Phase 2 (Option 3) - Master_Brain stabil + MCP
- MCP Server Design: mcp/ directory + server spec. Status: open (planning)
- Master_Brain Single Source of Truth: Prompts/Policies/Runbooks als Files + Versioning. Status: open (planning)
- CLI Agent Standard: immer aus Repo lesen, nie copy/paste. Status: open (planning)
- Event Log / Evidence: reports/ + automatische Exporte (HTML/MD). Status: open (planning)
- Tool Registry + capabilities.yml + test tags (http/mcp/readback/e2e). Status: open (planning)
- CI/Verifier: required checks + staging:verify reale smoke+readback. Status: open (planning)
- Optional MCP Q&A inbox: Fragen als Queue, Antworten mergen als Patch. Status: open (planning)
