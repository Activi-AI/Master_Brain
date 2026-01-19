#!/usr/bin/env python3
import os
import sys


REQUIRED = [
    "ops/prompts",
    "ops/README_PATCH_WORKFLOW.md",
    "scripts/patch_apply.py",
]


def find_todos():
    todos = []
    base = "ops/prompts"
    if not os.path.isdir(base):
        return todos
    for name in os.listdir(base):
        if not name.startswith("PROMPT_"):
            continue
        path = os.path.join(base, name)
        if not os.path.isfile(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            for i, line in enumerate(f, start=1):
                if "TODO:" in line:
                    todos.append(f"{path}:{i}: {line.strip()}")
    return todos


def main():
    missing = []
    for item in REQUIRED:
        if item.endswith("/") or os.path.isdir(item):
            if not os.path.isdir(item):
                missing.append(item)
        else:
            if not os.path.isfile(item):
                missing.append(item)

    if missing:
        print("FAIL")
        print("Missing:")
        for m in missing:
            print(f"- {m}")
        return 1

    print("PASS")
    todos = find_todos()
    if todos:
        print("TODO markers found:")
        for t in todos:
            print(f"- {t}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
