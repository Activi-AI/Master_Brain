# Master_Brain (call-agents-platform)

Zentrales Wissens- und Steuerungssystem fuer Activi-AI.
Bootstrap repo for supervisor ops, agent flows, evals, and memory.

## Struktur

### Governance
- docs/ - Projektdokumentation
- ops/ - Runbooks und Policies
- scripts/ci/ - CI-Skripte
- .github/ - GitHub Config

### Runtime
- agents/ - Flows and playbooks per agent
- schemas/ - JSON schemas for structured outputs
- eval/ - Scorecards and regression tests
- memory/ - Long-term memory seed (no secrets)
- kb/ - Knowledge Base
- infra/ - Docker Infrastructure
- policies/ - Access policies and tagging rules

## Pflichtdokumente

- docs/PROJECT_BRIEF.md
- capabilities.yml

## Start

1. Review ops/POLICY.md
2. Review docs/PROJECT_BRIEF.md
3. Update agents/*/flow.yaml and playbook.md
4. Run evals when changing flows

## Quality Gates

CI prueft automatisch:
- PROJECT_BRIEF.md vorhanden
- capabilities.yml vorhanden
