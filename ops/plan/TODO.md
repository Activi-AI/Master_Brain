# TODO Plan

## Phase 1 (Option 1) - Patch Workflow
- Patch workflow skeleton erstellen
- Prompt-Bibliothek als Dateien
- Patch Apply + Verify Skripte
- Report Export

## Phase 2 (Option 3) - Master_Brain stabil + MCP
- MCP Server Design: mcp/ directory + server spec
- Master_Brain Single Source of Truth: Prompts/Policies/Runbooks als Files + Versioning
- CLI Agent Standard: immer aus Repo lesen, nie copy/paste
- Event Log / Evidence: reports/ + automatische Exporte (HTML/MD)
- Tool Registry + capabilities.yml + test tags (http/mcp/readback/e2e)
- CI/Verifier: required checks + staging:verify reale smoke+readback
- Optional MCP Q&A inbox: Fragen als Queue, Antworten mergen als Patch
