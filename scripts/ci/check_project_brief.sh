#!/bin/bash
set -e
if [ -f "docs/PROJECT_BRIEF.md" ]; then
  echo "PASS: PROJECT_BRIEF.md exists"
  exit 0
else
  echo "FAIL: PROJECT_BRIEF.md missing"
  exit 1
fi
