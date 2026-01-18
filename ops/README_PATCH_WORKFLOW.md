# Patch Workflow

Patch erstellen:
- git diff > ops/patches/<name>.patch

Patch anwenden:
- python3 scripts/patch_apply.py ops/patches/<name>.patch

Verifier:
- python3 scripts/patch_verify.py
