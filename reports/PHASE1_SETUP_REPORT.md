# PHASE 1 SETUP REPORT

## Created
- ops/prompts/
- ops/patches/
- ops/plan/
- scripts/
- reports/
- ops/prompts/README.md
- ops/prompts/PROMPT_1_READONLY_INVENTORY.md
- ops/prompts/PROMPT_2_APPLY_MIGRATION.md
- ops/prompts/PROMPT_3_POLICY_ENFORCE.md
- ops/README_PATCH_WORKFLOW.md
- scripts/patch_apply.py
- scripts/patch_verify.py
- ops/plan/TODO.md

## How to apply / verify
- python3 scripts/patch_apply.py ops/patches/<name>.patch
- python3 scripts/patch_verify.py

## Evidence: ls -R ops scripts reports

```
ops:
AB_TESTS.md
AGENTS.md
CHANGELOG.md
DECISIONS.md
OPEN_QUESTIONS.md
patches
plan
policy
POLICY.md
PROJECT.md
prompts
README_PATCH_WORKFLOW.md
RISKS.md
RUNBOOK_SUPERVISOR.md
TASKS.md
templates

ops/patches:

ops/plan:
TODO.md

ops/policy:
HTTP_MCP_ADDENDUM.md

ops/prompts:
PROMPT_1_READONLY_INVENTORY.md
PROMPT_2_APPLY_MIGRATION.md
PROMPT_3_POLICY_ENFORCE.md
README.md

ops/templates:
PROJECT_BRIEF_TEMPLATE.md

reports:

scripts:
ci
install-githooks.sh
patch_apply.py
patch_verify.py
post_run.sh
quality_gate.py

scripts/ci:
check_capabilities.py
check_project_brief.py
check_structure.py
check_test_plan.py
```
