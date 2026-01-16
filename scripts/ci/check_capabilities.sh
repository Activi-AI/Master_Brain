#!/bin/bash
set -e
if [ -f "capabilities.yml" ]; then
  echo "PASS: capabilities.yml exists"
  exit 0
else
  echo "FAIL: capabilities.yml missing"
  exit 1
fi
