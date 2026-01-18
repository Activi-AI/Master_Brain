# Git Workflow

**Status:** Empfohlen
**Gilt für:** Alle Projekte

---

## Git Shortcuts (Aliases)

```bash
git config --global alias.s "status"
git config --global alias.a "add -A"
git config --global alias.c "commit -m"
git config --global alias.p "push"
git config --global alias.pl "pull"
git config --global alias.l "log --oneline -10"
```

Danach:
```bash
git s     # status
git a     # add -A
git c "msg"  # commit
git p     # push
git pl    # pull
git l     # log
```

---

## Täglicher Workflow

### Session Start
```bash
cd ~/activi-dev-repos/[projekt]
git pull    # Aktuelle Version holen
```

### Nach jeder Änderung
```bash
git add . && git commit -m "[beschreibung]" && git push
```

### Session Ende - Alle Repos prüfen
```bash
for repo in ~/activi-dev-repos/*/; do
  if [ -d "$repo/.git" ]; then
    echo "=== $(basename $repo) ==="
    git -C "$repo" status -s
  fi
done
```

---

## Bei Konflikten

```bash
git stash           # Lokale Änderungen sichern
git pull            # Remote holen
git stash pop       # Änderungen zurück
# Konflikte manuell lösen
git add . && git commit -m "Merge conflict resolved" && git push
```

---

## Troubleshooting

| Problem | Lösung |
|---------|--------|
| Push rejected | `git pull --rebase && git push` |
| Falscher Branch | `git checkout main` |
| Auth Fehler | `gh auth login` |
| SSH Fehler | `ssh -T git@github.com` |

---

## Standard .gitignore

```
node_modules/
.env
.env.local
*.log
.DS_Store
__pycache__/
*.pyc
.cache/
dist/
build/
.venv/
venv/
```

---

## Regel

> Im Zweifel → PUSHEN!
