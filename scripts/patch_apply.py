#!/usr/bin/env python3
import os
import sys
import subprocess


def run(cmd):
    return subprocess.run(cmd, check=False, text=True)


def main():
    if len(sys.argv) != 2:
        print("ERROR: Expected 1 argument: path to .patch file")
        return 2

    patch_path = sys.argv[1]
    if not patch_path.endswith(".patch"):
        print("ERROR: Patch file must end with .patch")
        return 2

    if not os.path.isfile(patch_path):
        print(f"ERROR: Patch file not found: {patch_path}")
        return 2

    check = run(["git", "apply", "--check", patch_path])
    if check.returncode != 0:
        print("ERROR: git apply --check failed")
        return check.returncode

    apply_res = run(["git", "apply", patch_path])
    if apply_res.returncode != 0:
        print("ERROR: git apply failed")
        return apply_res.returncode

    run(["git", "status"]) 
    run(["git", "diff", "--stat"]) 
    return 0


if __name__ == "__main__":
    sys.exit(main())
